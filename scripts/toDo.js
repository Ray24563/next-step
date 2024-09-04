let toDoContainer = JSON.parse(localStorage.getItem('container')) || 
[{
  id: 1,
  title: 'Create Your First List'
}];

let toDoList = JSON.parse(localStorage.getItem('list')) || []

function saveToStorage(){
  localStorage.setItem('container', JSON.stringify(toDoContainer));
  localStorage.setItem('list', JSON.stringify(toDoList));
}

function addContainer(){
  let storeContainer = ''
  toDoContainer.forEach((container) => {

    if (!container.title) {
      if (container.id === 1){
        container.title = 'Create Your First List';
      }else{
        container.title = 'Add List'
      }
    }

    if(container.id === 1){
      storeContainer += `<div class="todo-container todo-container-${container.id}" data-container-id = "${container.id}">
            <div class="title-flex">
              <h1 class="container-title">${container.title}</h1>
              <p class="omedeto omedeto-${container.id}">Well Done!</p>
              <input class="edit-container-name" type="text">
              <div class="edit-add">
                <button class="save-button save-button-css" data-save-id = "${container.id}">Save</button>
                <i class="fa fa-plus-circle add-task-css add-task"></i>
              </div>
            </div>
            <hr>
            <div class="todo-category-grid task-grid">
              <p class="container-category">Task</p>
              <p class="container-category">Start Time</p>
              <p class="container-category">End Time</p>
              <p class="container-category">Status</p>
            </div>
          </div>`
    } else {
      storeContainer += `<div class="todo-container todo-container-${container.id}" data-container-id = "${container.id}">
      <div class="title-flex">
        <h1 class="container-title">${container.title}</h1>
        <p class="omedeto omedeto-${container.id}">Well Done!</p>
        <input class="edit-container-name" type="text">
        <div class="edit-add">
          <button class="save-button save-button-css">Save</button>
          <i class="fa fa-plus-circle add-task-css add-task"></i>
          <i class="fa fa-trash delete-button" aria-hidden="true" data-container-id = "${container.id}"></i>
        </div>
      </div>
      <hr>
      <div class="todo-category-grid task-grid">
        <p class="container-category">Task</p>
        <p class="container-category">Start Time</p>
        <p class="container-category">End Time</p>
        <p class="container-category">Status</p>
      </div>
    </div>`
    }
  })
  document.querySelector('.grid-container').innerHTML = storeContainer
  loadTasks();
  editTitle();
  saveTitle();
  deleteContainer();
  addTask();
}

// This function is to load and display all tasks in its own respective containers.
function loadTasks() {
  toDoList.forEach(task => {
    const container = document.querySelector(`.todo-container-${task.containerId} .task-grid`);
    const display = displayTask(task.task, task.startTime, task.endTime, task.id);
    container.insertAdjacentHTML('beforeend', display);
    addDoneButtonListener(task.id);
  });
}

// The function addContainer was called to display the existing elements of toDoContainer. Note that, I put a permanent container that cannot be removed.
addContainer();

// Bring back the event listener (This is to maintain edit button functionality even if it is refresh)
document.addEventListener('DOMContentLoaded', () => {
  initializeTasks();
});

// This event listener is for adding container.
document.querySelector('.add-container').addEventListener('click', () => {
  // Take the max container ID and increment it by 1 to avoid duplication of ID
  const newId = getLastContainerId() + 1; 
  toDoContainer.push({ id: newId, title: "Add Title" });
  addContainer();
  saveToStorage();
});

function editTitle(){
  const containerHeader = document.querySelectorAll('.container-title')
  containerHeader.forEach((edit) => {
    edit.addEventListener('click', () => {
      edit.parentElement.parentElement.classList.add('editing-title');
      saveToStorage();
    })
  })
}

function saveTitle(){
  const saveButton = document.querySelectorAll('.save-button');
  saveButton.forEach((save) => {
    save.addEventListener('click', (event) => {
      const container = event.target.closest('.todo-container');
      const input = container.querySelector('.edit-container-name');
      const title = container.querySelector('.container-title');
      const containerId = container.dataset.containerId;
      const findId = toDoContainer.find(where => where.id === Number(containerId));
      findId.title = input.value;
  
      title.textContent = input.value;
      container.classList.remove('editing-title');
      saveToStorage();
    })
  })
}

function deleteContainer(){
  const deleteButton = document.querySelectorAll('.delete-button');
  deleteButton.forEach((del) => {
    del.addEventListener('click', () => {
      const containerId = del.dataset.containerId;
      toDoContainer = toDoContainer.filter(container => container.id != containerId);
      addContainer();
      saveToStorage();
    })
  })
}

function getLastContainerId() {
  if (toDoContainer.length === 0) return null;

  const maxIdContainer = toDoContainer.reduce((max, container) => 
    container.id > max.id ? container : max
  );

  return maxIdContainer.id;
}

function addTask() {
  const addTaskButton = document.querySelectorAll('.add-task');
  addTaskButton.forEach((add) => {
    add.addEventListener('click', () => {
      const container = add.closest('.todo-container');
      const taskGrid = container.querySelector('.task-grid');
      const uniqueId = Date.now();

      taskGrid.insertAdjacentHTML('beforeend', `
        <input class="input-task js-input-task-${uniqueId}" type="text" required> 
        <input class="input-time js-input-time-${uniqueId}" type="time" required> 
        <input class="input-time js-input-time-2-${uniqueId}" type="time" required>
        <button class="save-task save-task-js-${uniqueId}">Save Task</button>`);

        const saveTaskButton = taskGrid.querySelector(`.save-task-js-${uniqueId}`);
        saveTaskButton.addEventListener('click', () => {
        saveTask(taskGrid, uniqueId, container);
      })
    });
  })
}

// This function is for save task button
function saveTask(taskGrid, uniqueId, container) {
  const taskInput = taskGrid.querySelector(`.js-input-task-${uniqueId}`);
  const getTask = taskInput.value;
  const startInput = taskGrid.querySelector(`.js-input-time-${uniqueId}`);
  const getStart = startInput.value;
  const endInput = taskGrid.querySelector(`.js-input-time-2-${uniqueId}`);
  const getEnd = endInput.value;

  toDoList.push({
    task: getTask,
    startTime: getStart,
    endTime: getEnd,
    containerId: parseInt(container.dataset.containerId),
    id: uniqueId
  });

  const display = displayTask(getTask, getStart, getEnd, uniqueId);

  taskGrid.querySelectorAll(`.js-input-task-${uniqueId}, .js-input-time-${uniqueId}, .js-input-time-2-${uniqueId}, .save-task-js-${uniqueId}`).forEach(input => input.remove());
  taskGrid.insertAdjacentHTML('beforeend', display);
  saveToStorage();
  addDoneButtonListener(uniqueId);
  changeTask(uniqueId)
}

// This function display the task that is inputted by the user
function displayTask(getTask, getStart, getEnd, displayId){
  let renderTask = '';
  renderTask += `<p class="display-task display-task-id-${displayId}">${getTask}</p>
                 <input class="edit-task-name edit-task-name-id-${displayId} display-task-id-${displayId}" type="text">
                  <p class="display-task display-task-id-${displayId}">${getStart}</p>
                  <input class="edit-date start-time-id-${displayId} display-task-id-${displayId}" type="time">
                  <p class="display-task display-task-id-${displayId}">${getEnd}</p>
                  <input class="edit-date end-time-id-${displayId} display-task-id-${displayId}" type="time">
                  <div class="display-button display-task-id-${displayId}">
                    <button class="done-button display-task-id-${displayId} done-button-id-${displayId}">Done</button>
                    <button class="edit-task display-task-id-${displayId} edit-button-id-${displayId}">Edit</button>
                    <button class="save-edit-task save-edit-id-${displayId} display-task-id-${displayId}">Save</button>
                  </div>`;
  return renderTask;
}

// This function is for 'done' button. If it is click, the task will be removed from the list.
function addDoneButtonListener(displayId) {
  const doneButton = document.querySelector(`.done-button-id-${displayId}`);
  doneButton.addEventListener('click', () => {
    const taskElements = document.querySelectorAll(`.display-task-id-${displayId}`);
    taskElements.forEach(displayInput => displayInput.remove());
    const buttonElements = document.querySelectorAll(`.display-task-id-${displayId}`);
    buttonElements.forEach(button => button.remove());

    // This task variable contains the id of the specific task
    const omedetoId = toDoList.find(task => task.id === displayId);
    toDoList = toDoList.filter(task => task.id !== displayId);
    saveToStorage();
    greetingsDone(omedetoId.containerId); // Then, the task variable pass its value to containerId in greetings done.
  });
}

// This function is for changing the task.
function changeTask(displayId){
  const editButton = document.querySelector(`.edit-button-id-${displayId}`)
  editButton.addEventListener('click', () => {
    const tempRemoveTask = document.querySelectorAll(`.display-task-id-${displayId}`)
    tempRemoveTask.forEach(addClass => addClass.classList.add('edit-stored-task'));
  });

  const saveEdit = document.querySelector(`.save-edit-id-${displayId}`)
  saveEdit.addEventListener('click', () => {
    const taskName = document.querySelector(`.edit-task-name-id-${displayId}`);
    const newStartTime = document.querySelector(`.start-time-id-${displayId}`);
    const newEndTime = document.querySelector(`.end-time-id-${displayId}`)

    const getTaskName = taskName.value
    const getStartTime = newStartTime.value
    const getEndTime = newEndTime.value

    let storeTask = toDoList.find(task => task.id === displayId)
    if (storeTask){
      storeTask.task = getTaskName;
      storeTask.startTime = getStartTime;
      storeTask.endTime = getEndTime;

      saveToStorage();

      const classRemove = document.querySelectorAll('.edit-stored-task')
      classRemove.forEach(removeElement => removeElement.remove())

      const container = document.querySelector(`[data-container-id="${storeTask.containerId}"] .task-grid`);
      const updatedTaskDisplay = displayTask(getTaskName, getStartTime, getEndTime, displayId);


      container.insertAdjacentHTML('beforeend', updatedTaskDisplay);

      saveToStorage();
      addDoneButtonListener(displayId);
      changeTask(displayId)
    }
  });
}

function initializeTasks() {
  toDoList.forEach(task => {
    changeTask(task.id);
  });
}

// This function is for greetings that you accomplish a task
function greetingsDone (containerId){
  const greetings = document.querySelectorAll(`.omedeto-${containerId}`);

  setTimeout(() => {
    greetings.forEach(insert => insert.classList.add('omedeto-display'))
  });

  setTimeout(() => {
    greetings.forEach(insert => insert.classList.remove('omedeto-display'))
  },3000)
}