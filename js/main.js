// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"], .footer-column a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-up, .about-content').forEach((element) => {
    element.classList.add('hidden');
    observer.observe(element);
});

// Navbar scroll behavior
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow and background opacity based on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        navbar.style.background = 'rgba(17, 24, 39, 0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(17, 24, 39, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Popup functionality
const contactBtn = document.getElementById('contactBtn');
const contactPopup = document.getElementById('contactPopup');
const closePopupBtn = document.getElementById('closePopup');
const contactForm = document.getElementById('contactForm');

// Open popup
contactBtn.addEventListener('click', () => {
    contactPopup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close popup
const closePopup = () => {
    contactPopup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
};

closePopupBtn.addEventListener('click', closePopup);

// Close popup when clicking outside
contactPopup.addEventListener('click', (e) => {
    if (e.target === contactPopup) {
        closePopup();
    }
});

// Handle service selection
const serviceSelect = document.getElementById('serviceSelect');
const otherServiceGroup = document.getElementById('otherServiceGroup');
const otherServiceInput = document.getElementById('otherService');

serviceSelect.addEventListener('change', () => {
    if (serviceSelect.value === 'other') {
        otherServiceGroup.style.display = 'block';
        otherServiceInput.required = true;
    } else {
        otherServiceGroup.style.display = 'none';
        otherServiceInput.required = false;
    }
});

// Handle form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Get selected service
        const selectedService = serviceSelect.value === 'other' 
            ? otherServiceInput.value 
            : serviceSelect.options[serviceSelect.selectedIndex].text;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Success message
        alert('Message sent successfully!');
        contactForm.reset();
        otherServiceGroup.style.display = 'none'; // Hide other service field
        closePopup();
    } catch (error) {
        alert('Failed to send message. Please try again.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    // Reveal hero section elements with delay
    const heroElements = document.querySelectorAll('.hero h1, .hero .subtitle, .hero .cta-button');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200);
    });

    // Setup button reflection handlers
    const getStartedBtn = document.querySelector('.cta-button');
    const learnMoreBtn = document.querySelector('.btn-learn-more');

    const handleButtonClick = (button, e) => {
        e.preventDefault();
        
        // Add pulse effect to the button
        button.classList.add('active');
        
        // Open contact popup
        contactPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Remove active class after animation
        setTimeout(() => {
            button.classList.remove('active');
        }, 1000);

        // Scroll contact form into view
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            setTimeout(() => {
                contactForm.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    };

    // Add click handlers to buttons
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', (e) => handleButtonClick(getStartedBtn, e));
    }
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', (e) => handleButtonClick(learnMoreBtn, e));
    }
});

// Social Icons Reflection Effect
const navSocialIcons = document.querySelectorAll('.nav-social-icon');
const footerSocialIcons = document.querySelectorAll('.social-icon');

// Function to handle social icon click
const handleSocialIconClick = (navIcon) => {
    // Get the social media type from data attribute
    const socialType = navIcon.getAttribute('data-social');
    
    // Find corresponding footer icon
    const footerIcon = Array.from(footerSocialIcons).find(icon => 
        icon.href === navIcon.href
    );

    if (footerIcon) {
        // Add active class to both icons
        navIcon.classList.add('active');
        footerIcon.classList.add('active');

        // Scroll to footer
        footerIcon.scrollIntoView({ behavior: 'smooth' });

        // Remove active class after animation
        setTimeout(() => {
            navIcon.classList.remove('active');
            footerIcon.classList.remove('active');
        }, 1000);
    }
};

// Add click event listeners to navbar social icons
navSocialIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        handleSocialIconClick(icon);
    });
});