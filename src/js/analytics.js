const storedData = localStorage.getItem('timeSpentData');
console.log(storedData);

const ctx = document.getElementById('timeChart').getContext('2d');

// Function to get the name of the day from a date string
const getDayName = (dateString) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    // Adjust the day index to start from Monday (index 0) instead of Sunday (index 0)
    const adjustedDayIndex = (dayIndex === 0) ? 6 : dayIndex - 1;
    return daysOfWeek[adjustedDayIndex];
};

// Parse the stored data if it exists
let timeSpentData = [];
if (storedData) {
    timeSpentData = JSON.parse(storedData);
}

// Extract totalHours from timeSpentData and create an array
const timeSpentHours = timeSpentData.map(entry => entry.totalHours);

// Prepare data for the chart
const data = {
    labels: timeSpentData.map(entry => getDayName(entry.date)), // Adjusted to get day names
    datasets: [{
        label: 'Time Spent (hours)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Bar color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: timeSpentHours
    }]
};

// Chart configuration
const options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

// Create and render the bar chart
const timeChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});