const signalData = [
  {
    id: 'sport',
    breadcrumb: 'Inicio / En vivo / Deportes',
    meta: 'CH 07 · DEPORTES · AHORA · 4K',
    title: 'Fútbol sin pausa.',
    description: 'Partidos, previas y el minuto que todos van a comentar mañana.'
  },
  {
    id: 'cinema',
    breadcrumb: 'Inicio / Estrenos / Cine Prime',
    meta: 'CH 11 · CINE · ESTRENO · 4K',
    title: 'La noche corre.',
    description: 'Acción, suspenso y películas que entran a escena desde el primer minuto.'
  },
  {
    id: 'nature',
    breadcrumb: 'Inicio / Historias reales / Documentales',
    meta: 'CH 18 · REAL · NUEVO · 4K',
    title: 'El mundo sin filtro.',
    description: 'Expediciones, ciencia y lugares que merecen toda la pantalla.'
  }
];

const slider = document.querySelector('[data-slider]');
const slides = [...document.querySelectorAll('[data-signal]')];
const tabs = [...document.querySelectorAll('[data-signal-target]')];
const indexLabel = document.getElementById('signal-index');
const breadcrumb = document.getElementById('signal-breadcrumb');
const meta = document.getElementById('signal-meta');
const title = document.getElementById('signal-title');
const description = document.getElementById('signal-description');
let activeIndex = 0;
let touchStartX = 0;

function showSignal(nextIndex) {
  activeIndex = (nextIndex + signalData.length) % signalData.length;
  const active = signalData[activeIndex];

  if (slider) slider.dataset.active = active.id;
  slides.forEach((slide) => {
    const selected = slide.dataset.signal === active.id;
    slide.classList.toggle('is-active', selected);
    slide.setAttribute('aria-hidden', String(!selected));
  });
  tabs.forEach((tab) => {
    const selected = tab.dataset.signalTarget === active.id;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  if (breadcrumb) breadcrumb.textContent = active.breadcrumb;
  if (meta) meta.textContent = active.meta;
  if (title) title.textContent = active.title;
  if (description) description.textContent = active.description;
  if (indexLabel) indexLabel.textContent = String(activeIndex + 1).padStart(2, '0');
}

document.querySelector('[data-previous]')?.addEventListener('click', () => showSignal(activeIndex - 1));
document.querySelector('[data-next]')?.addEventListener('click', () => showSignal(activeIndex + 1));

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showSignal(index));
});

document.querySelectorAll('[data-show-signal]').forEach((button) => {
  button.addEventListener('click', () => {
    const index = signalData.findIndex((signal) => signal.id === button.dataset.showSignal);
    if (index < 0) return;
    showSignal(index);
    document.getElementById('top')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    slider?.focus({ preventScroll: true });
  });
});

slider?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    showSignal(activeIndex - 1);
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    showSignal(activeIndex + 1);
  }
});

slider?.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0]?.clientX ?? 0;
}, { passive: true });

slider?.addEventListener('touchend', (event) => {
  const distance = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
  if (Math.abs(distance) < 45) return;
  showSignal(distance > 0 ? activeIndex - 1 : activeIndex + 1);
}, { passive: true });

const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

function closeMenu() {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menu?.classList.remove('is-open');
}

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menu?.classList.toggle('is-open', !open);
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.addEventListener('click', () => {
    document.documentElement.dataset.lastLead = 'whatsapp';
  });
});

const revealItems = [...document.querySelectorAll('[data-reveal]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  revealItems.forEach((item) => observer.observe(item));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

showSignal(0);
