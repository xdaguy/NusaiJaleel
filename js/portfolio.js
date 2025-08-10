/* ===========================
   Portfolio Filter Functionality
   =========================== */

// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Portfolio Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Portfolio Hover Effects
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });
});