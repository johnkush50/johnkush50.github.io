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
});
