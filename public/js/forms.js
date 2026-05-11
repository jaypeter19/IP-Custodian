(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        event.preventDefault();
        const currentPath = window.location.pathname;
        if (currentPath.includes('contact.html')) {
          window.location.href = './thanks.html';
        } else {
          window.location.href = './pages/thanks.html';
        }
      }

      form.classList.add('was-validated')
    }, false)
  })
})()