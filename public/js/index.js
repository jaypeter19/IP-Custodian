document.addEventListener('DOMContentLoaded', () => {

    const troubleIcon = document.querySelector('#icon-trouble');
    const troubleBtn = document.querySelector('.btn-trouble');
    const solutionDropdown = document.querySelector('.navbar .nav-item.dropdown');
    const solutionDropdownToggle = solutionDropdown?.querySelector('[data-bs-toggle="dropdown"]');
    const solutionDropdownMenu = solutionDropdown?.querySelector('.dropdown-menu');

    if (solutionDropdown && solutionDropdownToggle && window.bootstrap) {
        const dropdown = bootstrap.Dropdown.getOrCreateInstance(solutionDropdownToggle);
        let hideDropdownTimeout;

        const showDropdown = () => {
            clearTimeout(hideDropdownTimeout);
            dropdown.show();
        };

        const hideDropdown = () => {
            hideDropdownTimeout = setTimeout(() => {
                dropdown.hide();
            }, 100);
        };

        solutionDropdown.addEventListener('mouseenter', showDropdown);
        solutionDropdown.addEventListener('mouseleave', hideDropdown);

        solutionDropdownMenu.addEventListener('mouseenter', showDropdown);
        solutionDropdownMenu.addEventListener('mouseleave', hideDropdown);

        solutionDropdown.addEventListener('focusin', showDropdown);

        solutionDropdown.addEventListener('focusout', hideDropdown);
    }

    if (troubleIcon && troubleBtn) {
        troubleBtn.addEventListener('click', () => {
            troubleIcon.classList.remove('icon-animation');
            void troubleIcon.offsetWidth;
            troubleIcon.classList.add('icon-animation');
        });
    }

});
