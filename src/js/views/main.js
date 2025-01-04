import { addTaskToList, updateDatabase, listTasks } from "../shared/utils.js";

const formAddTaks = document.getElementById('form-add-taks');
const tasksList = document.querySelector('.list-group');

const addTask = e => {
    e.preventDefault();
    
    const thisForm = e.target;
    const valueInput = e.target[0].value;
    thisForm.reset();

    addTaskToList(valueInput);
    updateDatabase(valueInput);    
}

formAddTaks.addEventListener('submit', addTask);
tasksList.addEventListener('click', e => {
    const trashIcon = e.target.closest('.bi-trash-fill');

    if (trashIcon) {
        const listItem = e.target.closest('.list-group-item'); 
        
        console.log('Item deletado:', listItem);  
        listItem.remove();
    }
    
});

document.addEventListener('DOMContentLoaded', listTasks)