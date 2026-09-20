// Configure a trusted contact-form backend before enabling online enquiries.
// The uploaded HTML referenced contact_process.php, but that handler was not supplied.
// Set endpoint to its deployed URL (or your form service endpoint).
// It must accept FormData fields: name, email, subject, message, website.
// Return HTTP 2xx with JSON { "success": true } ONLY after accepting the enquiry.
// For cross-origin endpoints, configure CORS for your website's origin.
window.POOPEM_CONTACT = Object.freeze({
  endpoint: ''
});
