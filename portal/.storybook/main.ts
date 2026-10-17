import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/react-vite';

const root = dirname(fileURLToPath(import.meta.url));
const portalSrc = resolve(root, '../src');

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  staticDirs: [resolve(root, 'public')],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
    },
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(viteConfig, options) {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias ?? {}),
      '@': portalSrc,
      '@utils': resolve(root, '../../src/utils'),
      '@hooks': resolve(root, '../../src/hooks'),
      '@context': resolve(root, '../../src/context'),
      '@types': resolve(root, '../../src/types'),
      '@const': resolve(root, '../../src/constants'),
      '@constants': resolve(root, '../../src/constants'),
      '@forgedevstack/bear-x-charts': resolve(root, '../../packages/bear-x-charts/src/index.ts'),
      '@forgedevstack/bear-x-tree': resolve(root, '../../packages/bear-x-tree/src/index.ts'),
      '@forgedevstack/bear-x-ai': resolve(root, '../../packages/bear-x-ai/src/index.ts'),
      '@forgedevstack/bear-x-code': resolve(root, '../../packages/bear-x-code/src/index.ts'),
      '@forgedevstack/bear-map': resolve(root, '../../packages/bear-map/src/index.ts'),
      '@forgedevstack/kanban': resolve(root, '../../packages/kanban/src/index.ts'),
      vue: resolve(portalSrc, 'vue-stub.ts'),
    };
    if (options.configType === 'PRODUCTION') {
      viteConfig.base = '/storybook/';
    }
    return viteConfig;
  },
};

export default config;
