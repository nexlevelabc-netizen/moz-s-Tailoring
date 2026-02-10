// Handle circular text creation for rotating logo
document.addEventListener('DOMContentLoaded', function() {
    // Create circular text for header and footer logos
    createCircularText();
    
    function createCircularText() {
        // Header logo
        const circularText = document.getElementById('circularText');
        if (circularText) {
            const text = "MOZ'S TAILORING • MOZ'S TAILORING • ";
            circularText.innerHTML = '';
            const characters = text.split('');
            const radius = 50;
            const totalChars = characters.length;
            const angleStep = (2 * Math.PI) / totalChars;
            
            characters.forEach((char, index) => {
                const angle = index * angleStep;
                const span = document.createElement('span');
                span.textContent = char;
                span.style.transform = `rotate(${angle}rad)`;
                span.style.position = 'absolute';
                span.style.left = '50%';
                span.style.top = '0';
                span.style.transformOrigin = '0 50px';
                circularText.appendChild(span);
            });
        }
        
        // Footer logo
        const footerCircularText = document.getElementById('footerCircularText');
        if (footerCircularText) {
            const text = "MOZ'S TAILORING • MOZ'S TAILORING • ";
            footerCircularText.innerHTML = '';
            const characters = text.split('');
            const radius = 65;
            const totalChars = characters.length;
            const angleStep = (2 * Math.PI) / totalChars;
            
            characters.forEach((char, index) => {
                const angle = index * angleStep;
                const span = document.createElement('span');
                span.textContent = char;
                span.style.transform = `rotate(${angle}rad)`;
                span.style.position = 'absolute';
                span.style.left = '50%';
                span.style.top = '0';
                span.style.transformOrigin = '0 65px';
                footerCircularText.appendChild(span);
            });
        }
    }
    
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav ul');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                if (mobileToggle.querySelector('i')) {
                    mobileToggle.querySelector('i').classList.add('fa-bars');
                    mobileToggle.querySelector('i').classList.remove('fa-times');
                }
            });
        });
    }
    
    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };
    
    // Set initial state for fade elements
    fadeElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();
    
    // Hero Image Slideshow Functionality (only on home page)
    const slides = document.querySelectorAll('.hero-slide');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds
        
        function showSlide(index) {
            if (index < 0 || index >= slides.length) return;
            
            // Remove active class from all slides
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Add active class to current slide
            slides[index].classList.add('active');
            currentSlide = index;
        }
        
        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }
        
        let slideTimer;
        
        function startSlideTimer() {
            slideTimer = setInterval(nextSlide, slideInterval);
        }
        
        function resetSlideTimer() {
            clearInterval(slideTimer);
            startSlideTimer();
        }
        
        // Start automatic slideshow
        startSlideTimer();
        
        // Pause slideshow on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(slideTimer);
            });
            
            heroSection.addEventListener('mouseleave', () => {
                startSlideTimer();
            });
        }
        
        // Initialize first slide
        showSlide(0);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or not a valid ID
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header offset
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 90;
                
                // Get target position
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                if (history.pushState) {
                    history.pushState(null, null, href);
                } else {
                    window.location.hash = href;
                }
            }
        });
    });
    
    // Active navigation link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    function highlightNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.main-header')?.offsetHeight || 90;
            
            if (scrollY >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Only run if we have sections and nav links
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', highlightNavLink);
        // Run once on page load
        setTimeout(highlightNavLink, 100);
    }
    
    // Contact form handling (if exists)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            let isValid = true;
            
            // Reset previous error states
            contactForm.querySelectorAll('.error-message').forEach(el => el.remove());
            contactForm.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Disable submit button to prevent multiple submissions
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Here you would typically send the form data to a server
                // For now, we'll simulate a successful submission
                setTimeout(() => {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.innerHTML = `
                        <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 4px; margin-top: 20px; border: 1px solid #c3e6cb;">
                            <strong>Thank you!</strong> Your message has been sent successfully. We'll get back to you soon.
                        </div>
                    `;
                    contactForm.appendChild(successMsg);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);
                }, 1500);
            }
            
            function showError(input, message) {
                input.classList.add('error');
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.color = '#dc3545';
                errorDiv.style.fontSize = '0.85rem';
                errorDiv.style.marginTop = '5px';
                errorDiv.textContent = message;
                input.parentNode.appendChild(errorDiv);
            }
            
            function isValidEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
        });
    }
    
    // Initialize any other page-specific functionality
    initializePageFeatures();
});

function initializePageFeatures() {
    // Gallery lightbox functionality (if on gallery page)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;
                
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.id = 'lightbox';
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: pointer;
                `;
                
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = imgAlt;
                img.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 4px;
                `;
                
                lightbox.appendChild(img);
                document.body.appendChild(lightbox);
                
                // Close lightbox on click
                lightbox.addEventListener('click', () => {
                    lightbox.remove();
                });
                
                // Close lightbox on ESC key
                document.addEventListener('keydown', function closeLightbox(e) {
                    if (e.key === 'Escape') {
                        lightbox.remove();
                        document.removeEventListener('keydown', closeLightbox);
                    }
                });
            });
        });
    }
    
    // Service cards interaction
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// Optional: Add a console log to confirm script loaded
console.log('Moz\'s Tailoring website scripts loaded successfully');
