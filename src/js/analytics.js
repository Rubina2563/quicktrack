const storedData = localStorage.getItem('timeSpentData');
console.log(storedData);

const ctx = document.getElementById('timeChart').getContext('2d');

// Parse the stored data if it exists
let timeSpentData = [];
if (storedData) {
    timeSpentData = JSON.parse(storedData);
}

// Extract totalHours from timeSpentData and create an array
const timeSpentHours = timeSpentData.map(entry => entry.totalHours);

// Prepare data for the chart
const data = {
    labels: timeSpentData.map(entry => entry.date),
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