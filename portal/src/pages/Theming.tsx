import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';

const Theming: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Theming
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Customize Bear UI to match your brand with our flexible theming system.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          BearProvider
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The BearProvider component enables theming and provides context for all Bear components.
          It supports light/dark mode and custom theme overrides.
        </p>
        
        <CodeBlock
          code={`import { BearProvider } from '@forgedevstack/bear';

function App() {
  return (
    <BearProvider 
      defaultMode="system"
      storageKey="my-app-theme"
      theme={{
        colors: {
          primary: {
            500: '#ec4899',
            600: '#db2777',
          },
        },
      }}
    >
    </BearProvider>
  );
}`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Dark Mode
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Bear UI supports automatic dark mode detection and manual toggling.
        </p>
        
        <CodeBlock
          code={`import { useBearMode } from '@forgedevstack/bear';

function ThemeToggle() {
  const { mode, setMode, toggleMode } = useBearMode();

  return (
    <button onClick={toggleMode}>
      Current: {mode}
    </button>
  );
}`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Custom Theme
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Override default theme values to match your brand:
        </p>
        
        <CodeBlock
          code={`const customTheme = {
  colors: {
    primary: {
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
    },
    secondary: {
      // ... your secondary colors
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
};

<BearProvider theme={customTheme}>
</BearProvider>`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          CSS Variables
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Bear UI exposes CSS custom properties that you can override in your stylesheet:
        </p>
        
        <CodeBlock
          code={`:root {
  --bear-primary: #ec4899;
  --bear-primary-hover: #db2777;
  --bear-secondary: #6b7280;
  --bear-success: #22c55e;
  --bear-warning: #f59e0b;
  --bear-danger: #ef4444;
  
  --bear-radius-sm: 0.25rem;
  --bear-radius-md: 0.5rem;
  --bear-radius-lg: 1rem;
  
  --bear-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --bear-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --bear-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.dark {
  --bear-primary: #f472b6;
  /* ... dark mode overrides */
}`}
          language="css"
          title="globals.css"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          useBearTheme Hook
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Access and modify the current theme programmatically:
        </p>
        
        <CodeBlock
          code={`import { useBearTheme } from '@forgedevstack/bear';

function MyComponent() {
  const { theme, setTheme, updateTheme } = useBearTheme();

  const changePrimaryColor = () => {
    updateTheme({
      colors: {
        primary: {
          500: '#8b5cf6', // purple
        },
      },
    });
  };

  return (
    <button onClick={changePrimaryColor}>
      Change to Purple
    </button>
  );
}`}
          language="tsx"
        />
      </section>
    </div>
  );
};

export default Theming;

