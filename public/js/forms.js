(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  const hasRecaptchaResponse = form => {
    const recaptcha = form.querySelector('.g-recaptcha')

    if (!recaptcha) {
      return true
    }

    const response = form.querySelector('textarea[name="g-recaptcha-response"]')
    const isComplete = Boolean(response && response.value.trim())
    const field = recaptcha.closest('.recaptcha-field')

    if (field) {
      field.classList.toggle('is-invalid', !isComplete)
    }

    return isComplete
  }

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      const recaptchaIsComplete = hasRecaptchaResponse(form)

      if (!form.checkValidity() || !recaptchaIsComplete) {
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
