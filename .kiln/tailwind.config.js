
/** @type {import('tailwindcss').Config} */
import parentConfig from '../tailwind.config.js';

export default {
  ...parentConfig,
  content: [
    '../src/**/*.{js,ts,jsx,tsx}',
    './main.tsx',
  ],
};
