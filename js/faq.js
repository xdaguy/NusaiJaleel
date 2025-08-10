/* ===========================
   FAQ Accordion Functionality
   =========================== */

// DOM Elements
const faqItems = document.querySelectorAll('.faq-item');

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
        
        // Keyboard accessibility
        question.setAttribute('tabindex', '0');
        
        question.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    }
});

// Auto-expand first FAQ item on page load
document.addEventListener('DOMContentLoaded', () => {
    const firstFaqItem = document.querySelector('.faq-item');
    if (firstFaqItem) {
        // Uncomment to auto-expand first item
        // firstFaqItem.classList.add('active');
    }
});