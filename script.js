document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.model-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const figure = card.querySelector('figure');
    const playhead = card.querySelector('.playhead');
    if (!figure || !playhead || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = figure.getBoundingClientRect();
    const position = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
    playhead.style.transition = 'none';
    playhead.style.transform = `translateX(${position}px)`;
  });

  card.addEventListener('pointerleave', () => {
    const playhead = card.querySelector('.playhead');
    if (!playhead) return;
    playhead.removeAttribute('style');
  });
});
