// Initial vote data
let votes = {
    "Rs. 100": 0,
    "Rs. 250": 0,
    "Rs. 300": 0,
    "Rs. 500": 0
};

// Prevent multiple votes
let hasVoted = false;

// Update the graph dynamically
function updateGraph() {
    const data = {
        labels: Object.keys(votes),
        datasets: [{
            label: 'Number of Votes',
            data: Object.values(votes),
            backgroundColor: ['#007BFF', '#28A745', '#FFC107', '#DC3545'],
            borderColor: ['#0056b3', '#1e7e34', '#d39e00', '#bd2130'],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const ctx = document.getElementById('votesGraph').getContext('2d');
    new Chart(ctx, config);
}

// Update textual analysis
function updateTextualAnalysis() {
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

    document.getElementById('rs100Votes').textContent = `Rs. 100 - ${votes["Rs. 100"]} votes`;
    document.getElementById('rs250Votes').textContent = `Rs. 250 - ${votes["Rs. 250"]} votes`;
    document.getElementById('rs300Votes').textContent = `Rs. 300 - ${votes["Rs. 300"]} votes`;
    document.getElementById('rs500Votes').textContent = `Rs. 500 - ${votes["Rs. 500"]} votes`;

    document.querySelectorAll('.options button').forEach(button => {
        const option = button.getAttribute('data-option');
        const percentage = ((votes[option] / totalVotes) * 100).toFixed(2);
        button.textContent = `${option} - ${percentage}%`;
        button.style.cursor = 'default'; // Remove pointer cursor
    });
}

// Handle vote submission
document.querySelectorAll('.options button').forEach(button => {
    button.addEventListener('click', () => {
        if (hasVoted) {
            alert('You have already voted!');
            return;
        }

        const selectedOption = button.getAttribute('data-option');
        votes[selectedOption]++;
        hasVoted = true;

        // Disable all buttons
        document.querySelectorAll('.options button').forEach(btn => btn.disabled = true);

        // Show the analysis section
        document.getElementById('analysisSection').style.display = 'block';

        // Update the graph and textual analysis
        updateGraph();
        updateTextualAnalysis();
    });
});