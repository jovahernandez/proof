// ============================================
// MODERN DEVUPS WEBSITE - INTERACTIVE FEATURES
// ============================================

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Enhanced Navbar on Scroll
const navbar = document.querySelector('.navbar');
let lastScrollY = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScrollY = currentScrollY;
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.service-card, .step-card, .pricing-card, .stat-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeInObserver.observe(el);
});

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000, suffix = '') => {
    const start = 0;
    const range = target - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');

            statValues.forEach(stat => {
                const text = stat.textContent.trim();
                let number, suffix;

                if (text.includes('+')) {
                    number = parseInt(text.replace(/\D/g, ''));
                    suffix = '+';
                } else if (text.includes('%')) {
                    number = parseInt(text.replace(/\D/g, ''));
                    suffix = '%';
                } else if (text.includes('K')) {
                    number = parseInt(text.replace(/\D/g, ''));
                    suffix = 'K+';
                } else if (text.includes('h')) {
                    number = parseInt(text.replace(/\D/g, ''));
                    suffix = 'h';
                } else {
                    number = parseInt(text);
                    suffix = '';
                }

                stat.textContent = '0' + suffix;
                animateCounter(stat, number, 2000, suffix);
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(139, 92, 246, 0.15);
            gap: 1.5rem;
            border-radius: 0 0 16px 16px;
        }
    }
`;
document.head.appendChild(style);

// Parallax Effect for Background Blobs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.bg-blob');

    blobs.forEach((blob, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        blob.style.transform = `translateY(${yPos}px)`;
    });
});

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'rotate(-10deg) scale(1.1)';
        }
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'none';
        }
    });
});

// Pricing Card Enhanced Hover
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('pricing-featured')) {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        }
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('pricing-featured')) {
            this.style.transform = 'translateY(0) scale(1)';
        } else {
            this.style.transform = 'scale(1.05)';
        }
    });
});

// Trusted Logos Animation
const trustedLogos = document.querySelectorAll('.logo-item');
trustedLogos.forEach((logo, index) => {
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(20px)';

    setTimeout(() => {
        logo.style.transition = 'all 0.6s ease-out';
        logo.style.opacity = '0.6';
        logo.style.transform = 'translateY(0)';
    }, 100 * index);
});

// Step Cards Sequential Animation
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.step-card');
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                }, 200 * index);
            });
            stepObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const stepsContainer = document.querySelector('.steps-container');
if (stepsContainer) {
    const steps = stepsContainer.querySelectorAll('.step-card');
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    stepObserver.observe(stepsContainer);
}

// CTA Card Animation
const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, { threshold: 0.3 });

const ctaCard = document.querySelector('.cta-card');
if (ctaCard) {
    ctaCard.style.opacity = '0';
    ctaObserver.observe(ctaCard);
}

// Enhanced Logo Hover Effect
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form Submit Handler (if forms are added later)
const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add form handling logic here
    console.log('Form submitted');
};

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation for images
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✨ DevUps website loaded successfully!');
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

console.log('%c🚀 DevUps - Developers-As-A-Service', 'font-size: 20px; font-weight: bold; color: #8B5CF6;');
console.log('%cWebsite designed and developed with ❤️', 'font-size: 12px; color: #6B7280;');
