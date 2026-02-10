// Handle logo image error
document.addEventListener('DOMContentLoaded', function() {
    // Logo error handling
    const logoImages = document.querySelectorAll('.logo-image, .footer-logo-image');
    logoImages.forEach(img => {
        img.addEventListener('error', function() {
            this.classList.add('error');
            console.log('Logo image failed to load. Using fallback.');
        });
    });
    
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
        const slideInterval = 3000;
        
        function showSlide(index) {
            if (index < 0 || index >= slides.length) return;
            
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            currentSlide = index;
        }
        
        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }
        
        // Start automatic slideshow
        let slideTimer = setInterval(nextSlide, slideInterval);
        
        // Pause slideshow on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(slideTimer);
            });
            
            heroSection.addEventListener('mouseleave', () => {
                slideTimer = setInterval(nextSlide, slideInterval);
            });
        }
    }
});