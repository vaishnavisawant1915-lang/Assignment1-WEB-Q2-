let tasks = [];

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    input.value = "";

    displayTasks();
    updateTaskInfo();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const li = document.createElement("li");
        li.className = "task-item";

        li.innerHTML = `
            <div class="task-content">
                <input 
                    type="checkbox" 
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>
            </div>

            <button 
                class="delete-btn" 
                onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(id) {

    const task = tasks.find(function(task) {
        return task.id === id;
    });

    if (task) {
        task.completed = !task.completed;
    }

    displayTasks();
    updateTaskInfo();
}

function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    displayTasks();
    updateTaskInfo();
}

function clearCompleted() {

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    displayTasks();
    updateTaskInfo();
}

function updateTaskInfo() {

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(function(task) {
        return task.completed;
    }).length;

    document.getElementById("totalTasks").textContent = totalTasks;

    document.getElementById("completedTasks").textContent = completedTasks;
}

document.getElementById("taskInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});