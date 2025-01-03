const htmlTask = value => `
    <input class="form-check-input flex-shrink-0" type="checkbox" value="" style="font-size: 1.375em;">
    <span class="pt-1 form-checked-content">
        <strong>${value}</strong>
        <small class="d-block text-body-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-calendar-event me-1" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
            </svg>
            1:00–2:00pm
        </small>
    </span>
`
const taskList = document.querySelector('.list-group');

const addTaskToList = valueInput => {
    const label = document.createElement('label');
    label.classList.add('list-group-item', 'list-group-item-action', 'cursor-pointer', 'd-flex', 'gap-3');

    label.innerHTML = htmlTask(valueInput);
    
    taskList.append(label);
};
const updateDatabase = valueInput => {console.log(`atualizou o db com ${valueInput}`)};

export {addTaskToList, updateDatabase};