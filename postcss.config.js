import postcssImport from 'postcss-import';
import { aerocraftPlugin } from '@forgedevstack/aerocraft/postcss';
import config from './aerocraft.config.js';

export default {
  plugins: [
    postcssImport(),
    aerocraftPlugin({
      ...config,
      darkSelector: '.dark, .bear-dark',
    }),
  ],
};
