// Get the canvas element

var ctx = document.getElementById('timeChart').getContext('2d');

// Sample data for demonstration (you'll replace this with actual data)
var timeSpentData = [3, 5, 7, 6, 4, 8, 5]; // Time spent on tasks for each day of the week
con
// Prepare data for the chart
var data = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [{
    label: 'Time Spent (hours)',
    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Bar color
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1,
    data: timeSpentData
  }]
};

// Chart configuration
var options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

// Create and render the bar chart
var timeChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options
});
