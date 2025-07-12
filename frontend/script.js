// UI State Management
const state = {
    isLoggedIn: false,
    userEmail: null
};

// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const navLinks = document.getElementById('nav-links');

// Helper Functions
function showElement(element) {
    element.classList.add('visible');
}

function hideElement(element) {
    element.classList.remove('visible');
}

function updateUIState() {
    const loggedInElements = document.querySelectorAll('.logged-in');
    const loggedOutElements = document.querySelectorAll('.logged-out');

    if (state.isLoggedIn) {
        loggedInElements.forEach(showElement);
        loggedOutElements.forEach(hideElement);
    } else {
        loggedInElements.forEach(hideElement);
        loggedOutElements.forEach(showElement);
    }
}

// Email Validation
function isValidCollegeEmail(email) {
    // Valencia College email validation
    return email.endsWith('@mail.valenciacollege.edu') || email.endsWith('@valenciacollege.edu');
}

// Login Function
function login() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    if (!isValidCollegeEmail(email)) {
        alert('Please use your Valencia College email address (@mail.valenciacollege.edu or @valenciacollege.edu)');
        return;
    }

    // Here - typically make an API call to your backend
    // For now, we'll simulate a successful login
    state.isLoggedIn = true;
    state.userEmail = email;
    
    // Update UI
    updateUIState();
    
    // Clear inputs
    emailInput.value = '';
    passwordInput.value = '';
}

// Logout Function
function logout() {
    state.isLoggedIn = false;
    state.userEmail = null;
    updateUIState();
}

// Contact Function
function Contact(serviceInfo) {
    let serviceContact;
    switch(serviceInfo) {
        case 'Email':
            serviceContact = '@samplemail.com';
            break;
        case 'Phone':
            serviceContact = '123-456-7890';
            break;
        case 'Library Services':
            serviceContact = '123 Sample St, State, Zip goes here';
            break;
        default:
            serviceContact = serviceInfo;
    }
    alert(`Since this is not a real service, this is a sample contact: ${serviceContact}`);
}

// Booking Form Functions
function showBookingForm(serviceType) {
    let serviceName;
    switch(serviceType) {
        case 'consultation':
            serviceName = 'Library Research Consultation';
            break;
        case 'study':
            serviceName = 'Study Room';
            break;
        case 'computer':
            serviceName = 'Computer Lab Station';
            break;
        case 'meeting':
            serviceName = 'Computer Lab Station';
            break;    
        default:
            serviceName = serviceType;
    }
    alert(`Booking form for ${serviceName} will be implemented soon!`);
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    navLinks.classList.toggle('active');
}

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    updateUIState();
    
    // Add logout event listener
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}); 