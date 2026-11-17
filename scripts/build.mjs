import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const css = (await readFile(path.join(root, 'src/input.css'), 'utf8'))
  .replace(/^\s*@tailwind\s+(?:base|components|utilities);\s*$/gm, '')
  .trimStart();
await mkdir(output, { recursive: true });
await writeFile(path.join(output, 'output.css'), css);
await writeFile(path.join(output, 'index.html'), html.replace(/(["'])\.\/dist\/output\.css\1/g, '$1./output.css$1'));

const copied = new Set();
async function copyResource(reference, sourceDirectory = root) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) return;
  const clean = decodeURIComponent(reference.split(/[?#]/)[0]);
  if (!clean) return;
  const source = path.resolve(sourceDirectory, clean);
  const relative = path.relative(root, source);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Resource is outside project: ${reference}`);
  }
  if (relative === 'dist/output.css' || copied.has(source)) return;
  copied.add(source);
  const destination = path.join(output, relative);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(source, destination);
  if (/\.css$/i.test(source)) {
    const contents = await readFile(source, 'utf8');
    for (const match of contents.matchAll(/url\(\s*["']?([^\s)"']+)["']?\s*\)/g)) {
      await copyResource(match[1], path.dirname(source));
    }
  }
}
for (const match of html.matchAll(/\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/g)) {
  await copyResource(match[1]);
}
for (const match of css.matchAll(/url\(\s*["']?([^\s)"']+)["']?\s*\)/g)) {
  // Source CSS is served from dist/output.css, so relative URLs resolve there.
  await copyResource(match[1], output);
}
console.log(`Built dist/index.html, dist/output.css and ${copied.size} local resources.`);
