/* ==========================================================================
   OptiXtream — Modelo 08 · Uplink
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nav sticky que aparece al scrollear */
  const nav = document.getElementById('nav');
  if (nav) {
    addEventListener('scroll', () => {
      nav.classList.toggle('show', scrollY > innerHeight * 0.6);
    }, { passive: true });
  }

  /* Scroll reveal */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* FAQ accordion */
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  /* Card: resplandor que sigue al cursor */
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* Meta Pixel Lead en todos los CTA */
  if (typeof fbq !== 'undefined') {
    document.querySelectorAll('[data-track="lead"]').forEach(btn => {
      btn.addEventListener('click', () => fbq('track', 'Lead'));
    });
  }

  /* --------------------------------------------------------------------
     FIRMA — Enlace Satelital: el contador arranca cuando el radar
     completa su primer barrido, como una sola secuencia de "conexión
     establecida" (barrido -> señal adquirida -> contador).
     -------------------------------------------------------------------- */
  const statusEl = document.getElementById('uplinkStatus');
  const counterEl = document.getElementById('uplinkCounter');
  const sweepEl = document.querySelector('.radar-sweep');

  function runCounter(el) {
    const target = +el.dataset.to;
    const duration = 1400;
    const start = performance.now();
    (function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target).toLocaleString('es-AR');
      if (progress < 1) requestAnimationFrame(frame);
    })(start);
  }

  function lockSignal() {
    if (statusEl) {
      statusEl.textContent = 'Señal adquirida — estable';
      statusEl.classList.add('is-locked');
    }
    if (counterEl) runCounter(counterEl);
  }

  if (reducedMotion || !sweepEl) {
    lockSignal();
  } else {
    let locked = false;
    sweepEl.addEventListener('animationiteration', () => {
      if (locked) return;
      locked = true;
      lockSignal();
    });
    /* Fallback por si el navegador no dispara el evento */
    setTimeout(() => { if (!locked) { locked = true; lockSignal(); } }, 7600);
  }
});
