import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ScrollAreaPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">ScrollArea</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Custom scrollable area with styled scrollbars.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { ScrollArea } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Vertical Scroll"
        description="Scrollable content area with custom scrollbar."
        code={`<ScrollArea className="h-64">
  {items.map(item => <div key={item}>{item}</div>)}
</ScrollArea>`}
      >
        <div className="h-48 w-full max-w-sm overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <span className="text-gray-700 dark:text-gray-300">Item {i + 1}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Horizontal Scroll"
        description="Horizontal scrolling for wide content."
        code={`<ScrollArea orientation="horizontal">
  <div className="flex gap-4">...</div>
</ScrollArea>`}
      >
        <div className="w-full overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex gap-4">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="flex-shrink-0 w-32 h-24 bg-gradient-to-br from-bear-400 to-bear-600 rounded-lg flex items-center justify-center text-white font-medium">
                Card {i + 1}
              </div>
            ))}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Scrollable content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">orientation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>vertical | horizontal | both</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">vertical</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Scroll direction</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">className</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Additional CSS classes</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ScrollAreaPage;

