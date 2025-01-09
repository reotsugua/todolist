import { addTaskToList, listTasksToDB, updateTaskToList, deleteTaskToList, updateStatusTaskToList } from "../shared/utils.js";

const formAddTaks = document.getElementById('form-add-taks');
const tasksList = document.querySelector('.list-group');

const createTask = e => {
    e.preventDefault();
    
    const thisForm = e.target;
    const valueInput = e.target[0].value;

    thisForm.reset();

    if (valueInput.trim() === '') {
        return alert('Você não pode adicionar uma tarefa tem titulo!');
    }
        
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
}

const updateStatusTask = e =>{
    const checkbox = e.target;
    const label = checkbox.labels[0];
    if (!checkbox || !label) return;    
    
    updateStatusTaskToList(label.textContent.trim(), checkbox.checked);      
}

formAddTaks.addEventListener('submit', createTask);
tasksList.addEventListener('click', updateTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('change', updateStatusTask);

document.addEventListener('DOMContentLoaded', listTasksToDB)