document.addEventListener('DOMContentLoaded', () => {
    const parallaxSections = document.querySelectorAll('.parallax-section');

    function handleParallax() {
        parallaxSections.forEach(section => {
            const bg = section.querySelector('.parallax-bg');
            const distance = window.pageYOffset - section.offsetTop;
            bg.style.transform = `translateY(${distance * 0.5}px)`;
        });
    }

    window.addEventListener('scroll', handleParallax);

    // Smooth scrolling for navigation links (excluded CV link)
    document.querySelectorAll('nav a:not([href^="http"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Intersection Observer API for triggering animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-viewport');
        }
    });
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);

    // Smooth scrolling for project grid
    const projectGrid = document.querySelector('.project-grid');
    let isDown = false;
    let startX;
    let scrollLeft;

    projectGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - projectGrid.offsetLeft;
        scrollLeft = projectGrid.scrollLeft;
    });

    projectGrid.addEventListener('mouseleave', () => {
        isDown = false;
    });

    projectGrid.addEventListener('mouseup', () => {
        isDown = false;
    });

    projectGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - projectGrid.offsetLeft;
        const walk = (x - startX) * 2;
        projectGrid.scrollLeft = scrollLeft - walk;
    });
});