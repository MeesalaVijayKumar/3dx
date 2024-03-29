const draggableElements = document.querySelectorAll('.draggable')
const droppableElements = document.querySelectorAll('.droppable')

draggableElements.forEach((elem) => {
  elem.addEventListener('dragstart', dragStart) 
})

droppableElements.forEach((elem) => {
  elem.addEventListener('dragenter', dragEnter) 
  elem.addEventListener('dragover', dragOver) 
  elem.addEventListener('dragleave', dragLeave) 
  elem.addEventListener('drop', drop) 
})

// Drag and Drop Functions

// drag target

function dragStart(event) {
  event.dataTransfer.setData('text', event.target.id)
}

// drop target

function dragEnter(event) {
  if (!event.target.classList.contains('dropped')) {
    event.target.classList.add('droppable-hover')
  }
}

function dragOver(event) {
  if (!event.target.classList.contains('dropped')) {
    event.preventDefault() 
  }
}

function dragLeave(event) {
  if (!event.target.classList.contains('dropped')) {
    event.target.classList.remove('droppable-hover')
  }
}

function drop(event) {
  event.preventDefault() 
  event.target.classList.remove('droppable-hover')
  const draggableElementData = event.dataTransfer.getData('text') 
  const droppableElementData = event.target.getAttribute('data-draggable-id')
  const isCorrectMatching = draggableElementData === droppableElementData
  if (isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementData)
    event.target.classList.add('dropped')
    event.target.style.backgroundColor =
      window.getComputedStyle(draggableElement).color
    draggableElement.classList.add('dragged')
    draggableElement.setAttribute('draggable', 'false')
    event.target.insertAdjacentHTML(
      'afterbegin',
      `<img src="${draggableElementData}.png" width="130px" height="130px" class=""></img>`
    )
  }
}
