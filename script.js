document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn'); // Select the "Add Task" button
    const taskInput = document.getElementById('task-input'); // Select the input field for tasks
    const taskList = document.getElementById('task-list'); // Select the list where tasks will be shown

    // Load tasks from local storage on page load
    loadTasks();

    // Event listener for clicking the "Add Task" button
    addButton.addEventListener('click', () => {
        addTask(taskInput.value); // Add task on button click
    });

    // Event listener for pressing "Enter" key to add a task
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value); // Add task on pressing Enter
        }
    });

    // Function to load tasks from local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Add tasks without saving in local storage initially
    }

    // Function to add a task to the list
    function addTask(taskText, save = true) {
        taskText = taskText.trim(); // Trim whitespace

        // If task is empty, prompt the user
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // Add styling for the remove button

        // Append the remove button to the task
        li.appendChild(removeBtn);

        // Add the task to the task list (ul)
        taskList.appendChild(li);

        // Clear the input field after adding the task
        taskInput.value = "";

        // Add event listener to the remove button
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li); // Remove task from the list
            removeTask(taskText); // Remove task from local storage
        });

        // Save the task in local storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText); // Add new task to the list
            localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save updated tasks to local storage
        }
    }

    // Function to remove a task from local storage
    function removeTask(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove task from array
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update local storage with the remaining tasks
    }
});
