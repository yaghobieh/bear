import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '@/components/CodeBlock';
import { BearIcons } from '@forgedevstack/bear';

const HookCard: FC<{ name: string; description: string; path: string; isNew?: boolean }> = ({ name, description, path, isNew }) => (
  <Link
    to={path}
    className="group block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-all"
  >
    <div className="flex items-center justify-between mb-2">
      <code className="font-mono text-pink-600 dark:text-pink-400 group-hover:text-pink-500">{name}</code>
      {isNew && (
        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded">
          New
        </span>
      )}
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </Link>
);

const HooksPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hooks</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full">
          12 hooks
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Custom React hooks for common patterns, animations, and utilities.
      </p>

      {/* Utility Hooks */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BearIcons.SettingsIcon size={18} className="text-gray-400" />
          Utility Hooks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <HookCard name="useClipboard" description="Copy to clipboard with status" path="/hooks/use-clipboard" isNew />
          <HookCard name="useDebounce" description="Debounce values and callbacks" path="/hooks/use-debounce" isNew />
          <HookCard name="useThrottle" description="Throttle values and callbacks" path="/hooks/use-throttle" isNew />
          <HookCard name="useLocalStorage" description="Persist state in localStorage" path="/hooks/use-local-storage" isNew />
          <HookCard name="useKeyPress" description="Keyboard shortcuts with modifiers" path="/hooks/use-key-press" isNew />
          <HookCard name="useIntersectionObserver" description="Viewport detection" path="/hooks/use-intersection-observer" isNew />
        </div>
      </section>

      {/* Animation Hooks */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BearIcons.SparklesIcon size={18} className="text-gray-400" />
          Animation Hooks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <HookCard name="useSlide" description="Slide in/out animations" path="/hooks/use-slide" />
          <HookCard name="useParallax" description="Scroll-based parallax effect" path="/hooks/use-parallax" />
          <HookCard name="useBounce" description="Elastic bounce animation" path="/hooks/use-bounce" />
          <HookCard name="useFloat" description="Floating/hovering animation" path="/hooks/use-float" />
          <HookCard name="usePulse" description="Pulsing attention animation" path="/hooks/use-pulse" />
          <HookCard name="useShake" description="Shake/wiggle animation" path="/hooks/use-shake" />
        </div>
      </section>

      {/* Built-in Hooks */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BearIcons.CodeIcon size={18} className="text-gray-400" />
          Theme & Responsive
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-mono text-pink-600 dark:text-pink-400 text-sm mb-2">useMediaQuery</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Match CSS media queries with predefined breakpoints.</p>
            <CodeBlock
              code={`import { useMediaQuery, useIsMobile, useIsDesktop } from '@forgedevstack/bear';

const isLarge = useMediaQuery('(min-width: 1024px)');
const isMobile = useIsMobile();   // < 768px
const isDesktop = useIsDesktop(); // > 1024px`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-mono text-pink-600 dark:text-pink-400 text-sm mb-2">useDisclosure</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Manage open/close state for modals, drawers, etc.</p>
            <CodeBlock
              code={`import { useDisclosure } from '@forgedevstack/bear';

const { isOpen, open, close, toggle } = useDisclosure();

<Button onClick={open}>Open Modal</Button>
<Modal isOpen={isOpen} onClose={close}>...</Modal>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-mono text-pink-600 dark:text-pink-400 text-sm mb-2">useClickOutside</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Detect clicks outside an element.</p>
            <CodeBlock
              code={`import { useClickOutside } from '@forgedevstack/bear';

const ref = useRef<HTMLDivElement>(null);
useClickOutside(ref, () => setIsOpen(false));

<div ref={ref}>...</div>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Import Hooks</h3>
        <CodeBlock
          code={`// Import individual hooks
import { useClipboard, useDebounce, useKeyPress } from '@forgedevstack/bear';

// Animation hooks
import { useSlide, useBounce, useFloat } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>
    </div>
  );
};

export default HooksPage;
