import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build, createBuilder } from 'vite';

// Keep the portfolio readable before JavaScript loads, with static hosting.
const builder = await createBuilder();
await builder.buildApp();
const serverOutput = resolve('.build/prerender');
await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: serverOutput,
    copyPublicDir: false,
    emptyOutDir: true,
  },
});

const { render } = await import(pathToFileURL(resolve(serverOutput, 'entry-server.js')));
const output = resolve('.cloudflare/output/v0/workers/default/assets/index.html');
const template = await readFile(output, 'utf8');
if (!template.includes('<!--app-html-->')) {
  throw new Error('Missing portfolio HTML placeholder.');
}
await writeFile(output, template.replace('<!--app-html-->', render()));
console.log('Prerendered portfolio HTML for static hosting.');
