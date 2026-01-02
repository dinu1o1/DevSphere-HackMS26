// LMS Home Page - Animations and Interactions
// This file handles all animations and button functions for the home page

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupButtonListeners();
    loadUserGreeting();
});

function initializeAnimations() {
    // Fade in hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.animation = 'fadeInDown 0.8s ease-out forwards';
    }

    // Animate cards on load
    const cards = document.querySelectorAll('.card, .course-card, .module-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
    });

    // Animate text elements
    const textElements = document.querySelectorAll('.title, .heading, .subtitle');
    textElements.forEach((element, index) => {
        element.style.animation = `slideInLeft 0.7s ease-out ${index * 0.15}s forwards`;
    });
}

// ============================================
// TEXT ANIMATIONS
// ============================================

// Typewriter effect for welcome text
function typewriterEffect(element, text, speed = 50) {
    if (!element) return;
    
    element.innerHTML = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Counter animation for statistics
function animateCounter(element, target, duration = 1000) {
    if (!element) return;
    
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Scroll reveal animation
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// BUTTON ONCLICK FUNCTIONS
// ============================================

function setupButtonListeners() {
    // View Courses Button
    const viewCoursesBtn = document.getElementById('viewCoursesBtn');
    if (viewCoursesBtn) {
        viewCoursesBtn.addEventListener('click', goToCourses);
    }

    // View Assignments Button
    const viewAssignmentsBtn = document.getElementById('viewAssignmentsBtn');
    if (viewAssignmentsBtn) {
        viewAssignmentsBtn.addEventListener('click', goToAssignments);
    }

    // View Grades Button
    const viewGradesBtn = document.getElementById('viewGradesBtn');
    if (viewGradesBtn) {
        viewGradesBtn.addEventListener('click', goToGrades);
    }

    // Profile Button
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', goToProfile);
    }

    // Settings Button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettings);
    }

    // Logout Button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Course Card Click
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course-id');
            goToCourseDetail(courseId);
        });
    });
}

function goToCourses() {
    console.log('Navigating to Courses');
    window.location.href = './courses.html';
}

function goToAssignments() {
    console.log('Navigating to Assignments');
    window.location.href = './assignments.html';
}

function goToGrades() {
    console.log('Navigating to Grades');
    window.location.href = './grades.html';
}

function goToProfile() {
    console.log('Opening Profile');
    window.location.href = './profile.html';
}

function openSettings() {
    console.log('Opening Settings');
    const settingsModal = document.getElementById('settingsModal');
    if (settingsModal) {
        settingsModal.style.display = 'block';
        settingsModal.style.animation = 'fadeIn 0.3s ease-out forwards';
    }
}

function closeSettings() {
    console.log('Closing Settings');
    const settingsModal = document.getElementById('settingsModal');
    if (settingsModal) {
        settingsModal.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            settingsModal.style.display = 'none';
        }, 300);
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        console.log('Logging out');
        // Clear session/localStorage
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = './login.html';
    }
}

function goToCourseDetail(courseId) {
    console.log('Opening course:', courseId);
    window.location.href = `./course-detail.html?id=${courseId}`;
}

// ============================================
// USER GREETING
// ============================================

function loadUserGreeting() {
    const greetingElement = document.getElementById('userGreeting');
    if (greetingElement) {
        // Get user data from localStorage or session
        const userName = localStorage.getItem('userName') || 'Student';
        const greeting = getGreeting();
        greetingElement.textContent = `${greeting}, ${userName}!`;
        
        // Apply typewriter effect
        typewriterEffect(greetingElement, `${greeting}, ${userName}!`, 50);
    }
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return 'Good Morning';
    } else if (hour < 18) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
}

// ============================================
// DASHBOARD STATISTICS
// ============================================

function loadDashboardStats() {
    // Animate course count
    const coursesCount = document.getElementById('coursesCount');
    if (coursesCount) {
        animateCounter(coursesCount, 5);
    }

    // Animate assignments count
    const assignmentsCount = document.getElementById('assignmentsCount');
    if (assignmentsCount) {
        animateCounter(assignmentsCount, 8);
    }

    // Animate completion percentage
    const completionPercent = document.getElementById('completionPercent');
    if (completionPercent) {
        animateCounter(completionPercent, 65);
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            window.location.href = `./search-results.html?q=${encodeURIComponent(query)}`;
        }
    }
}

// ============================================
// MODAL HANDLING
// ============================================

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
});

// ============================================
// CSS ANIMATIONS (to be added to CSS file)
// ============================================

// Add styles dynamically if CSS file not linked
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    .modal {
        transition: opacity 0.3s ease-out;
    }

    .card, .course-card, .module-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover, .course-card:hover, .module-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    button {
        cursor: pointer;
        transition: all 0.3s ease;
    }

    button:hover {
        transform: scale(1.05);
    }

    button:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style);

// Initialize everything on load
window.addEventListener('load', function() {
    loadDashboardStats();
    setupScrollReveal();
    setupSearch();
});


<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js

const textElement = document.getElementById("typing-text");
const textToType = "Your comprehensive Learning Management System for seamless education...";
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

=======
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
// Configuration
const heroText = "Empowering students through modern technology.";
const footerTextContent = "© 2026 EduHub - Learning without boundaries.";
const typingSpeed = 100;

function typeEffect(elementId, text, speed) {
    let i = 0;
    const element = document.getElementById(elementId);
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            // Remove the blinking cursor line when finished (optional)
            element.style.borderRight = "none";
        }
    }
    typing();
}

// Run when page loads
window.onload = () => {
    typeEffect("typing-text", heroText, typingSpeed);
    typeEffect("footer-typing-text", footerText, 50);
};
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js

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

// 2. "Get Started" Button Alert
const getStartedBtn = document.querySelector('.btn-primary');
getStartedBtn.addEventListener('click', () => {
    alert('Redirecting to the Registration Page...');
});

// 3. Simple Scroll Reveal Animation for Feature Cards
const observerOptions = {
    threshold: 0.2
};

<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
const observer = new IntersectionObserver((entries) => {
=======
const featureObserver = new IntersectionObserver((entries) => {
>>>>>>> Stashed changes:homeetc/homejs.js
=======
const featureObserver = new IntersectionObserver((entries) => {
>>>>>>> Stashed changes:homeetc/homejs.js
=======
const featureObserver = new IntersectionObserver((entries) => {
>>>>>>> Stashed changes:homeetc/homejs.js
=======
const featureObserver = new IntersectionObserver((entries) => {
>>>>>>> Stashed changes:homeetc/homejs.js
=======
const featureObserver = new IntersectionObserver((entries) => {
>>>>>>> Stashed changes:homeetc/homejs.js
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
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
    observer.observe(card);
});

=======
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
    featureObserver.observe(card);
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
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js
=======
>>>>>>> Stashed changes:homeetc/homejs.js

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
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
const footerObserver = new IntersectionObserver((entries) => {
=======
const observer = new IntersectionObserver((entries) => {
>>>>>>> Stashed changes:homeetc/homejs.js
=======
const observer = new IntersectionObserver((entries) => {
>>>>>>> Stashed changes:homeetc/homejs.js
=======
const observer = new IntersectionObserver((entries) => {
>>>>>>> Stashed changes:homeetc/homejs.js
=======
const observer = new IntersectionObserver((entries) => {
>>>>>>> Stashed changes:homeetc/homejs.js
=======
const observer = new IntersectionObserver((entries) => {
>>>>>>> Stashed changes:homeetc/homejs.js
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footerText.classList.add('typing');
            typeFooter();
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
            footerObserver.unobserve(entry.target); // Run only once
=======
            observer.unobserve(entry.target); // Run only once
>>>>>>> Stashed changes:homeetc/homejs.js
=======
            observer.unobserve(entry.target); // Run only once
>>>>>>> Stashed changes:homeetc/homejs.js
=======
            observer.unobserve(entry.target); // Run only once
>>>>>>> Stashed changes:homeetc/homejs.js
=======
            observer.unobserve(entry.target); // Run only once
>>>>>>> Stashed changes:homeetc/homejs.js
=======
            observer.unobserve(entry.target); // Run only once
>>>>>>> Stashed changes:homeetc/homejs.js
        }
    });
}, { threshold: 0.5 });

<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
<<<<<<< Updated upstream:hmtls/homejs.js
footerObserver.observe(footerText);
=======
observer.observe(footerText);
>>>>>>> Stashed changes:homeetc/homejs.js
=======
observer.observe(footerText);
>>>>>>> Stashed changes:homeetc/homejs.js
=======
observer.observe(footerText);
>>>>>>> Stashed changes:homeetc/homejs.js
=======
observer.observe(footerText);
>>>>>>> Stashed changes:homeetc/homejs.js
=======
observer.observe(footerText);
>>>>>>> Stashed changes:homeetc/homejs.js
