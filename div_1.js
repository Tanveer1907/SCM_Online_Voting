// Show the small modal with the full announcement
function showFullAnnouncement(title, description) {
    const modal = document.getElementById('smallModal');
    document.getElementById('smallModalTitle').textContent = title;
    document.getElementById('smallModalDescription').textContent = description;
    modal.style.display = 'flex'; // Show the modal
}

// Close the small modal
function closeSmallModal() {
    const modal = document.getElementById('smallModal');
    modal.style.display = 'none'; // Hide the modal
}

// Close the modal when clicking outside the modal content
window.addEventListener('click', function (event) {
    const modal = document.getElementById('smallModal');
    if (event.target === modal) {
        closeSmallModal();
    }
});
document.getElementById('startPollBtn').addEventListener('click', function() {
    window.location.href = 'poll5.html';
  });
document.getElementById('startPollBtn1').addEventListener('click', function() {
    window.location.href = 'poll6.html';
  });
  