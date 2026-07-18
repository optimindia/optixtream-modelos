import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, join, resolve, sep } from 'node:path';
import { resolveImageUrl } from './image-fallbacks.mjs';

const targetRoot = process.cwd();
const sourceRoot = process.env.OPTX_SOURCE ? resolve(process.env.OPTX_SOURCE) : '';
const sharedTheme = sourceRoot ? resolve(sourceRoot, '..', 'design', 'theme.css') : '';
const productionFiles = ['index.html', 'styles.css', 'script.js'];
const mapping = [
  ['modelo-01', 'modelo-01'],
  ['modelo-02', 'modelo-02'],
  ['modelo-03', 'modelo-03'],
  ['modelo-04', 'modelo-04'],
  ['modelo-05', 'modelo-05'],
  ['modelo-06', 'modelo-06'],
  ['modelo-07', 'modelo-07'],
  ['modelo-08', 'modelo-08'],
  ['modelo-09', 'modelo-09'],
  ['modelo-03-09-04-25', 'modelo-10'],
  ['modelo-11', 'modelo-11']
];

if (!sourceRoot || !existsSync(sourceRoot)) {
  throw new Error('Set OPTX_SOURCE to the PLANTILLAS WORDPRESS source directory.');
}
if (!existsSync(sharedTheme)) {
  throw new Error(`Shared theme not found: ${sharedTheme}`);
}

function assertSafeTarget(directory) {
  const absolute = resolve(directory);
  if (!absolute.startsWith(targetRoot + sep) || !/^modelo-\d{2}$/.test(basename(absolute))) {
    throw new Error(`Refusing to replace unsafe target: ${absolute}`);
  }
}

function remoteImages(text) {
  return [...text.matchAll(/https:\/\/images\.unsplash\.com\/[^\s"'()<>]+/g)].map((match) => match[0]);
}

function imageExtension(contentType) {
  if (contentType.includes('webp')) return '.webp';
  if (contentType.includes('png')) return '.png';
  return '.jpg';
}

async function downloadImage(url, destinationWithoutExtension) {
  const requestUrl = resolveImageUrl(url).replaceAll('&amp;', '&');
  const response = await fetch(requestUrl, { redirect: 'follow' });
  if (!response.ok) throw new Error(`Image request failed (${response.status}): ${requestUrl}`);
  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const destination = destinationWithoutExtension + imageExtension(contentType);
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  return destination;
}

for (const [sourceName, targetName] of mapping) {
  const sourceDirectory = join(sourceRoot, sourceName);
  const targetDirectory = join(targetRoot, targetName);
  if (!existsSync(sourceDirectory)) throw new Error(`Missing source model: ${sourceDirectory}`);
  assertSafeTarget(targetDirectory);
  await rm(targetDirectory, { recursive: true, force: true });
  await mkdir(targetDirectory, { recursive: true });

  const contents = new Map();
  for (const filename of productionFiles) {
    const sourceFile = join(sourceDirectory, filename);
    if (!existsSync(sourceFile)) throw new Error(`${sourceName} is missing ${filename}`);
    let text = await readFile(sourceFile, 'utf8');
    text = text
      .replaceAll('../../design/theme.css', 'theme.css')
      .replaceAll('design/theme.css', 'theme.css')
      .replaceAll('BINARIO<span>TV</span>', 'OPTI<span>XTREAM</span>')
      .replaceAll('Binarios <span>Xtream</span>', 'Opti<span>Xtream</span>')
      .replaceAll('Binarios<span>Xtream</span>', 'Opti<span>Xtream</span>')
      .replaceAll('Binarios%20Xtream', 'OptiXtream')
      .replaceAll('Binarios Xtream', 'OptiXtream');
    if (sourceName === 'modelo-01' && filename === 'styles.css') {
      text = text
        .replaceAll('width: 100vw;', 'width: 100%;')
        .replaceAll('max-width: 100vw;', 'max-width: 100%;')
        .replaceAll('calc(100vw - 2rem)', 'calc(100% - 2rem)');
    }
    contents.set(filename, text);
  }

  const needsTheme = [...contents.values()].some((text) => /(?:href=["']theme\.css|theme\.css)/i.test(text));
  if (needsTheme) await cp(sharedTheme, join(targetDirectory, 'theme.css'));

  const sourceAssets = join(sourceDirectory, 'assets');
  if (existsSync(sourceAssets) && (await stat(sourceAssets)).isDirectory()) {
    await cp(sourceAssets, join(targetDirectory, 'assets'), { recursive: true });
  }

  const urls = [...new Set([...contents.values()].flatMap(remoteImages))];
  const localAssets = join(targetDirectory, 'assets');
  if (urls.length) await mkdir(localAssets, { recursive: true });
  const replacements = new Map();

  await Promise.all(urls.map(async (url, index) => {
    const base = join(localAssets, `unsplash-${String(index + 1).padStart(2, '0')}`);
    const downloaded = await downloadImage(url, base);
    replacements.set(url, `assets/${basename(downloaded)}`);
  }));

  for (const [filename, original] of contents) {
    let text = original;
    for (const [url, local] of replacements) text = text.replaceAll(url, local);
    await writeFile(join(targetDirectory, filename), text, 'utf8');
  }

  console.log(`${targetName}: ${productionFiles.length + (needsTheme ? 1 : 0)} files, ${urls.length} remote images localized`);
}

console.log('OptiXtream model migration complete');
