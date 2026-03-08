// Get form elements
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const sendAnotherBtn = document.getElementById('sendAnotherBtn');
const submitBtn = contactForm.querySelector('.submit-btn');

let isValid = true;

// add validation to input when blur
const inputs = contactForm.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
});

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    
    // Validate first name
    if (field.name === 'firstName' && value === '') {
        showError('firstName', 'First name is required');
        isValid = false;
        return;
    }
    
    // Validate last name
    if (field.name === 'lastName' && value === '') {
        showError('lastName', 'Last name is required');
        isValid = false;
        return;
    }
    
    // Validate email
    if (field.type === 'email' && value === '') {
        showError('email', 'Email is required');
        isValid = false;
        return;
    } else if (field.type === 'email' && !isValidEmail(value)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
        return;
    }
    
    // Validate subject
    if (field.type === 'subject' && value === '') {
        showError('subject', 'Please select a subject');
        isValid = false;
        return;
    }
    
    // Validate message
    if (field.type === 'message' && value === '') {
        showError('message', 'Message is required');
        isValid = false;
        return;
    } else if (field.type === 'message' && value.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
        return;
    }

    isValid = true;
}

// Show error function
function showError(fieldId, errorText) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    console.log(errorText);
     errorMessage.textContent = errorText;
    errorMessage.style.display = "block";
    
    // Remove error on input
    field.addEventListener('input', function() {
        formGroup.classList.remove('error');
        errorMessage.style.display = "none";
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Remove previous errors
    clearErrors();
    
    // If all valid, submit form
    if (isValid) {
        submitForm();
    }
});

// Clear all errors
function clearErrors() {
    const errorGroups = document.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => {
        group.classList.remove('error');
    });
}

// Submit form function
function submitForm() {
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = originalText;
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        contactForm.reset();
        
    }, 1500); // Simulated delay
}

// Show success modal
function showSuccessModal() {
    successModal.classList.add('show');
}

// Hide success modal
function hideSuccessModal() {
    successModal.classList.remove('show');
}

// Send another message button
sendAnotherBtn.addEventListener('click', function() {
    hideSuccessModal();
});

// Form animation on load
window.addEventListener('load', function() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.4s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
