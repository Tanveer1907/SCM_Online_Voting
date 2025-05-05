// poll_3.js

// Initialize votes for all 5 options
const votes = {
    "Mr. A": 0,
    "Ms. B": 0,
    "Dr. C": 0,
    "Mrs. D": 0,
    "Mrs. E": 0
};

let chart = null;
let hasVoted = false;

// Map between teacher names and display IDs
const optionMap = {
    "Mr. A": "votesA",
    "Ms. B": "votesB",
    "Dr. C": "votesC",
    "Mrs. D": "votesD",
    "Mrs. E": "votesE"
};

// Store original button texts to restore later if needed
const originalButtonTexts = {};

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
                backgroundColor: 'rgba(0, 123, 255, 0.7)',  // Blue fill
                borderColor: 'rgba(0, 123, 255, 1)',        // Blue border
                borderWidth: 1
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
    for (const [option, id] of Object.entries(optionMap)) {
        document.getElementById(id).textContent = `${option} - ${votes[option]} vote${votes[option] !== 1 ? 's' : ''}`;
    }

    // Update button percentages, keep original label + percentage
    document.querySelectorAll('.options button').forEach(button => {
        const option = button.dataset.option;
        const percentage = totalVotes > 0 
            ? ((votes[option]/totalVotes)*100).toFixed(1) 
            : 0;

        // Use original button text + percentage
        const originalText = originalButtonTexts[option] || option;
        button.textContent = `${originalText} (${percentage}%)`;
    });

    // Update chart data
    if(chart) {
        chart.data.datasets[0].data = Object.values(votes);
        chart.update();
    }
}

// Save original button texts on page load
document.querySelectorAll('.options button').forEach(button => {
    const option = button.dataset.option;
    originalButtonTexts[option] = button.textContent;
});

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
            b.style.cursor = 'not-allowed';
            b.style.opacity = '0.6';
            b.style.transform = 'none';
        });
    });
});
