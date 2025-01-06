const _DB = 'db_todoList_tasks';

function getTasks_DB() {
    return JSON.parse(localStorage.getItem(_DB));
}

function createTask_DB(params) {
    const arrFromDb = getTasks_DB();
    if (!arrFromDb) {
        const arrTask = [];
        arrTask.push(params);
        localStorage.setItem(_DB, JSON.stringify(arrTask));
        return;
    }
    
    arrFromDb.push(params);
    localStorage.setItem(_DB, JSON.stringify(arrFromDb));
}

function updateTasks_DB(element, replace) {
    const arrTasks = getTasks_DB();
    const index = arrTasks.indexOf(element);
    arrTasks.splice(index,1, replace);
    
    localStorage.setItem(_DB, JSON.stringify(arrTasks));
}

function deleteTask_DB(params) {
    const arrTasks = getTasks_DB();
    const index = arrTasks.indexOf(params);
    arrTasks.splice(index,1);
    
    localStorage.setItem(_DB, JSON.stringify(arrTasks));
}

export { createTask_DB, getTasks_DB, updateTasks_DB, deleteTask_DB};