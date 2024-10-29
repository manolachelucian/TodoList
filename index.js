let taskInput = document.getElementById("inputText");
const submit = document.getElementById("submit");
let taskList = document.getElementById("listContainer");

loadTasks();

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        createTaskElement(task, false);
        taskInput.value = "";
        saveTasks();
    } else {
        alert("Enter something...");
    }
}

function createTaskElement(taskText, completed) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("d-flex", "justify-content-between", "align-items-center", "p-2", "my-2", "border", "rounded");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.classList.add("me-2");


    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskContent);

    if (completed) taskContent.style.textDecoration = "line-through";

    checkbox.addEventListener("change", function () {
        taskContent.style.textDecoration = checkbox.checked ? "line-through" : "none";
        saveTasks();
    });


    const dateTime = document.createElement("small");
    dateTime.classList.add("text-muted", "ms-3");
    dateTime.textContent = new Date().toLocaleDateString();
    taskElement.appendChild(dateTime);


    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-sm", "btn-danger", "ms-3");
    deleteButton.textContent = "DELETE";
    deleteButton.addEventListener("click", function() {
        taskList.removeChild(taskElement);
        saveTasks();
    });
    taskElement.appendChild(deleteButton);


    taskList.appendChild(taskElement);
}

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll("li").forEach(item => {
        tasks.push({
            text: item.querySelector("span").textContent.trim(),
            completed: item.querySelector("input[type=checkbox]").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}

submit.addEventListener("click", addTask);
