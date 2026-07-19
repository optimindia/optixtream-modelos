import assert from 'node:assert/strict';
import { getModelState } from '../script.js';

assert.deepEqual(getModelState('01'), {
  id: '01',
  title: 'Nocturna',
  note: 'Cine oscuro',
  href: 'modelo-01/',
  src: 'previews/modelo-01.png',
  alt: 'Vista previa del modelo 01 Nocturna'
});

assert.deepEqual(getModelState('11'), {
  id: '11',
  title: 'Motivo',
  note: 'Gran espectáculo',
  href: 'modelo-11/',
  src: 'previews/modelo-11.png',
  alt: 'Vista previa del modelo 11 Motivo'
});

assert.deepEqual(getModelState('12'), {
  id: '12',
  title: 'Aurora',
  note: 'Señal nocturna',
  href: 'modelo-12/',
  src: 'previews/modelo-12.png',
  alt: 'Vista previa del modelo 12 Aurora'
});

assert.throws(() => getModelState('13'), /Unknown showroom model: 13/);

console.log('Showroom state contract passed');
