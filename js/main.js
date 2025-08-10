/* ===========================
   Main JavaScript File
   =========================== */

// Import all modules (in a real project, you'd use ES6 modules or a bundler)
// For now, we'll load them via script tags in HTML

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website initialized successfully!');
    
    // Initialize components
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    // Check if all required elements exist
    checkRequiredElements();
    
    // Initialize analytics (if not localhost)
    if (window.location.hostname !== 'localhost') {
        initializeAnalytics();
    }
    
    // Initialize performance monitoring
    initializePerformanceMonitoring();
    
    // Add accessibility improvements
    addAccessibilityFeatures();
    
    // Console Easter Egg
    addConsoleEasterEgg();
}

// Check for required elements
function checkRequiredElements() {
    const requiredElements = [
        { id: 'navbar', name: 'Navigation' },
        { id: 'contactForm', name: 'Contact Form' },
        { id: 'backToTop', name: 'Back to Top Button' }
    ];
    
    requiredElements.forEach(element => {
        if (!document.getElementById(element.id)) {
            console.warn(`${element.name} element not found (${element.id})`);
        }
    });
}

// Initialize Google Analytics
function initializeAnalytics() {
    // Replace GA_MEASUREMENT_ID with your actual ID
    const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID';
    
    if (GA_MEASUREMENT_ID !== 'GA_MEASUREMENT_ID') {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);
        
        // Track WhatsApp clicks
        const whatsappBtn = document.querySelector('.whatsapp-float');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'WhatsApp'
                });
            });
        }
    }
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            if (pageLoadTime > 0) {
                console.log('Page Load Time:', pageLoadTime + 'ms');
                
                // Send to analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                        'name': 'load',
                        'value': pageLoadTime,
                        'event_category': 'Performance'
                    });
                }
            }
        });
    }
}

// Accessibility Features
function addAccessibilityFeatures() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #2563eb;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels to interactive elements
    document.querySelectorAll('button:not([aria-label])').forEach(button => {
        if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', 'Button');
        }
    });
    
    // Ensure all images have alt text
    document.querySelectorAll('img:not([alt])').forEach(img => {
        img.setAttribute('alt', 'Image');
    });
}

// Console Easter Egg
function addConsoleEasterEgg() {
    console.log('%c👋 Hi there!', 'font-size: 24px; font-weight: bold; color: #2563eb;');
    console.log('%cLooking for a digital marketer? You found the right person!', 'font-size: 16px; color: #10b981;');
    console.log('%c📧 Contact me at: hello@nusaijaleel.com', 'font-size: 14px; color: #6b7280;');
    console.log('%c🌐 Visit: https://nusaijaleel.com', 'font-size: 14px; color: #6b7280;');
}

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// Handle errors gracefully
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You could send errors to a logging service here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send errors to a logging service here
});