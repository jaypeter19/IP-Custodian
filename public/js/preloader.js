const initScrollAnimations = () => {
    if (typeof window.initScrollAnimations === 'function') {
        window.initScrollAnimations();
    }
};

const hidePageLoader = () => {
    const loader = document.querySelector('.page-loader');

    document.body.classList.remove('is-loading');

    if (!loader) {
        initScrollAnimations();
        return;
    }

    loader.classList.add('is-hidden');

    let loadingFinished = false;

    const finishLoading = () => {
        if (loadingFinished) {
            return;
        }

        loadingFinished = true;
        loader.remove();
        initScrollAnimations();
    };

    loader.addEventListener('transitionend', finishLoading, { once: true });
    window.setTimeout(finishLoading, 600);
};

if (document.readyState === 'complete') {
    hidePageLoader();
} else {
    window.addEventListener('load', hidePageLoader);
}
