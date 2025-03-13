document.addEventListener('DOMContentLoaded', function() {
    // Variables for scroll tracking
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 10; // Minimum amount of pixels to scroll before triggering
    
    // Function to handle scroll events
    function handleScroll() {
        // Only apply this behavior on mobile devices
        if (window.innerWidth <= 600) {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Display header only at the very top of the page
            if (currentScroll <= 0) {
                // At the top of the page
                header.classList.remove('header-hidden');
            } else {
                // Not at the top of the page
                header.classList.add('header-hidden');
            }
        } else {
            // On desktop, always show the header
            header.classList.remove('header-hidden');
        }
        
        // Check for project cards in viewport and animate them
        animateProjectsOnScroll();
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initialize header state on page load
    handleScroll();
    
    // ============ SMOOTH SCROLLING FOR NAVIGATION ============
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor link behavior
            e.preventDefault();
            
            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href');
            
            // Get the target element
            const targetSection = document.querySelector(targetId);
            
            // Scroll smoothly to the target section
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============ PROJECT CARDS REVEAL ANIMATION ============
    
    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && // 80% of viewport height
            rect.bottom >= 0
        );
    }
    
    // Function to animate project cards when they come into view
    function animateProjectsOnScroll() {
        // Get all project cards
        const projectCards = document.querySelectorAll('.project-card');
        
        // Check each card and add reveal class when in viewport
        projectCards.forEach(card => {
            if (isElementInViewport(card) && !card.classList.contains('revealed')) {
                card.classList.add('revealed');
            }
        });
    }
    
    // Initialize project cards with a hidden state
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            // Add initial hidden class and staggered delay
            card.classList.add('project-hidden');
            card.style.transitionDelay = (index * 0.1) + 's';
        });
        
        // Initially check if any cards are in viewport
        setTimeout(animateProjectsOnScroll, 100);
    }
    
    // Initialize project cards
    initProjectCards();
});
