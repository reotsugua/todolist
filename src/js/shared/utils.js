import { getTasks_DB, createTask_DB, updateTasks_DB, deleteTask_DB, gerateId, updateStatusTasks_DB, clear_DB } from "../core/serviceTask.js";
import Swal from 'sweetalert2';

const htmlTask = (name, checked) => `
    <input class="form-check-input flex-shrink-0" type="checkbox" ${checked ? 'checked' : ''} style="font-size: 1.375em;">
    <span class="pt-1 form-checked-content">
        <span class="title-task text-uppercase"><strong>${name}</strong></span>
    </span>
    <div class="ms-auto align-content-around pt-1">
              <a href="#" class="icon-link icon-link-hover" title="Editar Tarefa">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill me-2 text-primary fs-5" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
              </a>
              <a href="#" class="icon-link icon-link-hover" title="Deletar Tarefa">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill text-danger fs-5" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                </svg>
              </a>
    </div>
`
const taskList = document.querySelector('.list-group');
const pendingList = document.getElementById('pending-list');
const completeList = document.getElementById('complete-list');

const addTaskToList = valueInput => {
    const label = document.createElement('label');
    label.classList.add('list-group-item', 'list-group-item-action', 'cursor-pointer', 'd-flex', 'gap-3');

    const _id = gerateId();
    label.setAttribute('data-id', _id);

    label.innerHTML = htmlTask(valueInput);
    
    taskList.append(label);
    createTask_DB(_id, valueInput);
};

const listTasksFromDB = () => {
    const arrFromDb = getTasks_DB();
    if (arrFromDb.length === 0) return console.log('nada pra listar');
    
    const htmlPendingTask = [];
    const htmlCompleteTask = [];
    
    const createTaksHtml = ({id, name, completed}) => {
        return `
            <label class="list-group-item list-group-item-action cursor-pointer d-flex gap-3" data-id="${id}">
                ${htmlTask(name, completed)}
            </label>
        `; 
    }

    const arrPendingTask = arrFromDb.filter(({completed})=> !completed);
    const arrCompleteTask = arrFromDb.filter(({completed})=> completed);
    
    arrPendingTask.forEach(task=>htmlPendingTask.push(createTaksHtml(task)));
    arrCompleteTask.forEach(task =>htmlCompleteTask.push(createTaksHtml(task)));

    pendingList.innerHTML = htmlPendingTask.join('');
    completeList.innerHTML = htmlCompleteTask.join('');
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

const updateStatusTaskToList = (itemList, statusCheckbox) => {
    // Era pra checked + riscar name, mas o css ja ta fazendo isso.
    (statusCheckbox ? completeList : pendingList).append(itemList);
    
    const titleListItem = itemList.textContent.trim();
    Swal.fire({
            title: `Tarefa enviada para ${statusCheckbox ? '"Completas"' : '"Pendentes"'}!`,
            icon: `${statusCheckbox ? 'success' : 'warning'}`,
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            width: '18em'
        })

    updateStatusTasks_DB(titleListItem, statusCheckbox);
};

const clearTaskToList = tabSelect => {
    tabSelect.innerHTML = '';
    
    const tabStatus = tabSelect.id;
    clear_DB(tabStatus);
};

export {addTaskToList, listTasksFromDB, updateTaskToList, deleteTaskToList, updateStatusTaskToList, clearTaskToList};