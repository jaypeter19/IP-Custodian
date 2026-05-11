document.addEventListener('DOMContentLoaded', () => {


    // I Want Trouble Animation Toggle
    const troubleIcon = document.querySelector('#icon-trouble');
    const troubleBtn = document.querySelector('.btn-trouble');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fireTroubleConfetti = () => {
        if (reduceMotion || typeof confetti !== 'function') {
            return;
        }

        const end = Date.now() + 1800;
        const colors = ['#25c4fe', '#8f19ff', '#f4a261', '#00a86b', '#167698'];

        const frame = () => {
            confetti({
                particleCount: 8,
                angle: 60,
                spread: 70,
                origin: { x: 0, y: 0.75 },
                colors,
            });

            confetti({
                particleCount: 8,
                angle: 120,
                spread: 70,
                origin: { x: 1, y: 0.75 },
                colors,
            });

            confetti({
                particleCount: 10,
                spread: 120,
                startVelocity: 35,
                origin: {
                    x: Math.random(),
                    y: Math.random() * 0.5,
                },
                colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        confetti({
            particleCount: 120,
            spread: 100,
            origin: { x: 0.5, y: 0.6 },
            colors,
        });

        frame();
    };

    if (troubleIcon && troubleBtn) {
        troubleBtn.addEventListener('click', () => {
            troubleIcon.classList.remove('icon-animation');
            void troubleIcon.offsetWidth;
            troubleIcon.classList.add('icon-animation');
            fireTroubleConfetti();
        });
    }

    // Hero Animation
    const heroSection = document.querySelector(".hero-section");

    heroSection.classList.add("loaded");


    // About Background Reveal On Scroll
    const aboutSection = document.querySelector(".about-section");

    const aboutObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("loaded");

                // anima apenas uma vez
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.25
    });

    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // Mobile Link Click Animation Delay
    const isMobileDevice = () => {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    document.querySelectorAll('a').forEach((link) => {

        link.addEventListener('click', (e) => {
            // Only apply delay on mobile devices
            if (!isMobileDevice()) return;

            // Don't apply delay to anchor links or links without href
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href === '') return;

            // Don't prevent default for links that open in new tab or are external navigation helpers
            if (link.target === '_blank' || link.getAttribute('rel')?.includes('external')) return;

            e.preventDefault();

            // Add hover class to trigger animation
            link.classList.add('hover');

            // Calculate animation duration from CSS transitions
            const style = window.getComputedStyle(link);
            const transitionDuration = style.transitionDuration || '0.3s';
            const duration = parseFloat(transitionDuration) * 1000; // Convert to milliseconds

            // Add buffer time for animation to complete (e.g., 300ms buffer)
            const totalDelay = duration + 300;

            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = href;
            }, totalDelay);
        });

    });
});

