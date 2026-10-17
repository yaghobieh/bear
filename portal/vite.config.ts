import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@utils': resolve(__dirname, '../src/utils'),
      '@hooks': resolve(__dirname, '../src/hooks'),
      '@context': resolve(__dirname, '../src/context'),
      '@types': resolve(__dirname, '../src/types'),
      '@const': resolve(__dirname, '../src/constants'),
      '@constants': resolve(__dirname, '../src/constants'),
      '@forgedevstack/bear-x-charts': resolve(__dirname, '../packages/bear-x-charts/src/index.ts'),
      '@forgedevstack/bear-x-tree': resolve(__dirname, '../packages/bear-x-tree/src/index.ts'),
      '@forgedevstack/bear-x-ai': resolve(__dirname, '../packages/bear-x-ai/src/index.ts'),
      '@forgedevstack/bear-x-code': resolve(__dirname, '../packages/bear-x-code/src/index.ts'),
      '@forgedevstack/bear-map': resolve(__dirname, '../packages/bear-map/src/index.ts'),
      '@forgedevstack/kanban': resolve(__dirname, '../packages/kanban/src/index.ts'),
      vue: resolve(__dirname, './src/vue-stub.ts'),
    },
  },
  server: {
    port: 3030,
  },
});
