import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { useKeyPress, Card, Kbd } from '@forgedevstack/bear';

const UseKeyPressPage: FC = () => {
  const [lastKey, setLastKey] = useState<string>('');
  const [escapeCount, setEscapeCount] = useState(0);
  const [cmdKPressed, setCmdKPressed] = useState(false);

  useKeyPress('Escape', () => {
    setEscapeCount((c) => c + 1);
  });

  useKeyPress(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'], (e) => {
    setLastKey(e.key);
  });

  useKeyPress('k', () => {
    setCmdKPressed(true);
    setTimeout(() => setCmdKPressed(false), 500);
  }, { metaKey: true, preventDefault: true });

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">useKeyPress</h1>
        <LinesOfCode lines={95} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Detect keyboard shortcuts with support for modifier keys (⌘, Ctrl, Shift, Alt).
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { useKeyPress } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Keyboard Shortcuts"
        description="Try pressing different keys and key combinations."
        code={`// Single key
useKeyPress('Escape', () => closeModal());

// Multiple keys
useKeyPress(['ArrowUp', 'ArrowDown'], (e) => handleArrow(e));

// With modifiers
useKeyPress('k', () => openSearch(), { metaKey: true });`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-2">Press <Kbd>Escape</Kbd></p>
            <p className="text-3xl font-bold text-pink-600">{escapeCount}</p>
            <p className="text-xs text-gray-400">times pressed</p>
          </Card>

          <Card className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-2">Press Arrow Keys</p>
            <p className="text-3xl font-bold text-pink-600">{lastKey || '...'}</p>
            <p className="text-xs text-gray-400">last arrow key</p>
          </Card>

          <Card className={`p-4 text-center transition-colors ${cmdKPressed ? 'bg-pink-50 dark:bg-pink-900/20' : ''}`}>
            <p className="text-sm text-gray-500 mb-2">Press <Kbd>⌘K</Kbd></p>
            <p className={`text-3xl font-bold ${cmdKPressed ? 'text-pink-600' : 'text-gray-400'}`}>
              {cmdKPressed ? 'Triggered!' : 'Ready'}
            </p>
            <p className="text-xs text-gray-400">command palette</p>
          </Card>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API</h2>
        <CodeBlock
          code={`function useKeyPress(
  key: string | string[] | ((event: KeyboardEvent) => boolean),
  callback: (event: KeyboardEvent) => void,
  options?: {
    target?: HTMLElement | null;
    event?: 'keydown' | 'keyup' | 'keypress';
    preventDefault?: boolean;
    stopPropagation?: boolean;
    metaKey?: boolean;   // Require ⌘ (Mac) or Ctrl (Windows)
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
  }
): void;`}
          language="typescript"
        />
      </section>
    </div>
  );
};

export default UseKeyPressPage;

