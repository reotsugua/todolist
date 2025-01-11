const _DB = 'db_todoList_tasks';
const gerateId = () => {
    let id = localStorage.getItem('taskIdCounter') || 0;    
    id = parseInt(id) + 1;
    localStorage.setItem('taskIdCounter', id);
    return id;
}

function getTasks_DB() {
    return JSON.parse(localStorage.getItem(_DB)) || [];
}

function createTask_DB(id, valueInput) {
    const arrFromDb = getTasks_DB();
    const objTask = {
        'id': id,
        'name': valueInput,
        'completed': false
    }    
    arrFromDb.push(objTask);
    localStorage.setItem(_DB, JSON.stringify(arrFromDb));
}

function updateTasks_DB(titleCurrentTask, titleNewTask) {
    const arrTasks = getTasks_DB();

    const index = arrTasks.findIndex(({name}) => name === titleCurrentTask);
    if (index === -1) {
        console.warn('Tarefa não encontrada!');
        return;
    }    
    
    arrTasks[index].name = titleNewTask;
    localStorage.setItem(_DB, JSON.stringify(arrTasks));
}

function updateStatusTasks_DB(titleListItem, statusCheckbox) {
    const arrTasks = getTasks_DB();

    const index = arrTasks.findIndex(({name}) => name === titleListItem);
    if (index === -1) {
        console.warn('Tarefa não encontrada!');
        return;
    }    
    
    arrTasks[index].completed = statusCheckbox;
    localStorage.setItem(_DB, JSON.stringify(arrTasks));
}

function deleteTask_DB(titleTask) {
    const arrTasks = getTasks_DB();

    const index = arrTasks.findIndex(({name}) => name === titleTask);
    if (index === -1) {
        console.warn('Tarefa não encontrada!');
        return;
    }  
    
    arrTasks.splice(index,1);
    localStorage.setItem(_DB, JSON.stringify(arrTasks));
}

function clear_DB() {
    localStorage.setItem(_DB, JSON.stringify([]));
}


export { createTask_DB, getTasks_DB, updateTasks_DB, deleteTask_DB, gerateId, updateStatusTasks_DB, clear_DB};