import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

// Keep the portfolio readable before JavaScript loads, with static hosting.
await build();
const serverOutput = resolve('.sites-runtime/prerender');
await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: serverOutput,
    copyPublicDir: false,
    emptyOutDir: true,
  },
});

const { render } = await import(pathToFileURL(resolve(serverOutput, 'entry-server.js')));
const output = resolve('dist/index.html');
const template = await readFile(output, 'utf8');
if (!template.includes('<!--app-html-->')) {
  throw new Error('Missing portfolio HTML placeholder.');
}
await writeFile(output, template.replace('<!--app-html-->', render()));
console.log('Prerendered portfolio HTML for static hosting.');
