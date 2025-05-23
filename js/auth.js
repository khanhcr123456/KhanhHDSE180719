/**
 * Bloodline DNA Testing Service Management System
 * Authentication Pages JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initAuthTabs();
    initPasswordToggle();
    initPasswordStrength();
    initLoginForm();
    initRegisterForm();
});

/**
 * Initialize the authentication tabs (Customer, Admin, Lab Staff)
 */
function initAuthTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all tabs
                tabBtns.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked tab
                btn.classList.add('active');
                
                // Update form based on selected tab
                const tabType = btn.dataset.tab;
                updateFormForTab(tabType);
            });
        });
    }
}

/**
 * Update form fields based on selected tab
 */
function updateFormForTab(tabType) {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        // Update form attributes based on user type
        switch(tabType) {
            case 'admin':
                loginForm.setAttribute('action', 'admin-dashboard.html');
                break;
            case 'staff':
                loginForm.setAttribute('action', 'staff-dashboard.html');
                break;
            default: // customer
                loginForm.setAttribute('action', 'dashboard.html');
                break;
        }
    }
}

/**
 * Initialize password visibility toggle
 */
function initPasswordToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-password');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const passwordField = btn.parentElement.querySelector('input');
            
            // Toggle password visibility
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                btn.classList.remove('fa-eye-slash');
                btn.classList.add('fa-eye');
            } else {
                passwordField.type = 'password';
                btn.classList.remove('fa-eye');
                btn.classList.add('fa-eye-slash');
            }
        });
    });
}

/**
 * Initialize password strength meter
 */
function initPasswordStrength() {
    const passwordField = document.getElementById('password');
    
    if (passwordField) {
        passwordField.addEventListener('input', updatePasswordStrength);
    }
    
    function updatePasswordStrength() {
        const password = passwordField.value;
        const strengthMeter = document.querySelector('.strength-meter span');
        const strengthText = document.querySelector('.strength-text span');
        
        if (!strengthMeter || !strengthText) return;
        
        // Calculate password strength
        let strength = 0;
        let strengthLabel = 'Weak';
        let color = '#ff4d4d'; // Red
        
        // Length check
        if (password.length >= 8) {
            strength += 1;
        }
        
        // Contains uppercase letters
        if (/[A-Z]/.test(password)) {
            strength += 1;
        }
        
        // Contains numbers
        if (/\d/.test(password)) {
            strength += 1;
        }
        
        // Contains special characters
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        }
        
        // Update UI based on strength
        switch(strength) {
            case 0:
            case 1:
                strengthLabel = 'Weak';
                color = '#ff4d4d'; // Red
                strengthMeter.style.width = '25%';
                break;
            case 2:
                strengthLabel = 'Fair';
                color = '#ffaa00'; // Orange
                strengthMeter.style.width = '50%';
                break;
            case 3:
                strengthLabel = 'Good';
                color = '#2db92d'; // Green
                strengthMeter.style.width = '75%';
                break;
            case 4:
                strengthLabel = 'Strong';
                color = '#00b300'; // Dark Green
                strengthMeter.style.width = '100%';
                break;
        }
        
        strengthMeter.style.backgroundColor = color;
        strengthText.textContent = strengthLabel;
        strengthText.style.color = color;
    }
}

/**
 * Initialize login form functionality
 */
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            if (!isValidEmail(email)) {
                showAuthMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            if (password.length < 6) {
                showAuthMessage('Password must be at least 6 characters.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitBtn.disabled = true;
            
            // Simulate login (replace with actual authentication)
            setTimeout(() => {
                // Get target page based on selected tab
                let targetPage = 'dashboard.html';
                const activeTab = document.querySelector('.tab-btn.active');
                
                if (activeTab) {
                    const tabType = activeTab.dataset.tab;
                    
                    if (tabType === 'admin') {
                        targetPage = 'admin-dashboard.html';
                    } else if (tabType === 'staff') {
                        targetPage = 'staff-dashboard.html';
                    }
                }
                
                // Redirect to dashboard
                window.location.href = targetPage;
            }, 1500);
        });
    }
}

/**
 * Initialize registration form functionality
 */
function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsChecked = document.getElementById('terms').checked;
            
            // Validate inputs
            if (firstName.length < 2 || lastName.length < 2) {
                showAuthMessage('Please enter your full name.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAuthMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            if (password.length < 8) {
                showAuthMessage('Password must be at least 8 characters.', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showAuthMessage('Passwords do not match.', 'error');
                return;
            }
            
            if (!termsChecked) {
                showAuthMessage('Please agree to the Terms of Service and Privacy Policy.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;
            
            // Simulate registration (replace with actual API call)
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
}

/**
 * Utility function to validate email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Utility function to show authentication messages
 */
function showAuthMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and add message element
    const messageElement = document.createElement('div');
    messageElement.className = `auth-message ${type}`;
    
    // Add icon based on message type
    if (type === 'success') {
        messageElement.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    } else if (type === 'error') {
        messageElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    }
    
    // Insert message at the top of the form
    const formContainer = document.querySelector('.auth-form-container');
    formContainer.insertBefore(messageElement, formContainer.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
} 