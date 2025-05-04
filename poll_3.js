// poll_3.js

// Initialize votes for all 5 options
let votes = {
    "Mr. A": 0,
    "Ms. B": 0,
    "Dr. C": 0,
    "Mrs. D": 0,
    "Mrs. E": 0
};

let chart = null;
let hasVoted = false;
let chart = null; // Store chart instance

// Map between teacher names and display IDs
const optionMap = {
    "Mr. A": "votesA",
    "Ms. B": "votesB",
    "Dr. C": "votesC",
    "Mrs. D": "votesD",
    "Mrs. E": "votesE"
};

// Initialize chart
function createChart() {
    const ctx = document.getElementById('votesGraph').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(votes),
            datasets: [{
                label: 'Votes',
                data: Object.values(votes),
                backgroundColor: [
                    '#43c6ac', '#191654', '#ff6b6b', '#4ecdc4', '#6c5ce7'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    beginAtZero: true,
                    ticks: { precision: 0 }
                }
            }
        }
    });
}

function updateAnalysis() {
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    
    // Update text analysis
    document.getElementById('votesA').textContent = `Mr. A - ${votes["Mr. A"]} votes`;
    document.getElementById('votesB').textContent = `Ms. B - ${votes["Ms. B"]} votes`;
    document.getElementById('votesC').textContent = `Dr. C - ${votes["Dr. C"]} votes`;
    document.getElementById('votesD').textContent = `Mrs. D - ${votes["Mrs. D"]} votes`;
    document.getElementById('votesE').textContent = `Mrs. E - ${votes["Mrs. E"]} votes`;

    // Update button percentages
    document.querySelectorAll('.options button').forEach(button => {
        const option = button.dataset.option;
        const percentage = totalVotes > 0 
            ? `${((votes[option]/totalVotes)*100).toFixed(1)}%` 
            : '0%';
        button.textContent = `${option} (${percentage})`;
    });

    // Update chart data
    if(chart) {
        chart.data.datasets[0].data = Object.values(votes);
        chart.update();
    }
}

// Handle voting
document.querySelectorAll('.options button').forEach(btn => {
    btn.addEventListener('click', function() {
        if(hasVoted) {
            alert('You can only vote once!');
            return;
        }
        
        const option = this.dataset.option;
        votes[option]++;
        hasVoted = true;
        
        // Show analysis section
        document.getElementById('analysisSection').style.display = 'block';
        
        // Initial chart creation if needed
        if(!chart) createChart();
        
        // Update UI
        updateAnalysis();
        
        // Disable buttons and add visual feedback
        document.querySelectorAll('.options button').forEach(b => {
            b.disabled = true;
            b.style.background = '#e3e3e3';
            b.style.transform = 'none';
        });
    });
});
