import { FC } from 'react';
import { Typography, Card, CardBody, CodeBlock } from '@forgedevstack/bear';

const DarkMode: FC = () => {
  return (
    <div className="fade-in">
      <Typography variant="h1" className="mb-4">
        Dark Mode
      </Typography>
      <Typography variant="body1" color="secondary" className="mb-8">
        Bear supports light and dark mode via BearProvider. Use the useBear hook for toggleMode, setMode, and the dark: prefix for responsive styles.
      </Typography>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          useBear Hook
        </Typography>
        <CodeBlock
          code={`import { useBear } from '@forgedevstack/bear';

function ThemeToggle() {
  const { mode, setMode, toggleMode } = useBear();

  return (
    <div>
      <p>Current mode: {mode}</p>
      <button onClick={toggleMode}>Toggle</button>
      <button onClick={() => setMode('dark')}>Dark</button>
      <button onClick={() => setMode('light')}>Light</button>
    </div>
  );
}`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          useBearMode
        </Typography>
        <Typography variant="body2" className="mb-4">
          For mode-only access, use useBearMode() which returns {`{ mode, setMode, toggleMode }`}.
        </Typography>
        <CodeBlock
          code={`import { useBearMode } from '@forgedevstack/bear';

const { mode, toggleMode } = useBearMode();`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          dark: Prefix
        </Typography>
        <CodeBlock
          code={`/* Tailwind dark: variants work when BearProvider adds .dark to html */
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>

/* Bear adds bear-light / bear-dark to document root */
.bear-dark .my-component {
  background: var(--bear-bg-primary);
}`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          BearProvider
        </Typography>
        <CodeBlock
          code={`<BearProvider
  defaultMode="dark"
  persistPreference={true}
  storageKey="bear-theme-mode"
>
  <App />
</BearProvider>`}
          language="tsx"
        />
        <Typography variant="body2" className="mt-4">
          BearProvider adds the .dark class to document.documentElement when mode is dark, respects system preference on first load if no stored value, and persists the choice to localStorage.
        </Typography>
      </section>
    </div>
  );
};

export default DarkMode;
