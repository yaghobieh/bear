import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const DividerPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Divider</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A divider is a thin line that groups content in lists and layouts.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Divider } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple horizontal divider."
        code={`<Divider />`}
      >
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Content above</p>
          <hr className="border-gray-200 dark:border-gray-700" />
          <p className="text-gray-600 dark:text-gray-400 mt-4">Content below</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Text"
        description="Divider with centered text."
        code={`<Divider>OR</Divider>
<Divider textAlign="left">Section</Divider>
<Divider textAlign="right">End</Divider>`}
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center">
            <hr className="flex-1 border-gray-200 dark:border-gray-700" />
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-200 dark:border-gray-700" />
          </div>
          <div className="flex items-center">
            <span className="pr-4 text-gray-500 text-sm">Section</span>
            <hr className="flex-1 border-gray-200 dark:border-gray-700" />
          </div>
          <div className="flex items-center">
            <hr className="flex-1 border-gray-200 dark:border-gray-700" />
            <span className="pl-4 text-gray-500 text-sm">End</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Vertical"
        description="Vertical divider for inline content."
        code={`<Flex align="center" gap={4}>
  <span>Item 1</span>
  <Divider orientation="vertical" />
  <span>Item 2</span>
  <Divider orientation="vertical" />
  <span>Item 3</span>
</Flex>`}
      >
        <div className="flex items-center justify-center gap-4">
          <span className="text-gray-600 dark:text-gray-400">Item 1</span>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
          <span className="text-gray-600 dark:text-gray-400">Item 2</span>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
          <span className="text-gray-600 dark:text-gray-400">Item 3</span>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">orientation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>horizontal | vertical</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">horizontal</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Divider direction</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">textAlign</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>left | center | right</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">center</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text position</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text content</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DividerPage;

