import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const GridPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Grid</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        CSS Grid layout component for complex responsive layouts.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Grid, GridItem } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Grid"
        description="Simple grid with columns."
        code={`<Grid cols={3} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>`}
      >
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="p-4 bg-bear-500/20 rounded-lg text-center text-gray-700 dark:text-gray-300 font-medium">
              Item {i}
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Responsive Columns"
        description="Different columns at breakpoints."
        code={`<Grid cols={{ default: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
  ...
</Grid>`}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="p-3 bg-purple-500/20 rounded text-center text-sm text-gray-700 dark:text-gray-300">
                Item {i}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center">Resize browser to see responsive behavior</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Column Span"
        description="Items spanning multiple columns."
        code={`<Grid cols={4} gap={4}>
  <GridItem colSpan={2}>Spans 2 columns</GridItem>
  <GridItem>1 col</GridItem>
  <GridItem>1 col</GridItem>
</Grid>`}
      >
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-2 p-4 bg-bear-500/30 rounded-lg text-center text-gray-700 dark:text-gray-300 font-medium">
            Spans 2 columns
          </div>
          <div className="p-4 bg-bear-500/20 rounded-lg text-center text-gray-700 dark:text-gray-300">1</div>
          <div className="p-4 bg-bear-500/20 rounded-lg text-center text-gray-700 dark:text-gray-300">1</div>
          <div className="p-4 bg-bear-500/20 rounded-lg text-center text-gray-700 dark:text-gray-300">1</div>
          <div className="col-span-3 p-4 bg-green-500/30 rounded-lg text-center text-gray-700 dark:text-gray-300 font-medium">
            Spans 3 columns
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Gap Options"
        description="Different spacing between items."
        code={`<Grid gap={2}>Small gap</Grid>
<Grid gap={4}>Medium gap</Grid>
<Grid gap={8}>Large gap</Grid>`}
      >
        <div className="space-y-6">
          <div>
            <p className="text-xs text-gray-500 mb-2">gap-2 (8px)</p>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(i => <div key={i} className="p-2 bg-gray-200 dark:bg-gray-700 rounded text-center text-xs text-gray-600 dark:text-gray-400">{i}</div>)}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">gap-4 (16px)</p>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="p-2 bg-gray-200 dark:bg-gray-700 rounded text-center text-xs text-gray-600 dark:text-gray-400">{i}</div>)}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">gap-6 (24px)</p>
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => <div key={i} className="p-2 bg-gray-200 dark:bg-gray-700 rounded text-center text-xs text-gray-600 dark:text-gray-400">{i}</div>)}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">cols</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | ResponsiveValue</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">12</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Number of columns</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">gap</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">4</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Gap between items</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">rows</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">auto</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Number of rows</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default GridPage;

