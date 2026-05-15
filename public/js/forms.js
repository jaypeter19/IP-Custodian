(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  const setCaptchaTimestamp = form => {
    const settingsField = form.querySelector('input[name="captcha_settings"]')
    const response = form.querySelector('textarea[name="g-recaptcha-response"]')

    if (!settingsField || (response && response.value.trim())) {
      return
    }

    try {
      const settings = JSON.parse(settingsField.value)
      settings.ts = JSON.stringify(new Date().getTime())
      settingsField.value = JSON.stringify(settings)
    } catch (error) {
      // Keep the form usable if Salesforce changes the generated payload format.
    }
  }

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
    setCaptchaTimestamp(form)
    window.setInterval(() => setCaptchaTimestamp(form), 500)

    form.addEventListener('submit', event => {
      const recaptchaIsComplete = hasRecaptchaResponse(form)

      if (!form.checkValidity() || !recaptchaIsComplete) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        setCaptchaTimestamp(form)
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
