import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const PaginationPage: FC = () => {
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(5);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pagination</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Navigate through pages of content with accessible pagination controls.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Pagination } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple pagination with page navigation."
        code={`<Pagination count={10} page={1} onChange={(page) => setPage(page)} />`}
      >
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="h-10 w-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            ‹
          </button>
          {[1, 2, 3, '...', 8, 9, 10].map((p, i) => (
            <button
              key={i}
              onClick={() => typeof p === 'number' && setPage(p)}
              className={`h-10 w-10 rounded-full flex items-center justify-center text-sm ${
                p === page 
                  ? 'bg-bear-500 text-white' 
                  : typeof p === 'number' 
                    ? 'hover:bg-gray-100 text-gray-700' 
                    : 'text-gray-400'
              }`}
            >
              {p}
            </button>
          ))}
          <button 
            onClick={() => setPage(p => Math.min(10, p + 1))}
            disabled={page === 10}
            className="h-10 w-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            ›
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500">Current page: {page}</p>
      </ComponentPreview>

      <ComponentPreview
        title="With First/Last"
        description="Include first and last page buttons."
        code={`<Pagination count={20} showFirstLast />`}
      >
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setPage2(1)}
            className="h-10 w-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            «
          </button>
          <button 
            onClick={() => setPage2(p => Math.max(1, p - 1))}
            className="h-10 w-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            ‹
          </button>
          {[page2 - 1, page2, page2 + 1].filter(p => p >= 1 && p <= 20).map((p) => (
            <button
              key={p}
              onClick={() => setPage2(p)}
              className={`h-10 w-10 rounded-full flex items-center justify-center text-sm ${
                p === page2 ? 'bg-bear-500 text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {p}
            </button>
          ))}
          <button 
            onClick={() => setPage2(p => Math.min(20, p + 1))}
            className="h-10 w-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            ›
          </button>
          <button 
            onClick={() => setPage2(20)}
            className="h-10 w-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            »
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500">Current page: {page2} of 20</p>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">count</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Total number of pages (required)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">page</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">1</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Current page (1-indexed)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(page: number) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when page changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>text | outlined | contained</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">text</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Button style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">shape</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>circular | rounded</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">circular</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Button shape</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showFirstLast</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show first/last page buttons</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showPrevNext</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show previous/next buttons</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PaginationPage;

