import { FC, useState, useEffect, useRef } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { VirtualList, useLazyLoad } from '@forgedevstack/bear';

const ITEMS = Array.from({ length: 10000 }, (_, i) => ({ id: i, label: `Item ${i + 1}` }));

const PAGE_SIZE = 50;

const VirtualListPage: FC = () => {
  const [infiniteItems, setInfiniteItems] = useState(
    Array.from({ length: PAGE_SIZE }, (_, i) => ({ id: i, label: `Item ${i + 1}` }))
  );
  const { ref, isInView } = useLazyLoad<HTMLDivElement>({ once: false });
  const loadingRef = useRef(false);

  useEffect(() => {
    if (isInView && !loadingRef.current) {
      loadingRef.current = true;
      const timer = setTimeout(() => {
        setInfiniteItems((prev) => [
          ...prev,
          ...Array.from(
            { length: PAGE_SIZE },
            (_, i) => ({ id: prev.length + i, label: `Item ${prev.length + i + 1}` })
          ),
        ]);
        loadingRef.current = false;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
  <div className="fade-in">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">VirtualList</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-8">
      Virtualized list for large datasets. Renders only visible items for performance.
    </p>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
      <CodeBlock code={`import { VirtualList } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
    </section>

    <ComponentPreview
      title="Basic"
      description="10,000 items — only visible rows are rendered."
      code={`const items = Array.from({ length: 10000 }, (_, i) => ({ id: i, label: \`Item \${i + 1}\` }));

<VirtualList
  items={items}
  itemHeight={40}
  height={300}
  renderItem={(item) => <div className="py-2 px-4 border-b">{item.label}</div>}
  keyExtractor={(item) => item.id}
/>`}
    >
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <VirtualList
          items={ITEMS}
          itemHeight={40}
          height={300}
          renderItem={(item) => (
            <div className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100">
              {item.label}
            </div>
          )}
          keyExtractor={(item) => item.id}
        />
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="Infinite Scroll with useLazyLoad"
      description="Load more items when scrolling to bottom."
      code={`const [items, setItems] = useState(initialItems);
const { ref, isInView } = useLazyLoad({ once: false });

useEffect(() => {
  if (isInView) loadMore();
}, [isInView]);

return (
  <div>
    <VirtualList items={items} renderItem={...} />
    <div ref={ref}>Loading...</div>
  </div>
);`}
    >
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <VirtualList
          items={infiniteItems}
          itemHeight={40}
          height={250}
          renderItem={(item) => (
            <div className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100">
              {item.label}
            </div>
          )}
          keyExtractor={(item) => item.id}
        />
        <div ref={ref} className="py-4 px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          {infiniteItems.length} items — scroll to load more
        </div>
      </div>
    </ComponentPreview>
  </div>
);
};

export default VirtualListPage;
