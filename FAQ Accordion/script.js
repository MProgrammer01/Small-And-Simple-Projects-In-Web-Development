// Get all FAQ items
const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

// Add click event to each question
faqQuestions.forEach((question, index) => {
    question.addEventListener('click', () => {
        toggleFAQ(index);
    });
});

// Toggle FAQ function
function toggleFAQ(index) {
    const clickedItem = faqItems[index];
    const isActive = clickedItem.classList.contains('active');
    
    // Close all other items
    faqItems.forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('active');
        }
    });
    
    // Toggle clicked item
    if (isActive) {
        clickedItem.classList.remove('active');
    } else {
        clickedItem.classList.add('active');
    }
}
