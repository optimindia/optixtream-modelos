document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Slideshow ----
  document.querySelectorAll('.has-slideshow').forEach(section => {
    const slides = section.querySelectorAll('.bg-slide');
    if (!slides.length) return;
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 6000);
  });

  // ---- Scroll reveal ----
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = '0px';
      }
    });
  });

  // ---- Editorial TOC active state ----
  const tocLinks = document.querySelectorAll('.toc a');
  const sections = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && tocLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.4, rootMargin: '-30% 0px -50% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  // ---- Meta Pixel Lead on CTAs ----
  if (typeof fbq !== 'undefined') {
    document.querySelectorAll('[data-track="lead"]').forEach(btn => {
      btn.addEventListener('click', () => fbq('track', 'Lead'));
    });
  }

  // ---- Fallback: make first reveal visible fast if no JS? not needed ----
});
