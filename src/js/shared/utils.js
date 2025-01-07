import { getTasks_DB, createTask_DB, updateTasks_DB,deleteTask_DB } from "../core/serviceTask.js";

const htmlTask = value => `
    <input class="form-check-input flex-shrink-0" type="checkbox" value="" style="font-size: 1.375em;">
    <span class="pt-1 form-checked-content">
        <span class="title-task text-uppercase"><strong>${value}</strong></span>
    </span>
    <div class="ms-auto align-content-around">
              <a href="#" class="icon-link icon-link-hover" title="Editar Tarefa">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill me-2 text-primary" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
              </a>
              <a href="#" class="icon-link icon-link-hover" title="Deletar Tarefa">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill text-danger" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                </svg>
              </a>
    </div>
`
const taskList = document.querySelector('.list-group');

const addTaskToList = valueInput => {
    const label = document.createElement('label');
    label.classList.add('list-group-item', 'list-group-item-action', 'cursor-pointer', 'd-flex', 'gap-3');

    label.innerHTML = htmlTask(valueInput);
    
    taskList.append(label);
    createTask_DB(valueInput);
};

const listTasksToDB = () => {
    const arrFromDb = getTasks_DB();
    if (arrFromDb.length === 0) return console.log('nada pra listar');
    
    const arrTasks = [];
    arrFromDb.forEach(element => {
        const label = `
            <label class="list-group-item list-group-item-action cursor-pointer d-flex gap-3">
                ${htmlTask(element)}
            </label>
        `; 
        arrTasks.push(label);        
    });

    taskList.innerHTML = arrTasks.join('');
};

const updateTaskToList = (listItem) => {
    const titleElement = listItem?.querySelector('.title-task');
    const currentTask = titleElement?.textContent;

    if (!currentTask) return;

    const newTask = prompt(`Digite a nova tarefa:`, currentTask);
    if (!newTask || newTask.trim() === currentTask.trim()) return;

    titleElement.innerHTML = `<strong>${newTask.trim()}</strong>`;
    
    updateTasks_DB(currentTask, newTask.trim());
};

const deleteTaskToList = (listItem) => {
    const titleTask = listItem?.querySelector('.title-task')?.textContent;

    if (titleTask && confirm(`Deseja deletar a tarefa: ${titleTask}?`)) {
        listItem.remove(); 
        deleteTask_DB(titleTask); 
    }
};

export {addTaskToList, listTasksToDB, updateTaskToList, deleteTaskToList};