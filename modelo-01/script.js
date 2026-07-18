/* ==========================================================================
   OptiXtream — Modelo 01 · Cinemático Oscuro
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Slideshows */
  function initSlideshow(containerSelector, slideSelector, interval) {
    document.querySelectorAll(containerSelector).forEach(container => {
      const slides = container.querySelectorAll(slideSelector);
      if (slides.length <= 1) return;
      let i = 0;
      setInterval(() => {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, interval);
    });
  }

  initSlideshow('.hero-slideshow', '.hero-slide', 5200);
  initSlideshow('.slideshow', '.slide', 6000);

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

  /* Meta Pixel Lead on all CTAs */
  if (typeof fbq !== 'undefined') {
    document.querySelectorAll('[data-track="lead"]').forEach(btn => {
      btn.addEventListener('click', () => fbq('track', 'Lead'));
    });
  }

  /* Ensure hero is considered ignited even without interaction */
  const hero = document.querySelector('.hero-cinematic');
  if (hero && !hero.classList.contains('ignited')) {
    hero.classList.add('ignited');
  }

  /* Parallax sutil del glow en hero (solo pointer fino y sin reduced motion) */
  if (!reducedMotion && hero && window.matchMedia('(pointer: fine)').matches) {
    const glow = hero.querySelector('.hero-cinematic-glow');
    if (glow) {
      hero.addEventListener('pointermove', e => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        glow.style.transform = `translate(calc(-50% + ${x * 40}px), ${y * 25}px)`;
      });
    }
  }
});
