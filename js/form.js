/* ==========================================================================
   form.js — custom contact form validation
   - Runs on submit (with novalidate so no browser defaults appear)
   - Shows our own error messages under each field
   - Focuses the first invalid field on error
   - On success: either posts to Netlify (if available) or shows success message
   ========================================================================== */

(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const successEl = document.getElementById('form-success');

  // Simple but practical email check
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(fieldName, message) {
    const field = form.querySelector('[data-field="' + fieldName + '"]');
    const input = field.querySelector('.form__input, .form__textarea');
    const errorEl = field.querySelector('.form__error');

    if (message) {
      field.setAttribute('data-invalid', 'true');
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorEl.id);
      errorEl.textContent = message;
    } else {
      field.setAttribute('data-invalid', 'false');
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      errorEl.textContent = '';
    }
  }

  function validate(values) {
    const errors = {};

    if (!values.name.trim()) {
      errors.name = 'Please tell me your name.';
    } else if (values.name.trim().length < 2) {
      errors.name = 'That name looks a bit short.';
    }

    if (!values.email.trim()) {
      errors.email = 'Please enter an email address.';
    } else if (!EMAIL_RE.test(values.email.trim())) {
      errors.email = 'That does not look like a valid email address.';
    }

    if (!values.message.trim()) {
      errors.message = 'Please write a short message.';
    } else if (values.message.trim().length < 10) {
      errors.message = 'A few more words would help — at least 10 characters.';
    }

    return errors;
  }

  function clearAll() {
    ['name', 'email', 'message'].forEach(function (f) { setFieldError(f, ''); });
    if (successEl) successEl.hidden = true;
  }

  // Live-clear errors as the user fixes them
  form.addEventListener('input', function (event) {
    const field = event.target.closest('[data-field]');
    if (!field) return;
    setFieldError(field.getAttribute('data-field'), '');
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const values = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    const errors = validate(values);

    // Clear then re-apply so old messages disappear
    clearAll();

    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      errorKeys.forEach(function (key) { setFieldError(key, errors[key]); });

      // Focus the first invalid field
      const first = form.querySelector('[data-field="' + errorKeys[0] + '"] .form__input, [data-field="' + errorKeys[0] + '"] .form__textarea');
      if (first) first.focus();
      return;
    }

    // All valid — try Netlify if we're on Netlify, otherwise just simulate
    const isNetlify = form.hasAttribute('data-netlify') && window.location.hostname.endsWith('netlify.app');

    if (isNetlify) {
      // Encode and POST to Netlify Forms
      const encoded = new URLSearchParams(new FormData(form)).toString();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded
      })
        .then(function () {
          form.reset();
          if (successEl) successEl.hidden = false;
        })
        .catch(function () {
          setFieldError('message', 'Something went wrong sending the message. Please try again.');
        });
    } else {
      // Local preview / GitHub Pages: simulate success
      form.reset();
      if (successEl) successEl.hidden = false;
    }
  });
})();