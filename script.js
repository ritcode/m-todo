
let btnAdd = $('#btnAdd')
let btnCancel = $('#btnCancel')
let btnSort = $('#btnSort')
let btnCleanup = $('#btnCleanup')
let inpNewTask = $('#inpNewTask')
let collections = {
  Home: {
    list: []
  },
  Office: {
    list: []
  }
}


function activeCollection() {
  for (var collection in collections) {
    if (collections.hasOwnProperty(collection)) {
      if ($('#btn' + collection).is(':checked')) {
        return collection
      }
    }
  }
}

function load() {
  if (localStorage.getItem('m-todo')) {
    collections = JSON.parse(localStorage.getItem('m-todo'))
    for (var collection in collections) {
      if (collections.hasOwnProperty(collection)) {
        $('#ulTasks' + collection+' li').remove()
        collections[collection].list.forEach(task => {
          let listItem = $('<li>', {
            'class': 'list-group-item' + (task.status ? " done" : ""),
            text: task.value
          })
          console.log("name" +(task.status ? "done" : ""))
          $('#ulTasks' + collection).append(listItem)
          listItem.click((e) => {
            listItem.toggleClass('done')

            collections[activeCollection()].list.forEach(task => {
              if (task.value == e.target.innerText) {
                task.status = !task.status
              }
              save()
            });
          })
        })
      }
    }
  }
}
function save() {
  localStorage.setItem("m-todo", JSON.stringify(collections))
}
function addItem() {
  let listItem = $('<li>', {
    'class': 'list-group-item',
    text: inpNewTask.val()
  })

  $('#ulTasks' + activeCollection()).append(listItem)
  collections[activeCollection()].list.push({ "value": inpNewTask.val(), status: false })
  save()

  listItem.click((e) => {
    listItem.toggleClass('done')

    collections[activeCollection()].list.forEach(task => {
      if (task.value == e.target.innerText) {
        task.status = !task.status
      }
    });
    save()
  })

  inpNewTask.val('')
  toggleInputButtons()
}
function removeDone(arr, val) {
  let i = arr.indexOf(val)
  arr.splice(i, 1)
  return arr
}
function clearDone() {
  $('#ulTasks' + activeCollection() + ' .done').remove()
  collections[activeCollection()].list.forEach(task => {
    if(task.status) {
      collections[activeCollection()].list = removeDone(collections[activeCollection()].list, task)
    }
  })
  save()
  toggleInputButtons()
}
function sortTasks() {
  $('#ulTasks' + activeCollection() + ' .done').appendTo($('#ulTasks' + activeCollection()))
}
function toggleInputButtons() {
  btnCancel.prop('disabled', inpNewTask.val() == '')
  btnAdd.prop('disabled', inpNewTask.val() == '')
  btnSort.prop('disabled', $('#ulTasks' + activeCollection()).children().length < 1)
  btnCleanup.prop('disabled', $('#ulTasks' + activeCollection()).children().length < 1)
}

load()
toggleInputButtons()
$('.btn-check').click(() => {
  $('.lists').css('display', 'none')
  $('#' + activeCollection()).css('display', 'block')
})
$('#btnHome').click()
inpNewTask.keypress((e) => {
  if (e.which == 13) addItem()
})
inpNewTask.on('input', toggleInputButtons)

btnAdd.click(addItem)
btnCancel.click(() => {
  inpNewTask.val('')
  toggleInputButtons()
})
btnCleanup.click(clearDone)
btnSort.click(sortTasks)
