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

export { createTask_DB, getTasks_DB, updateTasks_DB, deleteTask_DB, gerateId};