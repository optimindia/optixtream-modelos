import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [html, styles, script] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../styles.css', import.meta.url), 'utf8'),
  readFile(new URL('../script.js', import.meta.url), 'utf8')
]);

assert.match(
  styles,
  /\.stage-screen\s*>\s*img\s*\{[^}]*height:\s*auto/s,
  'the highlighted preview must override the HTML height hint'
);
assert.match(
  styles,
  /@media\s*\(max-width:\s*1079px\)/,
  'the hero must stack before tablet columns become cramped'
);
assert.match(
  styles,
  /@media\s*\(max-width:\s*1079px\)[\s\S]*?\.stage-caption\s*\{[^}]*position:\s*relative/s,
  'the tablet caption must participate in normal flow'
);
assert.match(styles, /font-weight:\s*300/, 'fine typography must use a real 300 weight');
assert.match(script, /},\s*180\);/, 'showroom transitions must use the calmer timing');
assert.equal((html.match(/class="model-picker/g) || []).length, 15);
assert.equal((html.match(/class="model-card(?:\s[^"]*)?"/g) || []).length, 15);

console.log('Responsive showroom contract passed');
