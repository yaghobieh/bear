import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';

const TypeScriptPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">TypeScript</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Bear is built with TypeScript and provides full type definitions out of the box.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Type Imports</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Import component types directly from Bear:
        </p>
        <CodeBlock
          code={`import type { 
  ButtonProps,
  CardProps,
  ModalProps,
  InputProps,
  SelectProps,
  BearTheme,
  BearMode,
} from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Theme Types</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Customize themes with full type safety:
        </p>
        <CodeBlock
          code={`import type { BearTheme } from '@forgedevstack/bear';

const customTheme: Partial<BearTheme> = {
  colors: {
    primary: '#ec4899',
    secondary: '#8b5cf6',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
};`}
          language="tsx"
          showLineNumbers
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Component Props</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Extend component props for custom wrappers:
        </p>
        <CodeBlock
          code={`import { Button, ButtonProps } from '@forgedevstack/bear';
import { FC } from 'react';

interface MyButtonProps extends ButtonProps {
  trackingId?: string;
}

const MyButton: FC<MyButtonProps> = ({ trackingId, onClick, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (trackingId) {
      analytics.track(trackingId);
    }
    onClick?.(e);
  };

  return <Button {...props} onClick={handleClick} />;
};`}
          language="tsx"
          showLineNumbers
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Hook Types</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Typed hooks for theme and utilities:
        </p>
        <CodeBlock
          code={`import { useBear, useBearTheme, useBearMode } from '@forgedevstack/bear';

// Full context with theme, mode, and utilities
const { theme, mode, toggleMode, setMode } = useBear();

// Theme object only
const theme = useBearTheme(); // BearTheme

// Mode only with toggle
const { mode, toggleMode, setMode } = useBearMode();
// mode: 'light' | 'dark'
// toggleMode: () => void
// setMode: (mode: BearMode) => void`}
          language="tsx"
          showLineNumbers
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Utility Types</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Common types exported by Bear:
        </p>
        <CodeBlock
          code={`import type {
  BearSize,        // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  BearVariant,     // 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline'
  BearMode,        // 'light' | 'dark'
  BearPosition,    // 'top' | 'bottom' | 'left' | 'right'
  BearOrientation, // 'horizontal' | 'vertical'
} from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers
        />
      </section>
    </div>
  );
};

export default TypeScriptPage;

