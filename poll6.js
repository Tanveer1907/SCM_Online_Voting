// poll6.js

let votes = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
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
        borderWidth: 1
      }]
    };
    const options = {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: {
            maxRotation: 0,
            minRotation: 0,
            autoSkip: false,
            font: { size: 14 }
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
  function updateTextualAnalysis() {
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  
    document.getElementById('aVotes').textContent = `A - ${votes.A} votes`;
    document.getElementById('bVotes').textContent = `B - ${votes.B} votes`;
    document.getElementById('cVotes').textContent = `C - ${votes.C} votes`;
    document.getElementById('dVotes').textContent = `D - ${votes.D} votes`;
  
    document.querySelectorAll('.options button').forEach(button => {
      const option = button.getAttribute('data-option');
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
      const option = this.getAttribute('data-option');
      votes[option]++;
      hasVoted = true;
  
      // Show analysis section
      document.getElementById('analysisSection').style.display = 'block';
  
      // Initialize chart if needed
      if (!chart) updateGraph();
  
      // Update UI
      updateTextualAnalysis();
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
  document.getElementById('startPollBtn1git').addEventListener('click', function() {
    window.location.href = 'poll6.html';
  });