document.addEventListener('DOMContentLoaded', function() {
    // Get the toggle element
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved user preference and set the theme accordingly
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    } else {
        document.body.removeAttribute('data-theme');
        darkModeToggle.checked = false;
    }
    
    // Listen for toggle changes
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Apply dark theme
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            // Remove dark theme
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Display initial state with a subtle animation
    setTimeout(() => {
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    }, 100);
});
