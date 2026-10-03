document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCounter = document.getElementById('taskCounter');
    const clearAllBtn = document.getElementById('clearAllBtn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        let pendingCount = 0;

        tasks.forEach((task, index) => {
            if (!task.completed) pendingCount++;

            const li = document.createElement('li');
            
            li.innerHTML = `
                <div class="task-content">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                    <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                </div>
                <div class="action-btns">
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            
            taskList.appendChild(li);
        });

        taskCounter.textContent = `${pendingCount} pending task${pendingCount === 1 ? '' : 's'}`;
    }

    addTaskBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({ text: text, completed: false });
            taskInput.value = '';
            saveAndRender();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveAndRender();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveAndRender();
    };

    window.editTask = (index) => {
        const newText = prompt('Edit your task:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
            saveAndRender();
        }
    };

    clearAllBtn.addEventListener('click', () => {
        if (tasks.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
            tasks = [];
            saveAndRender();
        }
    });

    renderTasks();
});