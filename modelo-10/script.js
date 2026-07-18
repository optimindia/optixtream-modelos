(function () {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile TOC toggle
  const tocToggle = document.querySelector('.toc-toggle');
  const tocList = document.getElementById('toc-list');
  if (tocToggle && tocList) {
    tocToggle.addEventListener('click', () => {
      const open = tocList.classList.toggle('is-open');
      tocToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    tocList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        tocList.classList.remove('is-open');
        tocToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Slideshow
  document.querySelectorAll('.has-slideshow').forEach(section => {
    const slides = section.querySelectorAll('.bg-slide');
    if (!slides.length) return;
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 5000);
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // FAQ accordion
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');

      // Close others
      item.closest('.accordion').querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Meta Pixel Lead on CTAs
  if (typeof fbq !== 'undefined') {
    document.querySelectorAll('[data-track="lead"]').forEach(btn => {
      btn.addEventListener('click', () => fbq('track', 'Lead'));
    });
  }
})();
