import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const KbdPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Kbd</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Display keyboard keys and shortcuts with proper styling.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Kbd } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Single Keys"
        description="Display individual keyboard keys."
        code={`<Kbd>⌘</Kbd>
<Kbd>Shift</Kbd>
<Kbd>Enter</Kbd>`}
      >
        <div className="flex gap-2 flex-wrap items-center">
          <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">⌘</kbd>
          <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">Shift</kbd>
          <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">Enter</kbd>
          <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">Tab</kbd>
          <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">Esc</kbd>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Keyboard Shortcuts"
        description="Combine multiple keys for shortcuts."
        code={`<span>Save: <Kbd>⌘</Kbd> + <Kbd>S</Kbd></span>
<span>Copy: <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd></span>`}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span>Save:</span>
            <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">⌘</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">S</kbd>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span>Copy:</span>
            <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">C</kbd>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span>Search:</span>
            <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">⌘</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">K</kbd>
          </div>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Key label content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">className</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Additional CSS classes</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default KbdPage;

