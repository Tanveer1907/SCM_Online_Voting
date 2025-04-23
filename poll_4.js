let votes = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0
};

let hasVoted = false;

function updateGraph() {
    const data = {
        labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
        datasets: [{
            label: 'Number of Votes',
            data: [votes["1"], votes["2"], votes["3"], votes["4"], votes["5"]],
            backgroundColor: ['#dc3545', '#fd7e14', '#ffc107', '#28a745', '#007bff'],
            borderColor: ['#a71d2a', '#c05600', '#b38600', '#1e7e34', '#0056b3'],
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

    document.getElementById('star1Votes').textContent = `1 Star - ${votes["1"]} votes`;
    document.getElementById('star2Votes').textContent = `2 Stars - ${votes["2"]} votes`;
    document.getElementById('star3Votes').textContent = `3 Stars - ${votes["3"]} votes`;
    document.getElementById('star4Votes').textContent = `4 Stars - ${votes["4"]} votes`;
    document.getElementById('star5Votes').textContent = `5 Stars - ${votes["5"]} votes`;

    document.querySelectorAll('.options button').forEach(button => {
        const option = button.getAttribute('data-option');
        const percentage = totalVotes ? ((votes[option] / totalVotes) * 100).toFixed(2) : 0;
        button.textContent = `${option} Star${option === "1" ? "" : "s"} - ${percentage}%`;
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
