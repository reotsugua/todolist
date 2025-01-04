function createTask(params) {
    localStorage.setItem('db_todoList_tasks', JSON.stringify(params));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('db_todoList_tasks'));
}

function updateTaks(params) {
    console.log(`Atualizando task: ${params}`);
    
}

function deleteTask(params) {
    console.log(`Deletando task: ${params}`);
    
}



export { createTask, getTasks, updateTaks, deleteTask};