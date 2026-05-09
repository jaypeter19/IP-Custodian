document.addEventListener('DOMContentLoaded', () => {

    // Selectors
    const solutionDropdownToggle = document.querySelector('.dropdown-toggle');
    const solutionDropdownMenu = document.querySelector('.dropdown-menu');
    let dropdownHideTimeout;


    // Show and Hide Functions
    const showDropdown = () => {
        clearTimeout(dropdownHideTimeout);

        solutionDropdownToggle.classList.add('show');
        solutionDropdownToggle.setAttribute('aria-expanded', true)

        solutionDropdownMenu.classList.add('show');
        solutionDropdownMenu.setAttribute('data-bs-popper', 'static');
    };


    const hideDropdown = () => {
        clearTimeout(dropdownHideTimeout);

        solutionDropdownToggle.setAttribute('aria-expanded', false)
        solutionDropdownToggle.classList.remove('show');

        solutionDropdownMenu.removeAttribute('data-bs-popper');
        solutionDropdownMenu.classList.remove('show');
    };


    const scheduleHideDropdown = () => {
        clearTimeout(dropdownHideTimeout);
        dropdownHideTimeout = setTimeout(hideDropdown, 200);
    };


    if (solutionDropdownToggle && solutionDropdownMenu) {

        solutionDropdownToggle.addEventListener('mouseenter', showDropdown);
        solutionDropdownToggle.addEventListener('focusin', showDropdown);

        solutionDropdownToggle.addEventListener('mouseleave', scheduleHideDropdown);
        solutionDropdownMenu.addEventListener('mouseenter', showDropdown);
        solutionDropdownMenu.addEventListener('mouseleave', hideDropdown);
        solutionDropdownMenu.addEventListener('focusout', hideDropdown);
    }



});
