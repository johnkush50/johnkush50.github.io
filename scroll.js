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
            
            // Check if user scrolled more than threshold
            if (Math.abs(lastScrollTop - currentScroll) <= scrollThreshold) return;
            
            // Check scroll direction
            if (currentScroll > lastScrollTop) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else {
                // Scrolling up or reached top
                header.classList.remove('header-hidden');
            }
            
            // Always show header at the very top
            if (currentScroll <= 0) {
                header.classList.remove('header-hidden');
            }
            
            lastScrollTop = currentScroll;
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
});
