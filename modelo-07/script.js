/* ==========================================================================
   OptiXtream — Modelo 07 · "El Dial"
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* Nav: aparece al scrollear */
  const nav = document.getElementById('nav');
  if (nav) {
    const toggleNav = () => nav.classList.toggle('show', window.scrollY > window.innerHeight * 0.55);
    toggleNav();
    window.addEventListener('scroll', toggleNav, { passive: true });
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

  /* Meta Pixel Lead en todos los CTA */
  if (typeof fbq !== 'undefined') {
    document.querySelectorAll('[data-track="lead"]').forEach(btn => {
      btn.addEventListener('click', () => fbq('track', 'Lead'));
    });
  }
});
