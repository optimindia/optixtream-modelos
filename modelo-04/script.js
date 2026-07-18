(function () {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------------------------
     Meta Pixel: Lead en cada CTA
     ------------------------------------------------------------------------- */
  if (typeof fbq !== 'undefined') {
    document.querySelectorAll('[data-track="lead"]').forEach(function (cta) {
      cta.addEventListener('click', function () { fbq('track', 'Lead'); });
    });
  }

  /* -------------------------------------------------------------------------
     Reveal en scroll
     ------------------------------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -------------------------------------------------------------------------
     Navegación sticky que aparece al scrollear
     ------------------------------------------------------------------------- */
  const nav = document.getElementById('nav');
  function updateNav() {
    if (nav) nav.classList.toggle('show', window.scrollY > window.innerHeight * 0.55);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* -------------------------------------------------------------------------
     Slideshow de plataformas
     ------------------------------------------------------------------------- */
  const slideshow = document.getElementById('slideshow');
  if (slideshow) {
    const slides = slideshow.querySelectorAll('.slide');
    let idx = 0;
    function nextSlide() {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }
    setInterval(nextSlide, 5000);
  }

  /* -------------------------------------------------------------------------
     Firma: collage tipográfico que se rearma con el scroll
     ------------------------------------------------------------------------- */
  const collage = document.getElementById('collage');
  const hero = document.getElementById('hero');

  function setCollageProgress(p) {
    if (!collage) return;
    collage.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(3));
  }

  function collageProgressFromScroll() {
    if (!hero) return 1;
    const r = hero.getBoundingClientRect();
    const distance = r.top + r.height * 0.12;
    const span = r.height * 0.55;
    return 1 - Math.max(0, Math.min(1, distance / span));
  }

  function updateCollage() {
    if (reduced) {
      setCollageProgress(1);
      return;
    }
    setCollageProgress(collageProgressFromScroll());
  }

  // El collage se rearma exclusivamente con el scroll (no con auto-animación).
  window.addEventListener('scroll', updateCollage, { passive: true });
  updateCollage();

  /* -------------------------------------------------------------------------
     Cursor glow sutil en desktop (una sola fuente de luz coherente)
     ------------------------------------------------------------------------- */
  if (!reduced && matchMedia('(pointer: fine)').matches && hero) {
    let glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    const moveGlow = function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    };

    hero.addEventListener('pointermove', moveGlow, { passive: true });
    hero.addEventListener('pointerleave', function () { glow.style.opacity = '0'; });
    hero.addEventListener('pointerenter', function () { glow.style.opacity = '1'; });
  }
})();
