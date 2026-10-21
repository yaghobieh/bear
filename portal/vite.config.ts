import { existsSync, statSync } from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { bearAskPlugin } from './server/bearAskPlugin';

const INK_SRC = resolve(__dirname, '../../ink/src');
const PORTAL_SRC = resolve(__dirname, './src');
const BEAR_SRC = resolve(__dirname, '../src');

const resolveFile = (base: string): string | null => {
  const candidates = [
    `${base}.ts`,
    `${base}.tsx`,
    resolve(base, 'index.ts'),
    resolve(base, 'index.tsx'),
    base,
  ];
  return candidates.find((file) => existsSync(file) && statSync(file).isFile()) ?? null;
};

const inkSpecifier = (source: string): string | null => {
  if (source === '@common-components') return resolveFile(resolve(INK_SRC, 'common-components'));
  if (source.startsWith('@common-components/')) return resolveFile(resolve(INK_SRC, 'common-components', source.slice('@common-components/'.length)));
  if (source === '@utils') return resolveFile(resolve(INK_SRC, 'utils'));
  if (source.startsWith('@utils/')) return resolveFile(resolve(INK_SRC, 'utils', source.slice('@utils/'.length)));
  if (source === '@const') return resolveFile(resolve(INK_SRC, 'constants'));
  if (source.startsWith('@const/')) return resolveFile(resolve(INK_SRC, 'constants', source.slice('@const/'.length)));
  if (source.startsWith('@/')) return resolveFile(resolve(INK_SRC, source.slice(2)));
  return null;
};

const inkAlias = (inkBase: string, replacedPrefix: string) =>
  function (this: { resolve: (id: string, importer: string | undefined, options: { skipSelf: boolean }) => Promise<unknown> }, updatedId: string, importer: string | undefined, resolveOptions: { skipSelf: boolean }) {
    if (importer?.includes('/ink/src/') && (updatedId === replacedPrefix || updatedId.startsWith(`${replacedPrefix}/`))) {
      const rest = updatedId.slice(replacedPrefix.length).replace(/^\//, '');
      const file = resolveFile(rest ? resolve(inkBase, rest) : inkBase);
      if (file) return file;
    }
    return this.resolve(updatedId, importer, { skipSelf: true, ...resolveOptions });
  };

export default defineConfig({
  resolve: {
    alias: [
      { find: '@utils', replacement: resolve(BEAR_SRC, 'utils'), customResolver: inkAlias(resolve(INK_SRC, 'utils'), resolve(BEAR_SRC, 'utils')) },
      { find: '@const', replacement: resolve(BEAR_SRC, 'constants'), customResolver: inkAlias(resolve(INK_SRC, 'constants'), resolve(BEAR_SRC, 'constants')) },
      { find: '@hooks', replacement: resolve(BEAR_SRC, 'hooks') },
      { find: '@context', replacement: resolve(BEAR_SRC, 'context') },
      { find: '@types', replacement: resolve(BEAR_SRC, 'types') },
      { find: '@constants', replacement: resolve(BEAR_SRC, 'constants') },
      { find: '@', replacement: PORTAL_SRC, customResolver: inkAlias(INK_SRC, PORTAL_SRC) },
      { find: '@forgedevstack/bear-x-charts', replacement: resolve(__dirname, '../packages/bear-x-charts/src/index.ts') },
      { find: '@forgedevstack/bear-x-ai', replacement: resolve(__dirname, '../packages/bear-x-ai/src/index.ts') },
      { find: '@forgedevstack/bear-x-code', replacement: resolve(__dirname, '../packages/bear-x-code/src/index.ts') },
      { find: '@forgedevstack/bear-map', replacement: resolve(__dirname, '../packages/bear-map/src/index.ts') },
      { find: '@forgedevstack/kanban', replacement: resolve(__dirname, '../packages/kanban/src/index.ts') },
      { find: 'vue', replacement: resolve(__dirname, './src/vue-stub.ts') },
    ],
  },
  plugins: [
    react(),
    bearAskPlugin(),
    {
      name: 'bear-source-entry',
      enforce: 'pre',
      resolveId(source, importer) {
        if (source === '@forgedevstack/bear') {
          return resolve(__dirname, '../src/index.ts');
        }
        if (source === '@forgedevstack/ink' && existsSync(resolve(INK_SRC, 'index.ts'))) {
          return resolve(INK_SRC, 'index.ts');
        }
        if (source === '@forgedevstack/ink/styles.css' && existsSync(resolve(__dirname, '../../ink/dist/styles.css'))) {
          return resolve(__dirname, '../../ink/dist/styles.css');
        }
        if (importer?.includes('/ink/src/')) {
          return inkSpecifier(source);
        }
        return null;
      },
    },
  ],
  server: {
    port: 3030,
  },
});
