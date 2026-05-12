const hidePageLoader = () => {
    const loader = document.querySelector('.page-loader');

    document.body.classList.remove('is-loading');

    if (!loader) {
        return;
    }

    loader.classList.add('is-hidden');

    loader.addEventListener('transitionend', () => {
        loader.remove();
    }, { once: true });
};

if (document.readyState === 'complete') {
    hidePageLoader();
} else {
    window.addEventListener('load', hidePageLoader);
}
