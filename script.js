
let btnAdd = $('#btnAdd')
let btnCancel = $('#btnCancel')
let btnSort = $('#btnSort')
let btnCleanup = $('#btnCleanup')
let inpNewTask = $('#inpNewTask')
let collections = {
  Home:{
    obj:$('#btnHome'),
    list:[]
  },
  Office:{
    obj:$('#btnOffice'),
    list:[]
  }
}

function addToCollection(item) {
  for (var collection in collections) {
    if (collections.hasOwnProperty(collection)) {
      var element = collections[collection];
      if(element.obj.is(':checked')) {
        element.list.push({value:item.val(), status:false})
      }
    }
  }
}

function activeCollection() {
  for (var collection in collections) {
    if (collections.hasOwnProperty(collection)) {
      var element = collections[collection];
      if (element.obj.is(':checked')) {
        return collection
      }
    }
  }
}

$('.btn-check').click(() => {
  $('.lists').css('display', 'none')
  $('#'+activeCollection()).css('display','block')
})





function addItem() {
  let listItem = $('<li>', {
    'class': 'list-group-item',
    text: inpNewTask.val()
  })
  
  $('#ulTasks'+activeCollection()).append(listItem)
  addToCollection(listItem)
  listItem.click(() => {
    listItem.toggleClass('done')
  })
  
  inpNewTask.val('')
  toggleInputButtons()
}


function clearDone() {
  $('#ulTasks'+activeCollection()+' .done').remove()
  toggleInputButtons()
}

function sortTasks() {
  $('#ulTasks'+activeCollection()+' .done').appendTo($('#ulTasks'+activeCollection()))
}

function toggleInputButtons() {
  btnCancel.prop('disabled', inpNewTask.val() == '')
  btnAdd.prop('disabled', inpNewTask.val() == '')
  btnSort.prop('disabled', $('#ulTasks'+activeCollection()).children().length < 1)
  btnCleanup.prop('disabled', $('#ulTasks'+activeCollection()).children().length < 1)
}

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
