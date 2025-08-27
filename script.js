
const tasklist = document.getElementById("tasklist");
const taskInput = document.getElementById("taskinput");
let inputTimer;

// Charger les tâches depuis localStorage au chargement de la page
window.onload = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach(task => renderTask(task.text, task.completed));
};

// Ajouter une tâche
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  renderTask(taskText, false);
  saveTasksToLocalStorage();
  taskInput.value = "";
}

// Afficher une tâche
function renderTask(text, completed) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.onchange = () => {
    taskSpan.classList.toggle("completed", checkbox.checked);
    saveTasksToLocalStorage();
  };

  const taskSpan = document.createElement("span");
  taskSpan.textContent = text;
  if (completed) {
    taskSpan.classList.add("completed");
  }

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<ion-icon name="pencil-outline"></ion-icon>';
  editBtn.onclick = () => {
    const newText = prompt("Modifier la tâche :", taskSpan.textContent);
    if (newText && newText.trim() !== "") {
      taskSpan.textContent = newText.trim();
      saveTasksToLocalStorage();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
  deleteBtn.onclick = () => {
    li.remove();
    saveTasksToLocalStorage();
  };

  li.appendChild(checkbox);
  li.appendChild(taskSpan);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  tasklist.appendChild(li);
}

// Sauvegarder les tâches dans localStorage
function saveTasksToLocalStorage() {
  const tasks = [];
  tasklist.querySelectorAll("li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("input[type='checkbox']").checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Timer d'inactivité
taskInput.addEventListener("input", () => {
  clearTimeout(inputTimer);
  inputTimer = setTimeout(() => {
    taskInput.value = "";
    alert("Le texte a été supprimé après 10 secondes d'inactivité.");
  }, 10000);
});

// Permet d'ajouter avec la touche Entrée
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
