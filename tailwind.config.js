/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  prefix: 'bear-',
  theme: {
    extend: {
      colors: {
        ember: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        bear: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        forge: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        bear: '0.625rem',
      },
      boxShadow: {
        bear: '0 4px 14px 0 rgba(217, 119, 6, 0.15)',
        'bear-lg': '0 10px 40px 0 rgba(217, 119, 6, 0.2)',
      },
      animation: {
        'bear-pulse': 'bear-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bear-glow': 'bear-glow 2s ease-in-out infinite',
        'bear-spin': 'spin 1s linear infinite',
        'bear-bounce': 'bounce 1s infinite',
      },
      keyframes: {
        'bear-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'bear-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(217, 119, 6, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(217, 119, 6, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};

