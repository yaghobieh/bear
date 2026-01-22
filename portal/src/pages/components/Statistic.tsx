import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const StatisticPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Statistic</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Display key metrics and statistics with optional trends.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Statistic } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple statistic display."
        code={`<Statistic label="Total Users" value="1,234" />`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">1,234</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">$45,678</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Orders</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">892</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Conversion</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">3.2%</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Trends"
        description="Show change direction with trend indicators."
        code={`<Statistic label="Revenue" value="$45,678" trend="+12.5%" trendColor="success" />`}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">$45,678</p>
            <p className="flex items-center gap-1 text-sm text-green-500 mt-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>
              +12.5%
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Users</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">8,234</p>
            <p className="flex items-center gap-1 text-sm text-green-500 mt-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>
              +5.2%
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Bounce Rate</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">24.5%</p>
            <p className="flex items-center gap-1 text-sm text-red-500 mt-1">
              <svg className="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>
              +3.1%
            </p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icon"
        description="Include an icon for context."
        code={`<Statistic label="Downloads" value="12,345" icon={<DownloadIcon />} />`}
      >
        <div className="grid grid-cols-2 gap-6 max-w-md">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-start gap-4">
            <div className="p-3 bg-bear-100 dark:bg-bear-900 rounded-lg">
              <svg className="w-6 h-6 text-bear-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Downloads</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12,345</p>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Page Views</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">89,234</p>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Statistic label</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string | number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Statistic value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Optional icon</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">trend</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Trend text (e.g. +12.5%)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">trendColor</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>success | error | neutral</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">neutral</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Trend color</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StatisticPage;

