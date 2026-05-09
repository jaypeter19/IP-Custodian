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
});
