import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { Button, Alert } from '@forgedevstack/bear';

const Theming: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Theming
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Customize Bear UI to match your brand with our flexible theming system.
        Change colors with a simple string or full control with color scales.
      </p>

      {/* Quick Start */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          🚀 Quick Start - Simple Color String
        </h2>
        <Alert severity="success" className="mb-4">
          <strong>New in v1.0.9!</strong> Just pass a color string and Bear auto-generates the full color scale!
        </Alert>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The easiest way to customize Bear - just pass a hex color or named color:
        </p>
        
        <CodeBlock
          code={`import { BearProvider } from '@forgedevstack/bear';

function App() {
  return (
    // Just pass a color string - Bear generates 50-950 shades automatically!
    <BearProvider theme={{ colors: { primary: '#3b82f6' } }}>
      <YourApp />
    </BearProvider>
  );
}

// Named colors work too!
<BearProvider theme={{ colors: { primary: 'blue' } }}>
<BearProvider theme={{ colors: { primary: 'purple' } }}>
<BearProvider theme={{ colors: { primary: 'red' } }}>`}
          language="tsx"
        />
        
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Supported Named Colors:</p>
          <div className="flex flex-wrap gap-2">
            {['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'teal', 'indigo', 'violet', 'rose', 'amber', 'lime', 'emerald', 'sky'].map(color => (
              <span key={color} className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs font-mono">
                {color}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Variants */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          🎨 Custom Variants
        </h2>
        <Alert severity="info" className="mb-4">
          Create your own button variants with custom colors!
        </Alert>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Define custom variants once in BearProvider, use them anywhere:
        </p>
        
        <CodeBlock
          code={`<BearProvider
  customVariants={{
    brand: { bg: '#ec4899', bgHover: '#db2777', text: '#ffffff' },
    ocean: { bg: '#0ea5e9', bgHover: '#0284c7', text: '#ffffff' },
    forest: { bg: '#22c55e', bgHover: '#16a34a', text: '#ffffff' },
    sunset: { bg: '#f97316', bgHover: '#ea580c', text: '#ffffff' },
  }}
>
  {/* Use anywhere in your app! */}
  <Button variant="brand">Brand</Button>
  <Button variant="ocean">Ocean</Button>
  <Button variant="forest">Forest</Button>
  <Button variant="sunset">Sunset</Button>
</BearProvider>`}
          language="tsx"
        />
        
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="brand">Brand</Button>
          <Button variant="ocean">Ocean</Button>
          <Button variant="forest">Forest</Button>
          <Button variant="sunset">Sunset</Button>
        </div>
      </section>

      {/* Add Variants at Runtime */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          ⚡ Dynamic Variants with useBearVariants
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Add, check, and get variants programmatically:
        </p>
        
        <CodeBlock
          code={`import { useBearVariants } from '@forgedevstack/bear';

function MyComponent() {
  const { addVariant, hasVariant, getVariant, customVariants } = useBearVariants();

  // Add a new variant at runtime
  const createNewVariant = () => {
    addVariant('hotPink', { 
      bg: '#ec4899', 
      bgHover: '#db2777', 
      text: '#ffffff' 
    });
  };

  // Check if variant exists
  if (hasVariant('hotPink')) {
    console.log('hotPink is available!');
  }

  // Get variant config
  const config = getVariant('brand');
  console.log(config?.bg); // '#ec4899'

  return <Button variant="hotPink">Dynamic Variant</Button>;
}`}
          language="tsx"
        />
      </section>

      {/* BearProvider Full API */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          BearProvider
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The BearProvider component enables theming and provides context for all Bear components.
        </p>
        
        <CodeBlock
          code={`import { BearProvider } from '@forgedevstack/bear';

<BearProvider 
  // Light/dark mode
  defaultMode="light" // 'light' | 'dark'
  
  // Simple color override
  theme={{ colors: { primary: '#3b82f6' } }}
  
  // Or full color scale
  theme={{
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        // ... 200-900
        950: '#172554',
      },
    },
  }}
  
  // Custom button variants
  customVariants={{
    brand: { bg: '#ec4899', bgHover: '#db2777', text: '#fff' },
  }}
  
  // Persist theme preference
  persistPreference={true}
  storageKey="my-app-theme"
/>`}
          language="tsx"
        />
      </section>

      {/* Dark Mode */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          🌙 Dark Mode
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Bear UI supports automatic dark mode detection and manual toggling.
        </p>
        
        <CodeBlock
          code={`import { useBearMode } from '@forgedevstack/bear';

function ThemeToggle() {
  const { mode, setMode, toggleMode } = useBearMode();

  return (
    <div>
      <p>Current mode: {mode}</p>
      <button onClick={toggleMode}>Toggle</button>
      <button onClick={() => setMode('dark')}>Force Dark</button>
      <button onClick={() => setMode('light')}>Force Light</button>
    </div>
  );
}`}
          language="tsx"
        />
      </section>

      {/* Full Theme Override */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          📋 Full Theme Override
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          For complete control, provide a full theme object:
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
      500: '#ec4899', // Main color
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724',
    },
    secondary: { /* ... */ },
    success: { /* ... */ },
    warning: { /* ... */ },
    danger: { /* ... */ },
    info: { /* ... */ },
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
};

<BearProvider theme={customTheme}>
  <App />
</BearProvider>`}
          language="tsx"
        />
      </section>

      {/* CSS Variables */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          🎯 CSS Variables
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Bear UI exposes CSS custom properties. BearProvider automatically sets these,
          but you can also override them in CSS:
        </p>
        
        <CodeBlock
          code={`:root {
  /* Primary color scale (50-950) */
  --bear-primary-50: #fdf2f8;
  --bear-primary-500: #ec4899;
  --bear-primary-600: #db2777;
  
  /* Other semantic colors */
  --bear-success-500: #22c55e;
  --bear-warning-500: #f59e0b;
  --bear-danger-500: #ef4444;
  --bear-info-500: #3b82f6;
  
  /* Background colors */
  --bear-bg-primary: #ffffff;
  --bear-bg-secondary: #f9fafb;
  
  /* Text colors */
  --bear-text-primary: #111827;
  --bear-text-secondary: #4b5563;
  
  /* Button variant overrides */
  --bear-btn-primary-bg: var(--bear-primary-500);
  --bear-btn-primary-bg-hover: var(--bear-primary-600);
}

.dark {
  --bear-bg-primary: #09090b;
  --bear-text-primary: #fafafa;
}`}
          language="css"
          title="globals.css"
        />
      </section>

      {/* useBear Hook */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          🪝 useBear Hook
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Access the full theme context programmatically:
        </p>
        
        <CodeBlock
          code={`import { useBear } from '@forgedevstack/bear';

function MyComponent() {
  const { 
    theme,           // Current theme object
    mode,            // 'light' | 'dark'
    setMode,         // Set mode directly
    toggleMode,      // Toggle between light/dark
    updateTheme,     // Update theme overrides
    customVariants,  // Custom variants map
    hasVariant,      // Check if variant exists
    getVariant,      // Get variant config
    addVariant,      // Add variant at runtime
  } = useBear();

  // Access theme values
  console.log(theme.colors.primary[500]); // '#ec4899'
  
  // Update theme at runtime
  updateTheme({
    colors: { primary: '#8b5cf6' }
  });

  return <div style={{ color: theme.colors.primary[500] }}>Themed!</div>;
}`}
          language="tsx"
        />
      </section>
    </div>
  );
};

export default Theming;
