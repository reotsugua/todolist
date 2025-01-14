import { addTaskToList, listTasksFromDB, updateTaskToList, deleteTaskToList, updateStatusTaskToList, clearTaskToList } from "../shared/utils.js";

const formAddTaks = document.getElementById('form-add-taks');
const pendingTaskList = document.getElementById('pending-list');
const completeTaskList = document.getElementById('complete-list');
const btnDeleteAllTasks = document.getElementById('delete-all');
const navbarStatus = document.querySelector('.nav-underline');

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

const updateStatusTask = e => {
    const checkbox = e.target;
    const label = checkbox.offsetParent;
    if (!checkbox || !label) return;

    const handleTransitionEnd = () => {
        label.removeEventListener('transitionend', handleTransitionEnd)

        updateStatusTaskToList(label, checkbox.checked);
    }

    label.classList.remove('show');
    label.addEventListener('transitionend', handleTransitionEnd)
}

const removeAllTasks = () => {
    const tabSelect = document.querySelector('.nav-link.active').textContent;
    
    const verify = {
        'Pendentes' : pendingTaskList,
        'Concluídas' : completeTaskList
    }
    
    verify[tabSelect] &&
        confirm(`Esta ação excluirá todas as tarefas "${tabSelect}". Clique em "OK" para continuar.`) &&
        clearTaskToList(verify[tabSelect]);
}

const hideHubButtons = () => {
    const hubButtons = document.querySelectorAll('.hub-buttons');
    
    hubButtons.forEach(hubButtons=>{
        hubButtons.classList.toggle('d-none');
    })
}

formAddTaks.addEventListener('submit', createTask);

pendingTaskList.addEventListener('click', updateTask);
pendingTaskList.addEventListener('click', deleteTask);
pendingTaskList.addEventListener('change', updateStatusTask);

completeTaskList.addEventListener('click', deleteTask);
completeTaskList.addEventListener('change', updateStatusTask);

btnDeleteAllTasks.addEventListener('click', removeAllTasks);

navbarStatus.addEventListener('click', hideHubButtons);

document.addEventListener('DOMContentLoaded', listTasksFromDB);