// Get elements
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const subscribeBtn = newsletterForm.querySelector('.subscribe-btn');
const newsletterCard = document.getElementById('newsletterCard');
const successCard = document.getElementById('successCard');
const anotherBtn = document.getElementById('anotherBtn');
const confettiContainer = document.getElementById('confettiContainer');

// Form submit handler
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Validate email
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show loading state
    subscribeBtn.classList.add('loading');
    subscribeBtn.textContent = 'Subscribing...';
    
    // Simulate API call
    setTimeout(() => {
        // Hide newsletter card
        newsletterCard.classList.add('hidden');
        
        // Show success card
        successCard.classList.remove('hidden');
        
        // Trigger confetti
        createConfetti();
        
        // Reset button
        subscribeBtn.classList.remove('loading');
        subscribeBtn.textContent = 'Subscribe';
        
        
    }, 1500);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Create confetti animation
function createConfetti() {
    const colors = [
        '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd',
        '#f9bec7', '#a8dadc', '#457b9d', '#1d3557', '#f1faee',
        '#e63946', '#f4a261', '#e9c46a', '#2a9d8f', '#264653',
        '#8338ec', '#3a86ff', '#fb5607', '#ffbe0b', '#06ffa5'
    ];
    
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        createConfettiPiece(colors);
    }
}

function createConfettiPiece(colors) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.backgroundColor = color;
    
    // Random size
    const size = Math.random() * 8 + 5;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    
    // Random starting position (center of screen)
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    confetti.style.left = startX + 'px';
    confetti.style.top = startY + 'px';
    
    // Random shape (square or circle)
    if (Math.random() > 0.5) {
        confetti.style.borderRadius = '50%';
    }
    
    confettiContainer.appendChild(confetti);
    
    // Animate confetti
    animateConfetti(confetti);
}

function animateConfetti(confetti) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 500 + 400;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    const gravity = 800;
    const startTime = Date.now();
    const duration = 3000;
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
            confetti.remove();
            return;
        }
        
        const t = elapsed / 1000;
        
        // Calculate position
        const x = parseFloat(confetti.style.left) + vx * t * 0.01;
        const y = parseFloat(confetti.style.top) + (vy * t * 0.01) + (0.5 * gravity * t * t * 0.01);
        
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        
        // Fade out
        confetti.style.opacity = 1 - progress;
        
        // Rotation
        confetti.style.transform = `rotate(${progress * 720}deg)`;
        
        requestAnimationFrame(update);
    }
    
    update();
}

// Subscribe another button
anotherBtn.addEventListener('click', function() {
    // Hide success card
    successCard.classList.add('hidden');
    
    // Show newsletter card
    newsletterCard.classList.remove('hidden');
    
    // Reset form
    emailInput.value = '';
    emailInput.focus();
});

// Enter key to submit
emailInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        newsletterForm.dispatchEvent(new Event('submit'));
    }
});




