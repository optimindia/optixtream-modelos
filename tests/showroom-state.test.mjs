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

assert.throws(() => getModelState('12'), /Unknown showroom model: 12/);

console.log('Showroom state contract passed');
