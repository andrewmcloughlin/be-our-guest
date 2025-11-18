// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
});

// Scroll to top functionality
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    const screen = document.querySelector('.screen');
    if (scrollButton && screen) {
        // Listen for scroll events on the main screen container
        screen.addEventListener('scroll', function() {
            // If scrolled more than 100px, make the button visible
            if (screen.scrollTop > 100) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });

        // Handle the click event to scroll to the top
        scrollButton.addEventListener('click', function() {
            screen.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
