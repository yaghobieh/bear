import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/react-vite';

const root = dirname(fileURLToPath(import.meta.url));
const portalSrc = resolve(root, '../src');

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(ts|tsx)'],
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
      vue: resolve(portalSrc, 'vue-stub.ts'),
    };
    if (options.configType === 'PRODUCTION') {
      viteConfig.base = '/storybook/';
    }
    return viteConfig;
  },
};

export default config;
