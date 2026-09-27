import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: resolve(root, '../assets'),
    emptyOutDir: false,
    minify: 'esbuild',
    lib: {
      entry: resolve(root, 'src/mount.jsx'),
      formats: ['iife'],
      name: 'CaracterGradient',
      fileName: () => 'gradient.js',
    },
  },
});
