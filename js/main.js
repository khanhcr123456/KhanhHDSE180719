/**
 * Bloodline DNA Testing Service Management System
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initTestimonialSlider();
    initNewsletterForm();
});

/**
 * Initialize mobile navigation
 */
function initNavigation() {
    // Add mobile navigation toggle functionality
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('header .container');
    if (header) {
        header.appendChild(navToggle);
        
        navToggle.addEventListener('click', () => {
            const nav = document.querySelector('header nav');
            nav.classList.toggle('active');
            
            // Change icon based on nav state
            if (nav.classList.contains('active')) {
                navToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close mobile nav when clicking on a link
        const navLinks = document.querySelectorAll('header nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const nav = document.querySelector('header nav');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
    
    // Add sticky header behavior
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Add animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.service-card, .step, .about-content, .testimonial, .contact-wrapper, .footer-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-message success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully! We\'ll get back to you soon.';
                
                contactForm.appendChild(successMessage);
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
}

/**
 * Initialize testimonial slider
 */
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-slider');
    if (testimonialContainer) {
        // Add navigation buttons
        const sliderNav = document.createElement('div');
        sliderNav.className = 'slider-nav';
        sliderNav.innerHTML = `
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <div class="slider-dots"></div>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        `;
        
        const testimonialSection = document.querySelector('.testimonials');
        testimonialSection.appendChild(sliderNav);
        
        const testimonials = document.querySelectorAll('.testimonial');
        const dotsContainer = document.querySelector('.slider-dots');
        
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Add click events to buttons
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;
        
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            goToSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            goToSlide(currentSlide);
        });
        
        // Function to go to a specific slide
        function goToSlide(index) {
            // Mobile version: show only one slide at a time
            if (window.innerWidth < 768) {
                testimonials.forEach((testimonial, i) => {
                    testimonial.style.display = i === index ? 'block' : 'none';
                });
            }
            
            // Update dots
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        }
        
        // Initialize slider for mobile
        if (window.innerWidth < 768) {
            goToSlide(0);
        }
        
        // Update slider on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                goToSlide(currentSlide);
            } else {
                testimonials.forEach(testimonial => {
                    testimonial.style.display = 'block';
                });
            }
        });
        
        // Auto-advance slider
        let sliderInterval = setInterval(() => {
            if (window.innerWidth < 768) {
                currentSlide = (currentSlide + 1) % testimonials.length;
                goToSlide(currentSlide);
            }
        }, 5000);
        
        // Pause auto-advance on hover
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(() => {
                if (window.innerWidth < 768) {
                    currentSlide = (currentSlide + 1) % testimonials.length;
                    goToSlide(currentSlide);
                }
            }, 5000);
        });
    }
}

/**
 * Initialize newsletter form functionality
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                // Show error message
                showFormMessage(newsletterForm, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = newsletterForm.querySelector('button');
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate subscription (replace with actual API call)
            setTimeout(() => {
                // Reset form
                newsletterForm.reset();
                
                // Show success message
                showFormMessage(newsletterForm, 'Thank you for subscribing to our newsletter!', 'success');
                
                // Reset button
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
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
 * Utility function to show form messages
 */
function showFormMessage(form, message, type) {
    // Remove any existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and add message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Add icon based on message type
    if (type === 'success') {
        messageElement.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    } else if (type === 'error') {
        messageElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    }
    
    form.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
} 