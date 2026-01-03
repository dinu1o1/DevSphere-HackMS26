
// Initialize everything on load
window.addEventListener('load', function() {
    loadDashboardStats();
    setupScrollReveal();
    setupSearch();
});


// 1. Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});



// 3. Simple Scroll Reveal Animation for Feature Cards
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});


const textElement = document.getElementById("typing-text");
const textToType = "Your comprehensive Learning Management System for seamless education . . . . . ";
let index = 0;

function typeEffect() {
    if (index < textToType.length) {
        textElement.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeEffect, 50); // Speed in milliseconds
    }
}

// Start the animation when the page loads
window.onload = typeEffect;

const footerText = document.getElementById("footer-typing-text");
const footerContent = "© 2026 DevSphere. All rights reserved.";
let footerIndex = 0;

function typeFooter() {
    if (footerIndex < footerContent.length) {
        footerText.textContent += footerContent.charAt(footerIndex);
        footerIndex++;
        setTimeout(typeFooter, 100); // Typing speed
    } else {
        // Remove cursor after typing is finished (optional)
        footerText.style.borderRight = "none";
    }
}

// Observer to start typing when footer is visible
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footerText.classList.add('typing');
            typeFooter();
            footerObserver.unobserve(entry.target); // Run only once
        }
    });
}, { threshold: 0.5 });

footerObserver.observe(footerText);


document.addEventListener('DOMContentLoaded', () => {

    // --- Start Animations ---
    // Type hero text at 50ms per character
    typeEffect(heroElement, heroText, 50, () => {
        // Optional: Remove cursor after typing hero text
        heroElement.style.borderRight = "none";
    });

    // Type footer text at 75ms per character
    // We add the 'typing' class you defined in CSS for the blink animation
    footerElement.classList.add('typing');
    typeEffect(footerElement, footerText, 75);
});