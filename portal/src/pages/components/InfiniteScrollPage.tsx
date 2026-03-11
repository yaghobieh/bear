import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const InfiniteScrollPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">InfiniteScroll</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Auto-loading scroll wrapper that triggers a callback when the user scrolls near the bottom.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { InfiniteScroll } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Auto Load"
        description="Automatically loads more content when scrolling near the bottom."
        code={`<InfiniteScroll onLoadMore={loadMore} hasMore={hasMore} loading={loading}>
  {items.map(item => <Item key={item.id} {...item} />)}
</InfiniteScroll>`}
      >
        <div className="w-full max-h-48 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="p-4 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="py-2 px-3 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                Item {i}
              </div>
            ))}
          </div>
          <div className="p-4 flex justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-bear-500" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Manual Load"
        description="Requires user to click a button to load more."
        code={`<InfiniteScroll onLoadMore={loadMore} hasMore={hasMore} manual>
  {items.map(item => <Item key={item.id} {...item} />)}
</InfiniteScroll>`}
      >
        <div className="w-full max-h-48 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="p-4 space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-2 px-3 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                Item {i}
              </div>
            ))}
          </div>
          <div className="p-4">
            <button className="w-full py-2 px-4 rounded-md bg-bear-500 text-white text-sm font-medium hover:bg-bear-600 transition-colors">
              Load more
            </button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Loader"
        description="Custom loading indicator."
        code={`<InfiniteScroll loader={<CustomSpinner />} ...>
  {items.map(item => <Item key={item.id} {...item} />)}
</InfiniteScroll>`}
      >
        <div className="w-full max-h-48 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="p-4 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="py-2 px-3 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                Item {i}
              </div>
            ))}
          </div>
          <div className="p-4 flex justify-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-bear-500 animate-bounce delay-0" />
            <span className="inline-block h-2 w-2 rounded-full bg-bear-500 animate-bounce delay-150" />
            <span className="inline-block h-2 w-2 rounded-full bg-bear-500 animate-bounce delay-300" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Inverse (Chat)"
        description="Scroll from bottom for chat-style layouts."
        code={`<InfiniteScroll onLoadMore={loadOlder} hasMore={hasMore} inverse>
  {messages.map(msg => <Message key={msg.id} {...msg} />)}
</InfiniteScroll>`}
      >
        <div className="w-full max-h-48 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col-reverse">
          <div className="p-4 space-y-2">
            {[3, 2, 1].map((i) => (
              <div key={i} className="py-2 px-3 rounded bg-bear-100 dark:bg-bear-900/30 text-gray-900 dark:text-white text-sm ml-8">
                Message {i}
              </div>
            ))}
          </div>
          <div className="p-2 flex justify-center border-b border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400">Loading older messages...</span>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">onLoadMore</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when more content should load</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">hasMore</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Whether more content is available</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">loading</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Whether content is currently loading</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">threshold</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Distance from bottom to trigger load (px)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">manual</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Require button click to load</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">loader</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom loading indicator</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">endMessage</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Message when no more content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">loadMoreLabel</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label for manual load button</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">inverse</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Inverse scroll (chat-style, load from top)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default InfiniteScrollPage;
