window.addEventListener('load', () => {
    // Switch statement
    const personalisation = document.getElementById('switch');
    let day;
    switch (new Date().getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    }
    personalisation.innerHTML = "Hi there, happy " + day + "!";

    // Task form
    const input = document.querySelector('#task-input');
    const list_el = document.querySelector('#tasks');

    const timeTrackerButton = document.querySelector('.time-tracker-button');
    timeTrackerButton.addEventListener('click', (e) => {
        e.preventDefault();

        const task = capitalize(input.value);

        if (!task) {
            alert("Please add a task");
            return;
        }

        // Create task element
        const task_el = document.createElement('div');
        task_el.classList.add('task');
        list_el.appendChild(task_el);

        // Content
        const content_el = document.createElement('div');
        content_el.classList.add('content');
        task_el.appendChild(content_el);

        const input_el = document.createElement('input');
        input_el.classList.add('text');
        input_el.type = 'text';
        input_el.value = task;
        input_el.setAttribute('readonly', 'readonly');
        content_el.appendChild(input_el);

        // Counter
        const counter_el = document.createElement('div');
        counter_el.classList.add('counter');
        task_el.appendChild(counter_el);

        const time_el = document.createElement('div');
        time_el.classList.add('time');
        time_el.innerText = "00:00:00";
        counter_el.appendChild(time_el);

        const timestamp_el = document.createElement('div');
        timestamp_el.classList.add('timestamp');
        counter_el.appendChild(timestamp_el);

        const controls_el = document.createElement('div');
        controls_el.classList.add('controls');
        counter_el.appendChild(controls_el);

        // Add buttons elements to controls
        const start_btn = document.createElement('button');
        start_btn.classList.add('start');
        start_btn.innerText = "Start";
        controls_el.appendChild(start_btn);

        const stop_btn = document.createElement('button');
        stop_btn.classList.add('stop');
        stop_btn.innerText = "Stop";
        controls_el.appendChild(stop_btn);

        // Actions
        const actions_el = document.createElement('div');
        actions_el.classList.add('actions');
        task_el.appendChild(actions_el);

        const delete_btn = document.createElement('button');
        delete_btn.classList.add('delete');
        delete_btn.innerText = "Delete Task";
        actions_el.appendChild(delete_btn);

        // Input value
        input.value = "";

        // Counter
        let seconds = 0;
        let interval = null;
        let startTime = null; // Initialize startTime for each task

        start_btn.addEventListener('click', () => start(task_el));
        stop_btn.addEventListener('click', () => stop(task_el));

        // Capitalize first letter
        function capitalize(str) {
            return str[0].toUpperCase() + str.slice(1);
        }

        // Counter functions
        function timer() {
            seconds++;

            let hrs = Math.floor(seconds / 3600);
            let mins = Math.floor((seconds - (hrs * 3600)) / 60);
            let secs = seconds % 60;

            if (secs < 10) secs = '0' + secs;
            if (mins < 10) mins = '0' + mins;
            if (hrs < 10) hrs = '0' + hrs;

            time_el.innerText = `${hrs}:${mins}:${secs}`;
        }

        function start(task_el) {
            if (!startTime) {
                startTime = new Date();
            }
            if (interval) {
                return;
            }
            interval = setInterval(timer, 1000);
        }

        function stop(task_el) {
            const endTime = new Date();
            clearInterval(interval);
            interval = null;
            displayTimestamps(startTime, endTime); // Pass startTime and endTime to displayTimestamps
        }

        // Delete task
        delete_btn.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });

        // For timestamps
        function displayTimestamps(startTime, endTime) {
            const startTimestamp = formatTimestamp(startTime);
            const endTimestamp = formatTimestamp(endTime);
            timestamp_el.innerText = `Started: ${startTimestamp} | Ended: ${endTimestamp}`;
        }

        function formatTimestamp(timestamp) {
            const date = timestamp.toLocaleDateString();
            const time = timestamp.toLocaleTimeString();
            return `${date} ${time}`;
        }
    });


    //calculating total time spent
    function calculateTotalTime(startTime, endTime) {
    // Convert start and end time to Date objects
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);

    // Calculate the difference in milliseconds
    const timeDiff = end.getTime() - start.getTime();

    // Convert milliseconds to hours, minutes, and seconds
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const totalMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const totalSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Format the total time
    const formattedTotalTime = `${totalHours}:${totalMinutes}:${totalSeconds}`;

    return formattedTotalTime;
}


    const manualTrackerButton = document.querySelector('.manual-tracker-button');
    manualTrackerButton.addEventListener('click', () => {
        const taskDescription = input.value.trim();
        if (taskDescription !== '') {
            const manualTrackerForm = createManualTrackerForm(taskDescription);
           
            list_el.appendChild(manualTrackerForm);
        } else {
            alert("Please enter a task description first.");
        }
    });

    function createManualTrackerForm(taskDescription) {
        const manualTrackerForm = document.createElement('div');
        manualTrackerForm.classList.add('manual-tracker-form');

        const heading = document.createElement('h2');
        heading.textContent = taskDescription;
        manualTrackerForm.appendChild(heading);

        const form = document.createElement('form');
        form.id = 'manual-task-form';

        const timeInputsDiv = document.createElement('div');
        timeInputsDiv.classList.add('time-inputs');

        const startTimeDiv = document.createElement('div');
        startTimeDiv.textContent = 'Start Time:';
        const startTimeSelectHour = createSelect('hour-start', 0, 24);
        const startTimeSelectMin = createSelect('min-start', 0, 59);
        startTimeDiv.appendChild(startTimeSelectHour);
        startTimeDiv.appendChild(document.createTextNode(':'));
        startTimeDiv.appendChild(startTimeSelectMin);
        timeInputsDiv.appendChild(startTimeDiv);

        const endTimeDiv = document.createElement('div');
        endTimeDiv.textContent = 'End Time:';
        const endTimeSelectHour = createSelect('hour-end', 0, 24);
        const endTimeSelectMin = createSelect('min-end', 0, 59);
        endTimeDiv.appendChild(endTimeSelectHour);
        endTimeDiv.appendChild(document.createTextNode(':'));
        endTimeDiv.appendChild(endTimeSelectMin);
        timeInputsDiv.appendChild(endTimeDiv);

        form.appendChild(timeInputsDiv);

        const taskDateInput = createInput('date', 'task-date', 'Task date', true);
        taskDateInput.classList.add('date-inputs');
        timeInputsDiv.appendChild(taskDateInput);

        //calculating total time
        

        const addButton = document.createElement('button');
        addButton.type = 'button'; // Change type to 'button' to prevent form submission
        addButton.classList.add('add-button'); // Add class for styling
        addButton.textContent = 'Add';
        addButton.addEventListener('click', () => {
            const startTime = startTimeSelectHour.value + ':' + startTimeSelectMin.value;
            const endTime = endTimeSelectHour.value + ':' + endTimeSelectMin.value;
            const taskDate = taskDateInput.value;
            if (taskDate && startTime && endTime) {
                const totalTime = calculateTotalTime(startTime, endTime);
                const newTask = createNewTask(taskDescription, startTime, endTime, totalTime, taskDate);
                manualTrackerForm.replaceWith(newTask);
            } else {
                alert("Please fill in all fields.");
            }
        });
        form.appendChild(addButton);

        manualTrackerForm.appendChild(form);

        return manualTrackerForm;
    }

    function createNewTask(taskDescription, startTime, endTime,  totalTime, taskDate) {
        const taskBox = document.createElement('div');
        taskBox.classList.add('task');

        const content_el = document.createElement('div');
        content_el.classList.add('content');
        taskBox.appendChild(content_el);

        const taskInfo = document.createElement('p');
        taskInfo.innerText = `Task: ${taskDescription}\nStart Time: ${startTime}\nEnd Time: ${endTime}\nTotal Time: ${totalTime}\nDate: ${taskDate}`;
        content_el.appendChild(taskInfo);

        const delete_btn = document.createElement('button');
        delete_btn.classList.add('delete');
        delete_btn.innerText = "Delete Task";
        delete_btn.addEventListener('click', () => {
            taskBox.remove();
        });
        taskBox.appendChild(delete_btn);

        return taskBox;
    }

    function createInput(type, name, placeholder, required) {
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = placeholder;
        input.required = required;
        return input;
    }

    function createSelect(name, min, max) {
        const select = document.createElement('select');
        select.name = name;
        for (let i = min; i <= max; i++) {
            const option = document.createElement('option');
            option.value = i < 10 ? '0' + i : '' + i;
            option.textContent = option.value;
            select.appendChild(option);
        }
        return select;
    }
});