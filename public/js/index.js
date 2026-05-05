document.addEventListener('DOMContentLoaded', () => {

    const troubleIcon = document.querySelector('#icon-trouble');
    const troubleBtn = document.querySelector('.btn-trouble');

    if (!troubleIcon || !troubleBtn) {
        return;
    }

    troubleBtn.addEventListener('click', () => {
        troubleIcon.classList.remove('icon-animation');
        void troubleIcon.offsetWidth;
        troubleIcon.classList.add('icon-animation');
    });

});
