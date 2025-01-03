function createTask(params) {
    console.log(`criando task ${params}`);
}

function getTask(params) {
    console.log(`Pegando task: ${params}`);
}

function updateTaks(params) {
    console.log(`Atualizando task: ${params}`);
    
}

function deleteTask(params) {
    console.log(`Deletando task: ${params}`);
    
}



export { createTask, getTask, updateTaks, deleteTask};