import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const FlexPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Flex</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Flexbox layout component for flexible content arrangement.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Flex } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple flex container."
        code={`<Flex gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>`}
      >
        <div className="flex gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="px-4 py-2 bg-bear-500/20 rounded-lg text-gray-700 dark:text-gray-300">
              Item {i}
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Justify Content"
        description="Horizontal alignment options."
        code={`<Flex justify="start">Start</Flex>
<Flex justify="center">Center</Flex>
<Flex justify="end">End</Flex>
<Flex justify="between">Between</Flex>`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 mb-2">justify: start</p>
            <div className="flex justify-start gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {[1, 2, 3].map(i => <div key={i} className="w-12 h-8 bg-bear-500 rounded flex items-center justify-center text-white text-sm">{i}</div>)}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">justify: center</p>
            <div className="flex justify-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {[1, 2, 3].map(i => <div key={i} className="w-12 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-sm">{i}</div>)}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">justify: end</p>
            <div className="flex justify-end gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {[1, 2, 3].map(i => <div key={i} className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm">{i}</div>)}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">justify: between</p>
            <div className="flex justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {[1, 2, 3].map(i => <div key={i} className="w-12 h-8 bg-green-500 rounded flex items-center justify-center text-white text-sm">{i}</div>)}
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Align Items"
        description="Vertical alignment options."
        code={`<Flex align="start">Start</Flex>
<Flex align="center">Center</Flex>
<Flex align="end">End</Flex>
<Flex align="stretch">Stretch</Flex>`}
      >
        <div className="flex gap-4 justify-center">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">start</p>
            <div className="flex items-start gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded h-20">
              <div className="w-8 h-6 bg-bear-500 rounded" />
              <div className="w-8 h-10 bg-bear-500 rounded" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">center</p>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded h-20">
              <div className="w-8 h-6 bg-purple-500 rounded" />
              <div className="w-8 h-10 bg-purple-500 rounded" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">end</p>
            <div className="flex items-end gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded h-20">
              <div className="w-8 h-6 bg-blue-500 rounded" />
              <div className="w-8 h-10 bg-blue-500 rounded" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">stretch</p>
            <div className="flex items-stretch gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded h-20">
              <div className="w-8 bg-green-500 rounded" />
              <div className="w-8 bg-green-500 rounded" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Direction"
        description="Row or column layout."
        code={`<Flex direction="row">Horizontal</Flex>
<Flex direction="column">Vertical</Flex>`}
      >
        <div className="flex gap-8 justify-center">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">row (default)</p>
            <div className="flex flex-row gap-2">
              {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 bg-bear-500 rounded flex items-center justify-center text-white">{i}</div>)}
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">column</p>
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 bg-purple-500 rounded flex items-center justify-center text-white">{i}</div>)}
            </div>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">direction</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>row | column | row-reverse | column-reverse</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">row</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Flex direction</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">justify</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>start | center | end | between | around | evenly</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">start</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Justify content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">align</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>start | center | end | stretch | baseline</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">stretch</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Align items</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">gap</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">0</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Gap between items</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">wrap</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable flex wrap</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default FlexPage;

