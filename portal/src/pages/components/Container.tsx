import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ContainerPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Container</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Responsive wrapper for centering and constraining content width.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Container } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Centered container with max-width."
        code={`<Container>
  <p>Content is centered with responsive padding.</p>
</Container>`}
      >
        <div className="bg-gray-100 dark:bg-gray-800 py-4 -mx-6">
          <div className="max-w-3xl mx-auto px-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-center">Content is centered with responsive padding.</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different max-width options."
        code={`<Container size="sm">Max 640px</Container>
<Container size="md">Max 768px</Container>
<Container size="lg">Max 1024px</Container>
<Container size="xl">Max 1280px</Container>
<Container size="full">Full width</Container>`}
      >
        <div className="space-y-3">
          {[
            { size: 'sm', width: '640px', color: 'bg-bear-500' },
            { size: 'md', width: '768px', color: 'bg-purple-500' },
            { size: 'lg', width: '1024px', color: 'bg-blue-500' },
            { size: 'xl', width: '1280px', color: 'bg-green-500' },
          ].map(item => (
            <div key={item.size} className="flex items-center gap-3">
              <span className="text-sm text-gray-500 w-8">{item.size}</span>
              <div className={`h-4 ${item.color} rounded`} style={{ width: `${parseInt(item.width) / 15}px` }} />
              <span className="text-xs text-gray-400">{item.width}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Padding"
        description="Built-in responsive padding options."
        code={`<Container padding="none">No padding</Container>
<Container padding="sm">Small padding</Container>
<Container padding="md">Medium padding</Container>
<Container padding="lg">Large padding</Container>`}
      >
        <div className="space-y-3">
          <div className="bg-bear-500/20 p-0 rounded"><div className="bg-bear-500/30 p-2 text-sm text-center text-gray-700 dark:text-gray-300">padding: none (0)</div></div>
          <div className="bg-bear-500/20 p-2 rounded"><div className="bg-bear-500/30 p-2 text-sm text-center text-gray-700 dark:text-gray-300">padding: sm (8px)</div></div>
          <div className="bg-bear-500/20 p-4 rounded"><div className="bg-bear-500/30 p-2 text-sm text-center text-gray-700 dark:text-gray-300">padding: md (16px)</div></div>
          <div className="bg-bear-500/20 p-6 rounded"><div className="bg-bear-500/30 p-2 text-sm text-center text-gray-700 dark:text-gray-300">padding: lg (24px)</div></div>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg | xl | full</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">lg</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Max width</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">padding</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>none | sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Horizontal padding</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">center</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Center container</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ContainerPage;

