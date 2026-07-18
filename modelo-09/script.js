/* ==========================================================================
   OptiXtream — Modelo 09 · Zapping
   Firma: Control Remoto Saltarín (rebote por proximidad de cursor / ciclo
   automático en touch), reveal en scroll, pixel de Meta.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------- */
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

  /* -------------------------------------------------------------
     FAQ accordion — cierra los demás al abrir uno (comportamiento
     tipo acordeón sobre <details> nativos)
     ------------------------------------------------------------- */
  const faqs = document.querySelectorAll('.faq');
  faqs.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqs.forEach(other => { if (other !== item) other.open = false; });
      }
    });
  });

  /* -------------------------------------------------------------
     Meta Pixel — Lead en todos los CTA
     ------------------------------------------------------------- */
  if (typeof fbq !== 'undefined') {
    document.querySelectorAll('[data-track="lead"]').forEach(btn => {
      btn.addEventListener('click', () => fbq('track', 'Lead'));
    });
  }

  /* -------------------------------------------------------------
     FIRMA — Control Remoto Saltarín
     Desktop (puntero fino): las formas rebotan cuando el cursor
     pasa cerca, con un pequeño delay escalonado por forma.
     Touch / sin puntero fino: ciclo automático tipo "zapping" que
     hace rebotar cada forma por turno, como cambiando de canal.
     Respeta prefers-reduced-motion: todo queda estático.
     ------------------------------------------------------------- */
  const scene = document.querySelector('.remote-scene');
  const remote = document.querySelector('.remote');

  if (scene && !reducedMotion) {
    const bouncers = Array.from(scene.querySelectorAll('[data-bounce]'));
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    const triggerBounce = (el, delay) => {
      window.setTimeout(() => {
        if (el.classList.contains('is-bouncing')) return;
        el.classList.add('is-bouncing');
        el.addEventListener('animationend', () => el.classList.remove('is-bouncing'), { once: true });
      }, delay);
    };

    if (finePointer) {
      const PROXIMITY = 95;
      let ticking = false;

      scene.addEventListener('pointermove', (e) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          bouncers.forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
            if (dist < PROXIMITY) {
              triggerBounce(el, i * 45);
            }
          });
          ticking = false;
        });
      });

      remote.addEventListener('pointerenter', () => triggerBounce(remote, 0));
    } else {
      /* Sin puntero fino: física simple de "zapping" automático,
         un elemento por turno, como si alguien cambiara de canal. */
      let idx = 0;
      window.setInterval(() => {
        triggerBounce(bouncers[idx % bouncers.length], 0);
        idx += 1;
      }, 1900);

      scene.addEventListener('pointerdown', () => triggerBounce(remote, 0));
    }
  }
});
