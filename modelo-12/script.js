const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const year = document.querySelector('[data-year]');

function setMenu(open) {
  if (!menuToggle || !menu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
}

menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

if (year) year.textContent = String(new Date().getFullYear());

const reveals = [...document.querySelectorAll('[data-reveal]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('is-visible'));
} else {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  reveals.forEach((element) => observer.observe(element));
}

document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: 'OptiXtream Aurora 12' });
  });
});
