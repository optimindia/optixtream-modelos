const channelData = {
  cinema: { title: 'La última función', meta: 'CANAL 04 · CINE · AHORA', hero: 'La señal que te encuentra' },
  sport: { title: 'La cancha abierta', meta: 'CANAL 07 · DEPORTE · EN VIVO', hero: 'El partido que no espera' },
  music: { title: 'Frecuencia nocturna', meta: 'CANAL 09 · MÚSICA · EN VIVO', hero: 'Sonido para mirar' },
  kids: { title: 'Planeta Mini', meta: 'CANAL 12 · KIDS · AHORA', hero: 'Una aventura por episodio' }
};

function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;
  const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); };
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('is-open', !expanded);
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
}

function initChannels() {
  const title = document.getElementById('program-title');
  const meta = document.getElementById('program-meta');
  const hero = document.getElementById('hero-program');
  const buttons = [...document.querySelectorAll('[data-channel]')];
  if (!title || !meta || !buttons.length) return;
  buttons.forEach((button) => button.addEventListener('click', () => {
    const channel = channelData[button.dataset.channel];
    if (!channel) return;
    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    title.textContent = channel.title;
    meta.textContent = channel.meta;
    if (hero) hero.textContent = channel.hero;
  }));
}

function initLeads() {
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => link.addEventListener('click', () => {
    if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: 'OptiXtream Chromatic Live 15' });
  }));
}

function initReveals() {
  const items = [...document.querySelectorAll('[data-reveal]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) { items.forEach((item) => item.classList.add('is-visible')); return; }
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });
  items.forEach((item) => observer.observe(item));
}

initMenu();
initChannels();
initLeads();
initReveals();

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
