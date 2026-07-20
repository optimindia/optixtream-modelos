import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';

const root = process.cwd();
const failures = [];
const models = Array.from({ length: 15 }, (_, index) => `modelo-${String(index + 1).padStart(2, '0')}`);
const rootFiles = ['index.html', 'styles.css', 'script.js', '404.html', 'favicon.svg', '_headers', '_redirects', 'README.md'];
const productionExtensions = new Set(['.html', '.css', '.js']);
const debugPattern = /(?:^|[-_.])(debug|preview|capture|captura|crop|mob\d*|backup|bak)(?:[-_.]|$)/i;

function fail(message) {
  failures.push(message);
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function extension(file) {
  const match = file.match(/\.[^.]+$/);
  return match ? match[0].toLowerCase() : '';
}

function localReferences(text) {
  const references = [];
  const attributePattern = /\b(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  const cssPattern = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  for (const pattern of [attributePattern, cssPattern]) {
    let match;
    while ((match = pattern.exec(text))) references.push(match[1].trim());
  }
  return references.filter((value) =>
    value &&
    !value.startsWith('#') &&
    !value.startsWith('%23') &&
    !value.startsWith('data:') &&
    !value.startsWith('mailto:') &&
    !value.startsWith('tel:') &&
    !value.startsWith('javascript:') &&
    !/^https?:\/\//i.test(value)
  );
}

function verifyReferences(file, text) {
  for (const reference of localReferences(text)) {
    const clean = reference.split(/[?#]/)[0];
    if (!clean) continue;
    const target = resolve(dirname(file), decodeURIComponent(clean));
    const insideRoot = target === root || target.startsWith(root + sep);
    if (!insideRoot) {
      fail(`${relative(root, file)} escapes the repository with ${reference}`);
      continue;
    }
    if (!existsSync(target)) fail(`${relative(root, file)} references missing ${reference}`);
  }
}

function verifyDuplicateIds(file, text) {
  const ids = [...text.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicates.length) fail(`${relative(root, file)} has duplicate IDs: ${duplicates.join(', ')}`);
}

for (const file of rootFiles) {
  if (!existsSync(join(root, file))) fail(`Missing root file: ${file}`);
}

for (const model of models) {
  const directory = join(root, model);
  if (!existsSync(directory)) {
    fail(`Missing model directory: ${model}`);
    continue;
  }
  for (const required of ['index.html', 'styles.css', 'script.js']) {
    if (!existsSync(join(directory, required))) fail(`${model} is missing ${required}`);
  }

  for (const file of walk(directory)) {
    const name = relative(directory, file);
    if (debugPattern.test(name)) fail(`${model} contains non-production file ${name}`);
    if (!productionExtensions.has(extension(file))) continue;
    const text = readFileSync(file, 'utf8');
    if (/\.\.\//.test(text)) fail(`${model}/${name} contains a parent-directory reference`);
    if (/design[\\/]theme\.css/i.test(text)) fail(`${model}/${name} depends on workshop design files`);
    if (/images\.unsplash\.com/i.test(text)) fail(`${model}/${name} contains a remote Unsplash image`);
    if (/binarios?(?:\s+xtream)?/i.test(text)) fail(`${model}/${name} contains the retired Binarios brand`);
    if (/[A-Z]:[\\/](?:Users|Windows|Program Files)/i.test(text)) fail(`${model}/${name} contains an absolute Windows path`);
    if (model === 'modelo-01' && name === 'styles.css' && /html,\s*body,\s*main,[\s\S]*?width:\s*100vw/i.test(text)) {
      fail('modelo-01/styles.css uses scrollbar-sensitive 100vw sizing on mobile');
    }
    verifyReferences(file, text);
    if (extension(file) === '.html') verifyDuplicateIds(file, text);
  }
}

const indexPath = join(root, 'index.html');
if (existsSync(indexPath)) {
  const index = readFileSync(indexPath, 'utf8');
  const orderedCards = [...index.matchAll(/data-model=["'](\d{2})["']/g)].map((match) => match[1]);
  const expected = models.map((model) => model.slice(-2));
  if (JSON.stringify(orderedCards) !== JSON.stringify(expected)) {
    fail(`Catalog model order must be ${expected.join(', ')}; received ${orderedCards.join(', ') || 'none'}`);
  }
  const showroomRequirements = [
    ['class="showcase-stage"', 'Catalog is missing the Apple showroom stage'],
    ['class="model-picker"', 'Catalog is missing the quick model selector'],
    ['class="assurance-grid"', 'Catalog is missing the assurance section'],
    ['class="process-grid"', 'Catalog is missing the selection process'],
    ['aria-live="polite"', 'Showcase changes are not announced'],
    ['Plus+Jakarta+Sans', 'Catalog is missing the approved typography'],
    ['<em>cada manera<br>de vender.</em>', 'Catalog heading must wrap without clipping on desktop']
  ];
  for (const [needle, message] of showroomRequirements) {
    if (!index.includes(needle)) fail(message);
  }
  const pickerModels = [...index.matchAll(/class="[^"]*\bmodel-picker\b[^"]*"[^>]+data-pick="(\d{2})"/g)].map((match) => match[1]);
  if (JSON.stringify(pickerModels) !== JSON.stringify(expected)) {
    fail(`Showcase picker order must be ${expected.join(', ')}; received ${pickerModels.join(', ') || 'none'}`);
  }
  if (!index.includes('https://wa.me/5492616027055')) fail('Catalog is missing the OptiXtream WhatsApp destination');
  verifyReferences(indexPath, index);
  verifyDuplicateIds(indexPath, index);
}

const stylesPath = join(root, 'styles.css');
if (existsSync(stylesPath)) {
  const rootStyles = readFileSync(stylesPath, 'utf8');
  for (const token of ['#F5F5F7', '#FFFFFF', '#111216', '#686A73', '#4F66FF', '#FF775F']) {
    if (!rootStyles.toUpperCase().includes(token)) fail(`Catalog styles are missing token ${token}`);
  }
  if (/\.hero\s*\{[^}]*min-height:\s*calc\(100svh/i.test(rootStyles)) {
    fail('Catalog hero must size to its content instead of forcing an empty viewport');
  }
  if (!/scroll-margin-top:\s*6rem/i.test(rootStyles)) {
    fail('Catalog anchors need a 6rem offset for the sticky navigation');
  }
}

const redirectsPath = join(root, '_redirects');
if (existsSync(redirectsPath)) {
  const redirects = readFileSync(redirectsPath, 'utf8');
  if (!redirects.includes('/modelo-03-09-04-25/* /modelo-10/:splat 301')) fail('_redirects is missing the Modelo 10 legacy redirect');
}

if (failures.length) {
  console.error(`OptiXtream validation failed (${failures.length})`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log('OptiXtream validation passed');
