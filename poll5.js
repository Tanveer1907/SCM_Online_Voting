let votes = {
  "Jashan Devgan": 0,
  "Kartikya Sokhal": 0,
  "Tanishq Chhabra": 0,
  "Tanveer Singh": 0
};

let hasVoted = false;
let chart = null;

// Create or update the Chart.js bar chart
function updateGraph() {
  const ctx = document.getElementById('votesGraph').getContext('2d');
  const data = {
    labels: Object.keys(votes),
    datasets: [{
      label: 'Votes',
      data: Object.values(votes),
      backgroundColor: ['#007BFF', '#28A745', '#FFC107', '#DC3545'],
      borderColor: ['#0056b3', '#1e7e34', '#d39e00', '#bd2130'],
      borderWidth: 1,
      categoryPercentage: 0.7, // less width for bars
      barPercentage: 0.7
    }]
  };
  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        offset: true,
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
          font: { size: 13 }
        }
      },
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };
  if (chart) {
    chart.data = data;
    chart.options = options;
    chart.update();
  } else {
    chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
  }
}

// Update textual analysis and button percentages
function updateAnalysis() {
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  document.getElementById('DevganVotes').textContent = `Jashan Devgan - ${votes["Jashan Devgan"]} votes`;
  document.getElementById('SokhalVotes').textContent = `Kartikya Sokhal - ${votes["Kartikya Sokhal"]} votes`;
  document.getElementById('ChhabraVotes').textContent = `Tanishq Chhabra - ${votes["Tanishq Chhabra"]} votes`;
  document.getElementById('TanveerVotes').textContent = `Tanveer Singh - ${votes["Tanveer Singh"]} votes`;

  document.querySelectorAll('.options button').forEach(button => {
    const option = button.dataset.option;
    const percentage = totalVotes > 0
      ? ((votes[option] / totalVotes) * 100).toFixed(1)
      : "0.0";
    button.textContent = `${option} (${percentage}%)`;
  });
}

// Handle voting
document.querySelectorAll('.options button').forEach(button => {
  button.addEventListener('click', function() {
    if (hasVoted) {
      alert('You can only vote once!');
      return;
    }
    const option = this.dataset.option;
    votes[option]++;
    hasVoted = true;

    // Show analysis section
    document.getElementById('analysisSection').style.display = 'block';

    // Initialize chart if needed
    if (!chart) updateGraph();

    // Update UI
    updateAnalysis();
    updateGraph();

    // Disable buttons and add visual feedback
    document.querySelectorAll('.options button').forEach(b => {
      b.disabled = true;
      b.style.background = '#e9ecef';
      b.style.color = '#6c757d';
      b.style.cursor = 'not-allowed';
      b.style.transform = 'none';
    });
  });
});
