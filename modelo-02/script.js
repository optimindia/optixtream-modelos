/* OptiXtream · Modelo 02 — interacciones */
(function () {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;

  /* -------------------------------------------------------------------------
     Reveal en scroll
     ------------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------------
     Slideshows
     ------------------------------------------------------------------------- */
  document.querySelectorAll('.has-slideshow').forEach(section => {
    const slides = section.querySelectorAll('.bg-slide');
    if (!slides.length) return;
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 5500);
  });

  // Hero slideshow también (no tiene clase has-slideshow)
  const heroSlideshow = document.querySelector('.hero-slideshow');
  if (heroSlideshow) {
    const slides = heroSlideshow.querySelectorAll('.bg-slide');
    if (slides.length > 1) {
      let i = 0;
      setInterval(() => {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, 6000);
    }
  }

  /* -------------------------------------------------------------------------
     Acordeón FAQ
     ------------------------------------------------------------------------- */
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      // Solo un item abierto a la vez
      if (isOpen) {
        item.parentElement.querySelectorAll('.accordion-item.open').forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  });

  /* -------------------------------------------------------------------------
     Meta Pixel Lead en todos los CTAs
     ------------------------------------------------------------------------- */
  if (typeof fbq !== 'undefined') {
    document.querySelectorAll('[data-track="lead"]').forEach(btn => {
      btn.addEventListener('click', () => fbq('track', 'Lead'));
    });
  }

  /* -------------------------------------------------------------------------
     Firma: reflejo cromado del mouse sobre el titular
     ------------------------------------------------------------------------- */
  const chromeHeadline = document.querySelector('.chrome-headline');
  if (chromeHeadline && !reduced && finePointer) {
    const updateReflection = (clientX, clientY) => {
      const rect = chromeHeadline.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      // Suavizado: solo parte del ángulo para que el cromo "gire" elegante
      document.documentElement.style.setProperty('--chrome-angle', `${angle * 0.35}deg`);
    };

    let ticking = false;
    document.addEventListener('pointermove', e => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateReflection(e.clientX, e.clientY);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* -------------------------------------------------------------------------
     Cards: resplandor que sigue al cursor (theme.css card pattern)
     ------------------------------------------------------------------------- */
  if (!reduced && finePointer) {
    document.querySelectorAll('.card').forEach(c => {
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', `${e.clientX - r.left}px`);
        c.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }
})();
