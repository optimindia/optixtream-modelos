/* ==========================================================================
   OptiXtream — Modelo 05 · Multivisión
   Muro de Señales: cascada de encendido + panel de vidrio reactivo.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---- Nav sticky al scrollear ---- */
  const nav = document.getElementById('nav');
  if (nav) {
    addEventListener('scroll', () => {
      nav.classList.toggle('show', scrollY > innerHeight * 0.5);
    }, { passive: true });
  }

  /* ---- Barra de progreso de scroll ---- */
  const bar = document.querySelector('.progress');
  if (bar) {
    addEventListener('scroll', () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    }, { passive: true });
  }

  /* ---- Cursor glow global ---- */
  const glow = document.querySelector('.cursor-glow');
  if (glow && finePointer && !reducedMotion) {
    addEventListener('pointermove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.classList.add('on');
    });
    document.addEventListener('pointerleave', () => glow.classList.remove('on'));
  }

  /* ---- Reflejo del panel/tiles/cards que sigue al puntero (--mx/--my) ---- */
  if (finePointer && !reducedMotion) {
    document.querySelectorAll('.signal-panel, .signal-tile, .price-card').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    });

    const panel = document.getElementById('signal-panel');
    if (panel) {
      let angle = 0;
      const spin = () => {
        angle = (angle + 0.12) % 360;
        panel.style.setProperty('--pa', angle.toFixed(2));
        requestAnimationFrame(spin);
      };
      requestAnimationFrame(spin);
    }
  }

  /* ---- Botones magnéticos ---- */
  if (finePointer && !reducedMotion) {
    document.querySelectorAll('.magnetic').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  /* ---- Reveal en scroll (blur-in) ---- */
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

  /* ---- Cascada de encendido: Muro de Señales + grilla de precios ---- */
  function igniteCascade(containerSelector, tileSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const tiles = container.querySelectorAll(tileSelector);
    if (!tiles.length) return;

    const light = () => {
      container.classList.add('is-live');
      tiles.forEach(t => t.classList.add('lit'));
    };

    if (reducedMotion || !('IntersectionObserver' in window)) { light(); return; }

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          light();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    io.observe(container);
  }

  igniteCascade('#signal-wall', '.signal-tile');
  igniteCascade('#pricing-grid', '.price-card');

  /* ---- Contador de estadísticas del hero ---- */
  function animateCount(el) {
    const target = +el.dataset.to;
    const duration = 1600;
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('es-AR');
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = target.toLocaleString('es-AR');
    }
    requestAnimationFrame(frame);
  }

  const counters = document.querySelectorAll('.hero-stats dt');
  if (counters.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach(el => { el.textContent = (+el.dataset.to).toLocaleString('es-AR'); });
    } else {
      const cio = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(el => cio.observe(el));
    }
  }

  /* ---- Meta Pixel: Lead en todos los CTA ---- */
  if (typeof fbq !== 'undefined') {
    document.querySelectorAll('[data-track="lead"]').forEach(btn => {
      btn.addEventListener('click', () => fbq('track', 'Lead'));
    });
  }
});
