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

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

if (year) year.textContent = String(new Date().getFullYear());

const channels = {
  function: ['La última función', 'Cine · Señal 04 · En vivo'],
  court: ['La cancha abierta', 'Deportes · Señal 07 · En vivo'],
  night: ['Frecuencia sur', 'Música · Señal 09 · En vivo']
};
document.querySelectorAll('[data-channel]').forEach((button) => {
  button.addEventListener('click', () => {
    const [title, meta] = channels[button.dataset.channel] || channels.function;
    document.querySelector('#program-title').textContent = title;
    document.querySelector('#program-meta').textContent = meta;
    document.querySelector('#live-feature-title').textContent = title;
    document.querySelectorAll('[data-channel]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
  });
});

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
    if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: 'OptiXtream Vértigo 13' });
  });
});
