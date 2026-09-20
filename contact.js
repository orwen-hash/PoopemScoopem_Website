'use strict';
(() => {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const submit = form.querySelector('button[type="submit"]');
  const status = document.querySelector('#form-status');
  const availability = document.querySelector('#form-availability');
  const fields = ['name', 'email', 'subject', 'message'];
  const config = window.POOPEM_CONTACT || {};
  let endpoint = '';
  if (typeof config.endpoint === 'string' && config.endpoint.trim()) {
    try {
      const parsed = new URL(config.endpoint.trim(), location.href);
      if (parsed.protocol === 'https:' || (parsed.protocol === 'http:' && parsed.origin === location.origin)) endpoint = parsed.href;
    } catch { /* Leave delivery disabled for invalid configuration. */ }
  }
  if (endpoint) {
    availability.hidden = true;
    submit.disabled = false;
  }
  function validate(name) {
    const input = form.elements.namedItem(name);
    const error = document.querySelector(`#${name}-error`);
    const labels = { name: 'your name', email: 'your email address', subject: 'a subject', message: 'your message' };
    let message = '';
    if (!input.value.trim()) message = `Please enter ${labels[name]}.`;
    else if (name === 'email' && input.validity.typeMismatch) message = 'Please enter a valid email address.';
    else if (input.validity.tooLong) message = 'Please shorten this field.';
    input.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
    return !message;
  }
  fields.forEach(name => {
    const input = form.elements.namedItem(name);
    input.addEventListener('blur', () => validate(name));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validate(name);
    });
  });
  let sending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    status.textContent = '';
    const valid = fields.map(validate).every(Boolean);
    if (!valid) {
      form.querySelector('[aria-invalid="true"]').focus();
      status.dataset.state = 'error';
      status.textContent = 'Please check the highlighted fields.';
      return;
    }
    if (!endpoint) {
      status.dataset.state = 'error';
      status.textContent = 'Your message has not been sent. Online messages are temporarily unavailable. Please call (917) 297-5152.';
      return;
    }
    if (form.elements.namedItem('website').value) return;
    sending = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    status.dataset.state = 'pending';
    status.textContent = 'Sending your message…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const payload = new FormData(form);
      fields.forEach(name => payload.set(name, payload.get(name).trim()));
      const response = await fetch(endpoint, { method: 'POST', body: payload, headers: { Accept: 'application/json' }, signal: controller.signal });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Delivery not confirmed');
      status.dataset.state = 'success';
      status.textContent = 'Thank you. Your message has been received. We’ll be in touch.';
      form.reset();
      fields.forEach(name => form.elements.namedItem(name).removeAttribute('aria-invalid'));
    } catch {
      status.dataset.state = 'error';
      status.textContent = 'We couldn’t confirm that your message was received. Your details are still here. Please try again or call (917) 297-5152.';
    } finally {
      clearTimeout(timeout);
      sending = false;
      submit.disabled = false;
      submit.textContent = 'Send message ↗';
    }
  });
})();
