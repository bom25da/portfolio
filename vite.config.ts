import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), ...(!isSsrBuild ? [cloudflare()] : [])],
  build: { outDir: 'dist' },
}));
