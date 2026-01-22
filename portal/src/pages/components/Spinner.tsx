import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const SpinnerPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Spinner</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Loading indicator for async operations.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Spinner } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple loading spinner."
        code={`<Spinner />`}
      >
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-bear-500 border-t-transparent" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different spinner sizes."
        code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
      >
        <div className="flex items-center justify-center gap-8 py-4">
          {[
            { size: 'sm', px: 16 },
            { size: 'md', px: 24 },
            { size: 'lg', px: 32 },
            { size: 'xl', px: 48 },
          ].map(({ size, px }) => (
            <div key={size} className="text-center">
              <div
                className="animate-spin rounded-full border-2 border-bear-500 border-t-transparent mx-auto mb-2"
                style={{ width: px, height: px }}
              />
              <span className="text-xs text-gray-500">{size}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Different spinner colors."
        code={`<Spinner color="primary" />
<Spinner color="secondary" />
<Spinner color="success" />
<Spinner color="warning" />`}
      >
        <div className="flex items-center justify-center gap-8 py-4">
          {[
            { color: 'border-bear-500', label: 'primary' },
            { color: 'border-purple-500', label: 'secondary' },
            { color: 'border-green-500', label: 'success' },
            { color: 'border-amber-500', label: 'warning' },
            { color: 'border-red-500', label: 'error' },
          ].map(({ color, label }) => (
            <div key={label} className="text-center">
              <div className={`animate-spin rounded-full h-8 w-8 border-2 ${color} border-t-transparent mx-auto mb-2`} />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Spinner with loading text."
        code={`<Spinner label="Loading..." />
<Spinner label="Processing" labelPosition="right" />`}
      >
        <div className="flex items-center justify-center gap-8 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-bear-500 border-t-transparent" />
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-bear-500 border-t-transparent" />
            <span className="text-sm text-gray-500">Processing</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Different spinner styles."
        code={`<Spinner variant="border" />
<Spinner variant="dots" />
<Spinner variant="bars" />`}
      >
        <div className="flex items-center justify-center gap-12 py-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-bear-500 border-t-transparent mx-auto mb-2" />
            <span className="text-xs text-gray-500">border</span>
          </div>
          <div className="text-center">
            <div className="flex gap-1 mb-2">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 bg-bear-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">dots</span>
          </div>
          <div className="text-center">
            <div className="flex gap-1 items-end h-8 mb-2">
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className="w-1 bg-bear-500 rounded-full animate-pulse"
                  style={{
                    height: `${[60, 100, 40, 80][i]}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">bars</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Overlay"
        description="Full-page loading overlay."
        code={`<Spinner.Overlay visible={isLoading}>
  <PageContent />
</Spinner.Overlay>`}
      >
        <div className="relative h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-3 border-bear-500 border-t-transparent" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Loading content...</span>
            </div>
          </div>
          <div className="p-4 blur-sm">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg | xl</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Spinner size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | secondary | success | warning | error</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Spinner color</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>border | dots | bars</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">border</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Spinner style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Loading text</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SpinnerPage;
