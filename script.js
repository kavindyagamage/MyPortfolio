// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const hoverTargets = document.querySelectorAll('.hover-target, .btn, a');

document.addEventListener('mousemove', (e) => {
    // Small delay for smooth trailing effect
    requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// Add hover effect to interactive elements
const addHoverEffect = () => {
    const targets = document.querySelectorAll('.hover-target, .btn, a');
    targets.forEach(target => {
        // Prevent adding multiple event listeners if called again
        if (!target.dataset.hoverAttached) {
            target.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            target.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
            target.dataset.hoverAttached = 'true';
        }
    });
};

addHoverEffect();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Re-call addHoverEffect in case new interactive elements are revealed
            addHoverEffect();
            observer.unobserve(entry.target); // Optional: only animate once
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Form Submission Handling (Demo)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = 'transparent';
        btn.style.color = 'var(--accent)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = ''; // reset to default CSS
            btn.style.color = '';
            contactForm.reset();
        }, 3000);
    });
}
