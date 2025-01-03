import { addTaskToList, updateDatabase } from "../shared/utils.js";

const formAddTaks = document.getElementById('form-add-taks');

const addTask = e => {
    e.preventDefault();
    
    const thisForm = e.target;
    const valueInput = e.target[0].value;
    thisForm.reset();

    addTaskToList(valueInput);
    updateDatabase(valueInput);    
}

formAddTaks.addEventListener('submit', addTask)