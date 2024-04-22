const timeSpentData = initializeTimeSpentData();

    function initializeTimeSpentData() {
        const today = new Date();
        const timeSpentData = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            timeSpentData.push({
                date: date.toLocaleDateString(),
                totalHours: 0
            });
        }
        return timeSpentData;
    }
const render=() => {
    localStorage.removeItem('timeSpentData');

    const input = document.querySelector('#task-input');
    const list_el = document.querySelector('#tasks');

    const timeTrackerButton = document.querySelector('.time-tracker-button');

    timeTrackerButton.addEventListener('click',(e) => {
        e.preventDefault();
        const task = capitalize(input.value);

        if (!task) {
            alert("Please add a task");
            
        }

       
        const task_el = document.createElement('div');
        task_el.classList.add('task');
        list_el.appendChild(task_el);

        
        const content_el = document.createElement('div');
        content_el.classList.add('content');
        task_el.appendChild(content_el);

        const input_el = document.createElement('input');
        input_el.classList.add('text');
        input_el.type = 'text';
        input_el.value = task;
        input_el.setAttribute('readonly', 'readonly');
        content_el.appendChild(input_el);

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

    
        const start_btn = document.createElement('button');
        start_btn.classList.add('start');
        start_btn.innerText = "Start";
        controls_el.appendChild(start_btn);

        const stop_btn = document.createElement('button');
        stop_btn.classList.add('stop');
        stop_btn.innerText = "Stop";
        controls_el.appendChild(stop_btn);

        
        const actions_el = document.createElement('div');
        actions_el.classList.add('actions');
        task_el.appendChild(actions_el);

        const delete_btn = document.createElement('button');
        delete_btn.classList.add('delete');
        delete_btn.innerText = "Delete Task";
        actions_el.appendChild(delete_btn);

        
        input.value = "";

        
        let seconds = 0;
        let interval = null;
        let startTime = null; // Initialize startTime for each task

        start_btn.addEventListener('click', () => start(task_el));
        stop_btn.addEventListener('click', () => stop(task_el));

        
        function capitalize(str) {
            return str[0].toUpperCase() + str.slice(1);
        }

        
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
            updateLast7DaysData(startTime, endTime); // Update last 7 days data
             localStorage.setItem('timeSpentData', JSON.stringify(timeSpentData));
            console.log(timeSpentData);
        }

       
        delete_btn.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });

        
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

    const manualTrackerButton = document.querySelector('.manual-tracker-button');
    manualTrackerButton.addEventListener('click', () => {
        const taskDescription = input.value.trim();
        if (taskDescription !== '') {
            input.value = "";
            const manualTrackerForm = createManualTrackerForm(taskDescription);
            list_el.appendChild(manualTrackerForm);
        } else {
            alert("Please enter a task description first.");
        }
    });

    
    function calculateTotalTime(startTime, endTime) {
    
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);

       
    let timeDiff = end.getTime() - start.getTime();

    
    if (timeDiff < 0) {
        end.setDate(end.getDate() + 1);
        timeDiff = end.getTime() - start.getTime();
    }
    
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const totalMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const totalSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    
    const formattedTotalTime = `${totalHours}:${totalMinutes}:${totalSeconds}`;

    return formattedTotalTime;
    }
    
   function spentDataHr(startTime, endTime, index) { 
        
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);

    
    let timeDiff = end.getTime() - start.getTime();

    
    if (timeDiff < 0) {
        
        end.setDate(end.getDate() + 1);
        timeDiff = end.getTime() - start.getTime();
    }
  
         const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    
        timeSpentData[index].totalHours += totalHours;
    }

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

        const addButton = document.createElement('button');
        addButton.type = 'button'; 
        addButton.classList.add('add-button'); 
        addButton.textContent = 'Add';
        addButton.addEventListener('click', () => {
            const startTime = startTimeSelectHour.value + ':' + startTimeSelectMin.value;
            const endTime = endTimeSelectHour.value + ':' + endTimeSelectMin.value;
            const taskDate = taskDateInput.value;

            const date = new Date(taskDate);
            console.log("Day index:", date.getDay());
            const index = date.getDay();
            
            if (taskDate && startTime && endTime) {
                const totalTime = calculateTotalTime(startTime, endTime);
                const newTask = createNewTask(taskDescription, startTime, endTime, totalTime, taskDate);
                manualTrackerForm.replaceWith(newTask);

                spentDataHr(startTime, endTime, index);
                 localStorage.setItem('timeSpentData', JSON.stringify(timeSpentData));
                 console.log(timeSpentData); 
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

    function initializeTimeSpentData() {
        const today = new Date();
        const timeSpentData = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            timeSpentData.push({
                date: date.toLocaleDateString(),
                totalHours: 0
            });
        }
        return timeSpentData;
    }

    function updateLast7DaysData(startTime, endTime) {
        const today = new Date();
        const diffInDays = Math.floor((today - startTime) / (1000 * 60 * 60 * 24));
        if (diffInDays < 7) {
            const index = diffInDays+1;
            let totalHours = calculateTotalHours(startTime, endTime);
            if (totalHours !== Number) {
                totalHours = 1;
            }
            console.log(totalHours)
            
            
            timeSpentData[index].totalHours += totalHours;
        }
    
    }

    function calculateTotalHours(startTime, endTime) {
       
        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);

        
         let timeDiff = end.getTime() - start.getTime();

   
    if (timeDiff < 0) {
        
        end.setDate(end.getDate() + 1);
        timeDiff = end.getTime() - start.getTime();
    }  
        return timeDiff / (1000 * 60 * 60);
    }
    
    
 

    return timeSpentData;
};
 


const renderedData = render();




  
