const storedData = localStorage.getItem('timeSpentData');
console.log(storedData);

const ctx = document.getElementById('timeChart').getContext('2d');

// Function to get the name of the day from a date string
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Parse the stored data if it exists
let timeSpentData = [];
if (storedData) {
    timeSpentData = JSON.parse(storedData);
}

// Prepare data for the chart
const data = {
    labels: timeSpentData.map((entry, index) => daysOfWeek[index]), // Use index to directly map daysOfWeek
    datasets: [{
        label: 'Time Spent (hours)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Bar color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: timeSpentData.map(entry => entry.totalHours) // Extract totalHours directly
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