// poll_3.js

// Initialize votes for all 5 options
let votes = {
    "Mr. A": 0,
    "Ms. B": 0,
    "Dr. C": 0,
    "Mrs. D": 0,
    "Mrs. E": 0
};

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

function updateGraph() {
    const ctx = document.getElementById('votesGraph').getContext('2d');
    
    const data = {
        labels: Object.keys(votes),
        datasets: [{
            label: 'Votes',
            data: Object.values(votes),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderWidth: 1
        }]
    };

    if (chart) {
        chart.data = data;
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }
}

function updateTextualAnalysis() {
    // Update vote counts in analysis section
    Object.entries(optionMap).forEach(([teacher, id]) => {
        const count = votes[teacher];
        document.getElementById(id).textContent = 
            `${teacher}: ${count} vote${count !== 1 ? 's' : ''}`;
    });
}

document.querySelectorAll('.options button').forEach(button => {
    button.addEventListener('click', () => {
        if (hasVoted) {
            alert('You can only vote once!');
            return;
        }

        const selectedOption = button.dataset.option;
        votes[selectedOption]++;
        hasVoted = true;

        // Disable all buttons after voting
        document.querySelectorAll('.options button').forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
        });

        // Show analysis section
        document.getElementById('analysisSection').style.display = 'block';
        
        // Update displays
        updateGraph();
        updateTextualAnalysis();
    });
});
