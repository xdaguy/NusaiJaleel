/* ===========================
   Animations & Effects
   =========================== */

// Motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Back to Top Button (ensure exists dynamically)
function ensureBackToTop() {
    let btn = document.getElementById('backToTop');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'backToTop';
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
        document.body.appendChild(btn);
    }

    // Show/hide back to top button
    const toggleVisibility = () => {
        if (window.scrollY > 500) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    // Scroll to top on click
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
}

ensureBackToTop();

// Skill Bars Animation (smooth fill + count-up)
(() => {
    const section = document.querySelector('.skills-section');
    if (!section) return;

    const animateItem = (item) => {
        const label = item.querySelector('.skill-percentage');
        const bar = item.querySelector('.skill-progress');
        if (!label || !bar) return;

        const target = (() => {
            const txt = (label.textContent || '').trim();
            const n = parseInt(txt.replace(/[^0-9]/g, ''), 10);
            return isNaN(n) ? 0 : Math.max(0, Math.min(100, n));
        })();

        // Prepare initial state
        bar.style.width = '0%';
        label.setAttribute('aria-live', 'polite');

        if (prefersReducedMotion) {
            bar.style.width = target + '%';
            label.textContent = target + '%';
            return;
        }

        const duration = 900; // ms
        const startTime = performance.now();

        const ease = (t) => t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad

        const step = (now) => {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration);
            const e = ease(t);
            const current = Math.round(target * e);
            bar.style.width = current + '%';
            label.textContent = current + '%';
            if (t < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const items = entry.target.querySelectorAll('.skill-item');
            items.forEach((it, i) => setTimeout(() => animateItem(it), i * 120));
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' });

    io.observe(section);
})();

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to location highlights
document.addEventListener('DOMContentLoaded', () => {
    const locationHighlights = document.querySelectorAll('.location-highlight');
    locationHighlights.forEach((element, index) => {
        if (!prefersReducedMotion) {
            setTimeout(() => {
                const originalText = element.textContent;
                typeWriter(element, originalText, 100);
            }, 1000 + (index * 500));
        }
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    if (prefersReducedMotion) return;
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const raw = parseFloat(element.dataset.speed || '0.5');
        const speed = Math.max(0, Math.min(raw, 1));
        element.style.transform = `translate3d(0, ${Math.round(scrolled * speed)}px, 0)`;
        element.style.willChange = 'transform';
    });
}, { passive: true });

// Service Cards Hover Effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (prefersReducedMotion) return;
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Fade In Animation on Scroll
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply fade-in to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    if (!prefersReducedMotion) fadeInObserver.observe(section);
});

// Add fade-in CSS
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(fadeInStyle);

/* ===========================
   Professional Scroll Reveal System
   =========================== */

function registerReveal(selector, options = {}) {
    const {
        root = null,
        rootMargin = '0px 0px -10% 0px',
        threshold = 0.1,
        distance = 30,
        duration = 600,
        delay = 0,
        ease = 'cubic-bezier(0.22, 1, 0.36, 1)',
        opacityStart = 0,
        origin = 'bottom', // 'bottom' | 'top' | 'left' | 'right'
        stagger = 80
    } = options;

    const elements = Array.from(document.querySelectorAll(selector));
    if (!elements.length) return;

    const axis = (origin === 'left' || origin === 'right') ? 'X' : 'Y';
    const sign = (origin === 'top' || origin === 'left') ? -1 : 1;

    const setup = (el, i) => {
        el.style.opacity = String(opacityStart);
        const translate = sign * distance;
        el.style.transform = axis === 'X' ? `translate3d(${translate}px,0,0)` : `translate3d(0,${translate}px,0)`;
        el.style.transition = `transform ${duration}ms ${ease} ${delay + i * stagger}ms, opacity ${duration}ms ${ease} ${delay + i * stagger}ms`;
        el.style.willChange = 'transform, opacity';
    };

    const reveal = (el) => {
        el.style.opacity = '1';
        el.style.transform = 'translate3d(0,0,0)';
    };

    if (prefersReducedMotion) {
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    elements.forEach(setup);

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                reveal(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { root, rootMargin, threshold });

    elements.forEach(el => io.observe(el));
}

// Apply reveals across the site
window.addEventListener('DOMContentLoaded', () => {
    // Hero
    registerReveal('.hero .hero-text > *', { origin: 'bottom', distance: 24, stagger: 90, duration: 700 });
    registerReveal('.hero .hero-image', { origin: 'right', distance: 40, duration: 800, delay: 150 });

    // Section headers
    registerReveal('.section-header > *', { origin: 'bottom', distance: 20, stagger: 70, duration: 600 });

    // Services, Portfolio, Testimonials, Blog
    registerReveal('.services .service-card', { origin: 'bottom', distance: 28, stagger: 100, duration: 700 });
    registerReveal('.portfolio .portfolio-item, .portfolio .project', { origin: 'bottom', distance: 28, stagger: 100, duration: 700 });
    registerReveal('.testimonials .testimonial, .testimonials .testimonial-card', { origin: 'bottom', distance: 24, stagger: 90, duration: 650 });
    registerReveal('.blog .blog-card, .blog .post-card', { origin: 'bottom', distance: 24, stagger: 90, duration: 650 });
});

/* ===========================
   Navbar: hide on scroll down, show on scroll up
   =========================== */
(() => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastY = window.pageYOffset;
    let ticking = false;

    // Create scroll progress bar
    let progress = document.getElementById('scrollProgress');
    if (!progress) {
        progress = document.createElement('div');
        progress.id = 'scrollProgress';
        progress.setAttribute('aria-hidden', 'true');
        navbar.appendChild(progress);
    }

    const updateProgress = () => {
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || document.body.scrollTop;
        const scrollHeight = doc.scrollHeight - doc.clientHeight;
        const ratio = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;
        progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    };

    const onScroll = () => {
        const y = window.pageYOffset;
        const goingDown = y > lastY;
        const pastTop = y > 10;

        navbar.classList.toggle('nav-hidden', goingDown && y > 120);
        navbar.classList.toggle('nav-scrolled', pastTop);

        lastY = y;
        updateProgress();
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (ticking) return;
        window.requestAnimationFrame(onScroll);
        ticking = true;
    }, { passive: true });

    // Initialize once
    updateProgress();
})();