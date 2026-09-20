'use strict';
// Responsive navigation: click, outside click, Escape and breakpoint dismissal.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 801px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
// Real testimonials from the supplied homepage. No auto-advancing slides.
const reviews = [
  { name: 'Don Jenkins', quote: 'Ayden takes his time and makes sure that my yard is spotless… he always gets along well with my dogs.' },
  { name: 'Mahalia Davis', quote: 'What a hard working and professional young man! He gets the job done and I am always satisfied with the results.' },
  { name: 'Chukwudum Chukwudebelu', quote: 'Ayden does excellent work, he goes above and beyond to communicate with his customers.' }
];
let reviewIndex = 0;
function showReview(direction) {
  reviewIndex = (reviewIndex + direction + reviews.length) % reviews.length;
  const review = reviews[reviewIndex];
  document.querySelector('#review-quote').textContent = `“${review.quote}”`;
  document.querySelector('#review-name').textContent = review.name;
  document.querySelector('#review-count').textContent = `${String(reviewIndex + 1).padStart(2, '0')} — ${String(reviews.length).padStart(2, '0')}`;
}
document.querySelector('#review-prev')?.addEventListener('click', () => showReview(-1));
document.querySelector('#review-next')?.addEventListener('click', () => showReview(1));
document.querySelector('#year').textContent = new Date().getFullYear();
// Native details remain functional without JavaScript. This also supports older browsers
// that do not yet enforce exclusive details groups via the name attribute.
const serviceRows = [...document.querySelectorAll('.service-row')];
serviceRows.forEach(row => row.addEventListener('toggle', () => {
  if (row.open) serviceRows.forEach(other => { if (other !== row) other.open = false; });
}));

// Counters animate once on entering the viewport; final values remain in HTML.
const countItems = [...document.querySelectorAll('[data-count]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const runningCounts = new Map();
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const endValue = Number(element.dataset.count);
      countObserver.unobserve(element);
      const startTime = performance.now();
      const tick = time => {
        if (reducedMotion.matches) {
          element.textContent = String(endValue);
          runningCounts.delete(element);
          return;
        }
        const progress = Math.min((time - startTime) / 1100, 1);
        element.textContent = String(Math.floor(endValue * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) runningCounts.set(element, requestAnimationFrame(tick));
        else runningCounts.delete(element);
      };
      element.textContent = '0';
      runningCounts.set(element, requestAnimationFrame(tick));
    });
  }, { threshold: 0.6 });
  countItems.forEach(element => countObserver.observe(element));
  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    countObserver.disconnect();
    runningCounts.forEach((frame, element) => {
      cancelAnimationFrame(frame);
      element.textContent = element.dataset.count;
    });
    runningCounts.clear();
  });
}
