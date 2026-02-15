let taskInput = document.getElementById("taskInput");
let btnAddTask = document.getElementById("btnAddTodo");
let statusItems = document.querySelectorAll(".Container-Status li");
let clearCompletedTask = document.getElementById("CompletedStatusSelected");
let containerTasks = document.getElementById("TasksList");
let noTaskYet = document.getElementById("NoTaskYet");
let noTaskYetMessage = document.getElementById("NoTaskYetMessage");
let lengthOfTasks = document.getElementById("lengthOfTasks");
let key = "tasks";
function saveTasks(tasks, key) {
    localStorage.setItem(key, JSON.stringify(tasks));
}
function getAllTasks(key) {
    const tasksJSON = localStorage.getItem(key);
    if (tasksJSON) {
        const tasks = JSON.parse(tasksJSON);
        return tasks;
    }
    return [];
}
function changeStatusOfTask(id, key) {
    const tasks = getAllTasks(key);
    const task = tasks.find((t) => t.id === id);
    if (task) {
        task.Active = !task.Active;
        task.Complete = !task.Complete;
        saveTasks(tasks, key);
    }
}
function clearCompleted(key) {
    const tasks = getAllTasks(key);
    const activeTasks = tasks.filter((task) => task.Complete === false);
    saveTasks(activeTasks, key);
    location.reload();
}
function getAllActiveTasks(key) {
    return getAllTasks(key).filter((task) => task.Active === true);
}
function getAllCompleteTasks(key) {
    return getAllTasks(key).filter((task) => task.Complete === true);
}
statusItems.forEach((item) => {
    item.addEventListener("click", function () {
        statusItems.forEach((li) => li.classList.remove("Selected-Status"));
        item.classList.add("Selected-Status");
        let filter = item.dataset.filter;
        if (filter === "completed") {
            clearCompletedTask.style.display = "block";
        }
        else {
            clearCompletedTask.style.display = "none";
        }
        filterTasks(filter, key);
    });
});
function filterTasks(filter, key) {
    containerTasks.innerHTML = "";
    let Tasks = [];
    switch (filter) {
        case "all":
            Tasks = getAllTasks(key);
            noTaskYetMessage.textContent = "No Task Added Yet";
            break;
        case "active":
            Tasks = getAllActiveTasks(key);
            noTaskYetMessage.textContent = "No Active Task Added Yet";
            break;
        case "completed":
            Tasks = getAllCompleteTasks(key);
            noTaskYetMessage.textContent = "No Complete Task Added Yet";
            break;
    }
    lengthOfTasks.textContent = Tasks.length.toString();
    if (Tasks.length === 0) {
        noTaskYet.style.display = "block";
        return;
    }
    noTaskYet.style.display = "none";
    Tasks.forEach((task) => {
        const taskItemDiv = taskItem(task, key);
        containerTasks.appendChild(taskItemDiv);
    });
}
function taskItem(task, key) {
    const div = document.createElement("div");
    div.className = "Task-Item";
    // div.dataset.idTask = task.id.toString();
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "Checkbox-item";
    checkbox.checked = task.Complete;
    checkbox.addEventListener("click", () => {
        changeStatusOfTask(task.id, key);
        label.className = checkbox.checked ? "Checked" : "Unchecked";
    });
    const label = document.createElement("label");
    label.className = task.Complete ? "Checked" : "Unchecked";
    label.textContent = task.Task;
    label.htmlFor = `task-${task.id}`;
    div.appendChild(checkbox);
    div.appendChild(label);
    return div;
}
function addTask(text, key) {
    const tasks = getAllTasks(key);
    const tasksLength = tasks.length;
    const newTask = {
        id: tasksLength + 1,
        Task: text.trim(),
        Active: true,
        Complete: false,
    };
    tasks.push(newTask);
    saveTasks(tasks, key);
    taskInput.value = "";
    location.reload();
}
btnAddTask.addEventListener("click", () => addTask(taskInput.value.trim(), key));
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask(taskInput.value.trim(), key);
    }
});
clearCompletedTask.addEventListener("click", () => clearCompleted(key));
window.addEventListener("load", () => filterTasks("all", key));
export {};
//# sourceMappingURL=scripts.js.map