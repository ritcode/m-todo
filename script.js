let ulTasks = $('#ulTasks')
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
        element.list.push({value:item.val(), status:f})
      }
    }
  }
}

function addItem() {
  let listItem = $('<li>', {
    'class': 'list-group-item',
    text: inpNewTask.val()
  })
  listItem.click(() => {
    listItem.toggleClass('done')
  })
  ulTasks.append(listItem)
  addToCollection(listItem)
  
  inpNewTask.val('')
  toggleInputButtons()
}

function clearDone() {
  $('#ulTasks .done').remove()
  toggleInputButtons()
}

function sortTasks() {
  $('#ulTasks .done').appendTo(ulTasks)
}

function toggleInputButtons() {
  btnCancel.prop('disabled', inpNewTask.val() == '')
  btnAdd.prop('disabled', inpNewTask.val() == '')
  btnSort.prop('disabled', ulTasks.children().length < 1)
  btnCleanup.prop('disabled', ulTasks.children().length < 1)
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
