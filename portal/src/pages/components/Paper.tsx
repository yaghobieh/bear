import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const PaperPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Paper</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Paper is an elevated surface for content with different shadow depths.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Paper } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Elevation"
        description="Different elevation levels."
        code={`<Paper elevation={0}>Elevation 0</Paper>
<Paper elevation={1}>Elevation 1</Paper>
<Paper elevation={2}>Elevation 2</Paper>
<Paper elevation={3}>Elevation 3</Paper>
<Paper elevation={4}>Elevation 4</Paper>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300">Elevation 0</div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-gray-700 dark:text-gray-300">Elevation 1</div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-700 dark:text-gray-300">Elevation 2</div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-gray-700 dark:text-gray-300">Elevation 3</div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl text-gray-700 dark:text-gray-300">Elevation 4</div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Outlined and elevation variants."
        code={`<Paper variant="elevation">Elevation (default)</Paper>
<Paper variant="outlined">Outlined</Paper>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-700 dark:text-gray-300">Elevation (default)</div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Outlined</div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Rounded Corners"
        description="Different border radius options."
        code={`<Paper rounded="none">No rounding</Paper>
<Paper rounded="sm">Small</Paper>
<Paper rounded="md">Medium</Paper>
<Paper rounded="lg">Large</Paper>
<Paper rounded="full">Full</Paper>`}
      >
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <div className="p-4 bg-white dark:bg-gray-800 shadow text-gray-700 dark:text-gray-300">None</div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-sm shadow text-gray-700 dark:text-gray-300">Small</div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow text-gray-700 dark:text-gray-300">Medium</div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-700 dark:text-gray-300">Large</div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow text-gray-700 dark:text-gray-300">XL</div>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">elevation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>0 | 1 | 2 | 3 | 4</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">1</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Shadow depth</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>elevation | outlined</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">elevation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">rounded</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>none | sm | md | lg | xl</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Border radius</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PaperPage;

