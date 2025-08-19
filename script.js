 let tasklist = document.getElementById('tasklist');

function addTask() {


    
    let taskinput = document.getElementById('taskinput');
    
    let taskText = taskinput.value;
    if (taskText === "") {
        return;
    }

    let li = document.createElement('li');
    li.textContent = taskText;

    let editButton = document.createElement('button');
    editButton.innerHTML = '<ion-icon name="pencil-outline"></ion-icon>';
    editButton.onclick = function() {
        editTask(li);
    };

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
    deleteButton.onclick = function() {
        deleteTask(li);
    };

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    tasklist.appendChild(li);
    taskinput.value = "";
}

function editTask(task) {
    let taskTextElement = task.firstChild;
    let taskText = taskTextElement.textContent;

    let newTaskText = prompt("Modifier la tâche :", taskText);

    if (newTaskText === null || newTaskText === "") {
        return;
    }

    taskTextElement.textContent = newTaskText;
}

function deleteTask(task) {
    tasklist.removeChild(task);
}



let inputTimer;

const taskInput = document.getElementById("taskinput");

taskInput.addEventListener("input", () => {
    clearTimeout(inputTimer);

    inputTimer = setTimeout(() => {
        taskInput.value = "";
        alert("Le texte a été supprimé après 10 secondes inactivite de votre  travail.");
    }, 10000);
});
