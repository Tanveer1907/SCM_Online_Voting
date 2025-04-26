let votes = {
    "Mr. A": 0,
    "Ms. B": 0,
    "Dr. C": 0,
    "Mrs. D": 0,
    "Mrs. E": 0
};

let hasVoted = false;

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
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    };

    const ctx = document.getElementById('votesGraph').getContext('2d');
    new Chart(ctx, config);
}

function updateTextualAnalysis() {
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

    document.getElementById('mrAVotes').textContent = `Mr. A - ${votes["Mr. A"]} votes`;
    document.getElementById('msBVotes').textContent = `Ms. B - ${votes["Ms. B"]} votes`;
    document.getElementById('drCVotes').textContent = `Dr. C - ${votes["Dr. C"]} votes`;
    document.getElementById('mrsDVotes').textContent = `Mrs. D - ${votes["Mrs. D"]} votes`;
    document.getElementById('mrsEVotes').textContent = `Mrs. E - ${votes["Mrs. E"]} votes`;

    document.querySelectorAll('.options button').forEach(button => {
        const option = button.getAttribute('data-option');
        const percentage = ((votes[option] / totalVotes) * 100).toFixed(2);
        button.textContent = `${option} - ${percentage}%`;
        button.style.cursor = 'default';
    });
}

document.querySelectorAll('.options button').forEach(button => {
    button.addEventListener('click', () => {
        if (hasVoted) {
            alert('You have already voted!');
            return;
        }

        const selectedOption = button.getAttribute('data-option');
        votes[selectedOption]++;
        hasVoted = true;

        document.querySelectorAll('.options button').forEach(btn => btn.disabled = true);

        document.getElementById('analysisSection').style.display = 'block';

        updateGraph();
        updateTextualAnalysis();
    });
});
