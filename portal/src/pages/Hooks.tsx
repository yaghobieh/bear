import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const HooksPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Hooks</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Bear provides several custom hooks for common UI patterns and theme management.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Theme Hooks</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-mono text-bear-600 text-lg mb-2">useBear</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Access full Bear context including theme, mode, and utilities.</p>
            <CodeBlock
              code={`import { useBear } from '@forgedevstack/bear';

const { theme, mode, toggleMode, setMode } = useBear();`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-mono text-bear-600 text-lg mb-2">useBearTheme</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Get the current theme object.</p>
            <CodeBlock
              code={`import { useBearTheme } from '@forgedevstack/bear';

const theme = useBearTheme();
// theme.colors.primary, theme.fonts.body, etc.`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-mono text-bear-600 text-lg mb-2">useBearMode</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Manage light/dark mode.</p>
            <CodeBlock
              code={`import { useBearMode } from '@forgedevstack/bear';

const { mode, toggleMode, setMode } = useBearMode();

// Toggle between light and dark
toggleMode();

// Set specific mode
setMode('dark');`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Responsive Hooks</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-mono text-bear-600 text-lg mb-2">useMediaQuery</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Match CSS media queries.</p>
            <CodeBlock
              code={`import { useMediaQuery } from '@forgedevstack/bear';

const isLarge = useMediaQuery('(min-width: 1024px)');
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-mono text-bear-600 text-lg mb-2">useIsMobile / useIsTablet / useIsDesktop</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Convenience hooks for common breakpoints.</p>
            <CodeBlock
              code={`import { useIsMobile, useIsTablet, useIsDesktop } from '@forgedevstack/bear';

const isMobile = useIsMobile();   // < 768px
const isTablet = useIsTablet();   // 768px - 1024px
const isDesktop = useIsDesktop(); // > 1024px`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Utility Hooks</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-mono text-bear-600 text-lg mb-2">useDisclosure</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Manage open/close state for modals, drawers, etc.</p>
            <CodeBlock
              code={`import { useDisclosure } from '@forgedevstack/bear';

const { isOpen, open, close, toggle } = useDisclosure();

// Use with Modal
<Button onClick={open}>Open Modal</Button>
<Modal isOpen={isOpen} onClose={close}>...</Modal>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-mono text-bear-600 text-lg mb-2">useClickOutside</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Detect clicks outside an element.</p>
            <CodeBlock
              code={`import { useClickOutside } from '@forgedevstack/bear';

const ref = useRef<HTMLDivElement>(null);
useClickOutside(ref, () => {
  console.log('Clicked outside!');
  setIsOpen(false);
});

<div ref={ref}>...</div>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-mono text-bear-600 text-lg mb-2">useDebounce</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Debounce a value for search/input.</p>
            <CodeBlock
              code={`import { useDebounce } from '@forgedevstack/bear';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);

useEffect(() => {
  // Only runs after 300ms of no changes
  fetchResults(debouncedSearch);
}, [debouncedSearch]);`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HooksPage;

