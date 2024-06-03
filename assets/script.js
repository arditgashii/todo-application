// Initialize stacks and queues
let taskStack = [];
let taskQueue = []; 
let useStack = true;
let completedTasks = [];
let taskColors = ['#E26A96', '#AB83A1 ', '#CCCCFF', '#CF9FFF', '#FF00FF']; // Different colors added for each of new Task
let colorIndex = 0;

// Function to toggle between Stack and Queue
function toggleStackQueue() {
    useStack = !useStack;
    updateToggleButtonText();
}

// Function to update the text of the toggle button
function updateToggleButtonText() {
    const toggleButton = document.querySelector('.input-group-append .button');
    toggleButton.innerHTML = useStack ? 'Queue <i class="bi bi-arrow-left-right"></i>' : 'Stack <i class="bi bi-arrow-left-right"></i>';
    updateTaskList();
}


// Function to add a task (stack or queue)
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    // Check if the task is not an empty string
    if (task !== '') {
        // Create an object that represent the task with its name and a color
        const taskObject = { task, color: getNextColor() };
        
        if (useStack) {
            taskStack.unshift(taskObject); // Add at the beginning for a Stack
        } else {
            taskQueue.unshift(taskObject); // Add at the beginning for a Queue
        }

        updateTaskList();
        taskInput.value = '';
    }
}

// Function to update the task list on the webpage
function updateTaskList() {
    const taskList = document.getElementById('taskList');
    const completeTaskContainer = document.getElementById('completeTaskContainer');
    taskList.innerHTML = '';

    // Show if current task is Stack or Queue
    const currentTaskList = useStack ? taskStack : taskQueue;

    // This for loop creates dynamically HTML elements for each task in array, than displays the tasks on webpage
    for (let i = 0; i < currentTaskList.length; i++) {
        const { task, color } = currentTaskList[i];
        // Create a new div element for the task
        const taskItem = document.createElement('div');
        taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mt-2');
        taskItem.style.backgroundColor = color;
        taskItem.innerHTML = `<span>${task}</span>`;
        taskList.appendChild(taskItem);
    }

    // Show the "Complete Task" button only when there are tasks
    completeTaskContainer.style.display = currentTaskList.length > 0 ? 'block' : 'none';
}

// Function to mark the last task as completed
function completeTask() {
    const currentTaskList = useStack ? taskStack : taskQueue;

    if (currentTaskList.length > 0) {
        // LOGIC OF STACK AND QUEUE(POP for Last in First Out in Stack, and SHIFT for First in First Out in Queue)
        const { task, color } = useStack ? taskStack.pop() : taskQueue.shift();
        completedTasks.push({ task, color });
        updateTaskList();
    }
}

// Function to get the next color for a task
function getNextColor() {
    const color = taskColors[colorIndex];
    colorIndex = (colorIndex + 1) % taskColors.length;
    return color;
}

// Initial update of the task list
updateToggleButtonText();