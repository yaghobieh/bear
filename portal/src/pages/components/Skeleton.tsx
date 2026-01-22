import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const SkeletonPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Skeleton</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Loading placeholder component for content that is being fetched.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Skeleton, SkeletonAvatar, SkeletonText, SkeletonCard } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Variants"
        description="Different skeleton shapes for various content types."
        code={`<Skeleton variant="text" width={200} />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width="100%" height={120} />
<Skeleton variant="rounded" width="100%" height={60} />`}
      >
        <div className="space-y-4 w-full">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Text Lines"
        description="Multiple skeleton lines for text content."
        code={`<Skeleton variant="text" count={3} />`}
      >
        <div className="space-y-2 w-full">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Card Skeleton"
        description="Pre-built skeleton for card layouts."
        code={`<SkeletonCard />`}
      >
        <div className="p-4 space-y-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 w-full max-w-sm">
          <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-3 w-2/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>text | circular | rectangular | rounded</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">text</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Shape of the skeleton</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">animation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>pulse | wave | none</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">pulse</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Animation type</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">width</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">100%</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Width of skeleton</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">height</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">auto</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Height of skeleton</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">count</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">1</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Number of lines (text variant)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SkeletonPage;

