
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: '/Users/johnyag/Desktop/Projects/forge/bear/.kiln',
  server: {
    port: 6006,
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve('/Users/johnyag/Desktop/Projects/forge/bear', 'src'),
      '@utils': resolve('/Users/johnyag/Desktop/Projects/forge/bear', './src/utils'),
      '@hooks': resolve('/Users/johnyag/Desktop/Projects/forge/bear', './src/hooks'),
      '@context': resolve('/Users/johnyag/Desktop/Projects/forge/bear', './src/context'),
      '@components': resolve('/Users/johnyag/Desktop/Projects/forge/bear', './src/components'),
    },
  },
  css: {
    postcss: '/Users/johnyag/Desktop/Projects/forge/bear/.kiln',
  },
});
