/* ==========================================================================
   OptiXtream — Modelo 06 · Pulso en Vivo
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* Meta Pixel Lead on all CTAs */
  if (typeof fbq !== 'undefined') {
    document.querySelectorAll('[data-track="lead"]').forEach(btn => {
      btn.addEventListener('click', () => fbq('track', 'Lead'));
    });
  }

  /* --------------------------------------------------------------------
     Firma "Pulso en Vivo": la traza de señal del hero reacciona,
     sutilmente, a la velocidad de scroll. Único gesto animado extra
     además del reveal estándar.
     -------------------------------------------------------------------- */
  const heroWave = document.querySelector('.pulse-wave--hero');
  if (heroWave && !reducedMotion) {
    let lastY = window.scrollY;
    let ticking = false;
    let resetTimer = null;

    function applyScale() {
      const y = window.scrollY;
      const delta = Math.min(Math.abs(y - lastY), 140);
      lastY = y;
      const scale = 1 + (delta / 140) * 0.55; // hasta ~1.55x, sutil
      heroWave.style.setProperty('--pulse-scale', scale.toFixed(3));

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        heroWave.style.setProperty('--pulse-scale', 1);
      }, 260);

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(applyScale);
        ticking = true;
      }
    }, { passive: true });
  }
});
