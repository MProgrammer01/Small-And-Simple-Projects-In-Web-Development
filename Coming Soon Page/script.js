// Email form handling
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const successMessage = document.getElementById('successMessage');
const notifyBtn = emailForm.querySelector('.notify-btn');

// Set the launch date (change this to your desired date)
// Format: 'Month Day, Year Hour:Minute:Second'
const launchDate = new Date('March 10, 2026 23:59:59').getTime();

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM elements
    document.getElementById('days').textContent = padZero(days);
    document.getElementById('hours').textContent = padZero(hours);
    document.getElementById('minutes').textContent = padZero(minutes);
    document.getElementById('seconds').textContent = padZero(seconds);

    // If countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // You can redirect or show a message here
        console.log('Launch time reached!');
    }
}

//initialization
updateCountdown()



emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Basic email validation
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Show loading state
    notifyBtn.classList.add('loading');
    notifyBtn.textContent = 'Processing...';
    
    // Simulate API call (replace with your actual API endpoint)
    setTimeout(() => {

        
        // Clear input
        emailInput.value = '';
        
        
        // Remove loading state
        notifyBtn.classList.remove('loading');

        notifyBtn.innerHTML = `
            Notify Me
            <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        // Hide form
        emailForm.style.display = 'none';
        
        // Show success message
        successMessage.classList.add('show');
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
            emailForm.style.display = 'flex';
        }, 5000);
        
    }, 1500); // Simulated delay
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    // Create error element if it doesn't exist
    let errorElement = document.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 16px 24px;
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 10px;
            color: #fca5a5;
            font-size: 0.95rem;
            margin-bottom: 24px;
        `;
        emailForm.parentNode.insertBefore(errorElement, emailForm);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'flex';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}

// Add leading zero to numbers less than 10
function padZero(num) {
    return num < 10 ? '0' + num : num;
}