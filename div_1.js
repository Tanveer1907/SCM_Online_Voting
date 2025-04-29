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