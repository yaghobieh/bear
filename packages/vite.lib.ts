import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const BEAR_ICON_PACKAGE = '@forgedevstack/bear-icons';

export const defineBearPackage = (metaUrl: string) => {
  const packageDir = dirname(fileURLToPath(metaUrl));
  const bearSrc = resolve(packageDir, '../../src');

  return defineConfig({
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        rollupTypes: true,
        tsconfigPath: resolve(packageDir, 'tsconfig.json'),
      }),
    ],
    resolve: {
      alias: {
        '@utils': resolve(bearSrc, 'utils'),
        '@hooks': resolve(bearSrc, 'hooks'),
        '@context': resolve(bearSrc, 'context'),
        '@types': resolve(bearSrc, 'types'),
        '@const': resolve(bearSrc, 'constants'),
        '@constants': resolve(bearSrc, 'constants'),
      },
    },
    build: {
      emptyOutDir: true,
      lib: {
        entry: resolve(packageDir, 'src/index.ts'),
        formats: ['es', 'cjs'],
        fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          '@forgedevstack/anvil',
          BEAR_ICON_PACKAGE,
          /^@forgedevstack\/bear-icons\//,
        ],
      },
    },
  });
};
