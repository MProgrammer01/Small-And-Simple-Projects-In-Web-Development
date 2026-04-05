// Get elements
const cookieBanner = document.getElementById('cookieBanner');
const acceptBtn = document.getElementById('acceptBtn');
const declineBtn = document.getElementById('declineBtn');
const resetBtn = document.getElementById('resetBtn');

// Accept cookies
acceptBtn.addEventListener('click', function() {
    hideBanner();
    showSuccessMessage('Cookie preferences Accept!');
    
});

// Decline cookies
declineBtn.addEventListener('click', function() {
    hideBanner();
    showSuccessMessage('Cookie preferences Decline!');
    
});

// Reset cookie preference
resetBtn.addEventListener('click', function() {
    cookieBanner.classList.remove('display-none');
    showSuccessMessage('Cookie preferences reset!');
});

// Hide banner with animation
function hideBanner() {
    cookieBanner.classList.add('hiding');
    setTimeout(() => {
        cookieBanner.classList.add('display-none');
        cookieBanner.classList.remove('hiding');
    }, 400);
}


// Show success message
function showSuccessMessage(message) {
    // Create message element if it doesn't exist
    let messageEl = document.querySelector('.success-message');
    
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = 'success-message';
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.classList.add('show');
    
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 3000);
}
