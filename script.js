const models = {
  '01': ['Nocturna', 'Cine oscuro'],
  '02': ['Prisma', 'Color eléctrico'],
  '03': ['Éter', 'Editorial de lujo'],
  '04': ['Órbita', 'Futuro amable'],
  '05': ['Multivisión', 'Control total'],
  '06': ['Pulso', 'Broadcast directo'],
  '07': ['El Dial', 'Calma analógica'],
  '08': ['Uplink', 'Señal orbital'],
  '09': ['Zapping', 'Pop geométrico'],
  '10': ['Butaca', 'Cartelera moderna'],
  '11': ['Motivo', 'Gran espectáculo']
};

export function getModelState(modelId) {
  const model = models[modelId];
  if (!model) throw new Error(`Unknown showroom model: ${modelId}`);
  const [title, note] = model;
  return {
    id: modelId,
    title,
    note,
    href: `modelo-${modelId}/`,
    src: `previews/modelo-${modelId}.png`,
    alt: `Vista previa del modelo ${modelId} ${title}`
  };
}

function initShowroom() {
  const stageScreen = document.getElementById('stage-link');
  const stageImage = document.getElementById('stage-image');
  const stageNumber = document.getElementById('stage-number');
  const stageTitle = document.getElementById('stage-title');
  const stageNote = document.getElementById('stage-note');
  const stagePath = stageScreen?.querySelector('.screen-chrome b');
  const pickers = [...document.querySelectorAll('.model-picker[data-pick]')];
  let changeTimer;

  function selectModel(modelId) {
    const state = getModelState(modelId);
    pickers.forEach((picker) => {
      const active = picker.dataset.pick === modelId;
      picker.classList.toggle('is-active', active);
      picker.setAttribute('aria-pressed', String(active));
    });

    if (!stageScreen || !stageImage || !stageNumber || !stageTitle || !stageNote) return;
    window.clearTimeout(changeTimer);
    stageScreen.classList.add('is-changing');
    changeTimer = window.setTimeout(() => {
      stageScreen.href = state.href;
      stageScreen.setAttribute('aria-label', `Abrir modelo ${state.id}, ${state.title}`);
      stageImage.src = state.src;
      stageImage.alt = state.alt;
      stageNumber.textContent = state.id;
      stageTitle.textContent = state.title;
      stageNote.textContent = state.note;
      if (stagePath) stagePath.textContent = `optixtream / modelo-${state.id}`;
      stageScreen.classList.remove('is-changing');
    }, 150);
  }

  pickers.forEach((picker) => {
    picker.addEventListener('click', () => selectModel(picker.dataset.pick));
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  revealItems.forEach((item) => observer.observe(item));
}

if (typeof document !== 'undefined') initShowroom();
