import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const LinkPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Link</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Styled anchor component for navigation and external links.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Link } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Standard link styles."
        code={`<Link href="/about">About Us</Link>
<Link href="/docs">Documentation</Link>`}
      >
        <div className="flex gap-6 justify-center">
          <a href="#" className="text-bear-500 hover:text-bear-600 underline-offset-2 hover:underline">About Us</a>
          <a href="#" className="text-bear-500 hover:text-bear-600 underline-offset-2 hover:underline">Documentation</a>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Different link color variants."
        code={`<Link href="#" variant="primary">Primary Link</Link>
<Link href="#" variant="secondary">Secondary Link</Link>
<Link href="#" variant="neutral">Neutral Link</Link>`}
      >
        <div className="flex gap-6 justify-center flex-wrap">
          <a href="#" className="text-bear-500 hover:text-bear-600">Primary Link</a>
          <a href="#" className="text-blue-500 hover:text-blue-600">Secondary Link</a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">Neutral Link</a>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="External Links"
        description="Links with external icon indicator."
        code={`<Link href="https://github.com" external>
  GitHub
</Link>
<Link href="https://example.com" external newTab>
  Opens in new tab
</Link>`}
      >
        <div className="flex gap-6 justify-center flex-wrap">
          <a href="#" className="text-bear-500 hover:text-bear-600 inline-flex items-center gap-1">
            GitHub <span className="text-xs">↗</span>
          </a>
          <a href="#" className="text-bear-500 hover:text-bear-600 inline-flex items-center gap-1">
            Opens in new tab <span className="text-xs">↗</span>
          </a>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Underline Styles"
        description="Different underline behaviors."
        code={`<Link href="#" underline="always">Always underlined</Link>
<Link href="#" underline="hover">Underline on hover</Link>
<Link href="#" underline="none">Never underlined</Link>`}
      >
        <div className="flex gap-6 justify-center flex-wrap">
          <a href="#" className="text-bear-500 underline">Always underlined</a>
          <a href="#" className="text-bear-500 hover:underline">Underline on hover</a>
          <a href="#" className="text-bear-500">Never underlined</a>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">href</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Link destination</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | secondary | neutral</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">external</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show external icon</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">underline</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>always | hover | none</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">hover</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Underline behavior</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default LinkPage;

