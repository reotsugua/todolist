import { addTaskToList, listTasksToDB, updateTaskToList, deleteTaskToList } from "../shared/utils.js";

const formAddTaks = document.getElementById('form-add-taks');
const tasksList = document.querySelector('.list-group');

const createTask = e => {
    e.preventDefault();
    
    const thisForm = e.target;
    const valueInput = e.target[0].value;
    thisForm.reset();

    addTaskToList(valueInput);  
}

const updateTask = e => {    
    const penIcon = e.target.closest('.bi-pencil-fill');
    if (!penIcon) return;

    const listItem = penIcon.closest('.list-group-item'); 
    updateTaskToList(listItem);  
}

const deleteTask = e => {    
    const trashIcon = e.target.closest('.bi-trash-fill');
    if (!trashIcon) return;

    const listItem = trashIcon.closest('.list-group-item'); 
    deleteTaskToList(listItem);
    console.log( Date.now());
      
}

formAddTaks.addEventListener('submit', createTask);
tasksList.addEventListener('click', updateTask);
tasksList.addEventListener('click', deleteTask);

document.addEventListener('DOMContentLoaded', listTasksToDB)