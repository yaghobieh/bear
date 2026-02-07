import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { useLazyLoad, Card, Skeleton } from '@forgedevstack/bear';

const UseLazyLoadPage: FC = () => {
  const { ref, hasBeenViewed, isInView } = useLazyLoad<HTMLDivElement>();

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">useLazyLoad</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Lazy load content when it enters the viewport. Ideal for infinite scroll, lazy images, or deferring heavy renders.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { useLazyLoad } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Lazy Load Content"
        description="Content loads only when scrolled into view."
        code={`const { ref, hasBeenViewed } = useLazyLoad();

return (
  <div ref={ref}>
    {hasBeenViewed ? (
      <HeavyComponent />
    ) : (
      <Skeleton className="h-24" />
    )}
  </div>
);`}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Scroll down to trigger lazy load...</p>
          <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-500">
            Placeholder
          </div>
          <div ref={ref} className="min-h-[100px]">
            {hasBeenViewed ? (
              <Card className="p-4 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
                <p className="font-medium text-pink-700 dark:text-pink-300">Loaded! (was in viewport)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  isInView: {String(isInView)}
                </p>
              </Card>
            ) : (
              <Skeleton className="h-24 w-full rounded-lg" />
            )}
          </div>
          <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With VirtualList"
        description="Combine useLazyLoad with VirtualList for infinite scroll."
        code={`const { ref } = useLazyLoad({ once: false });
const [items, setItems] = useState(initialItems);

useEffect(() => {
  if (isInView) loadMore();
}, [isInView]);

return (
  <VirtualList items={items} renderItem={...} />
  <div ref={ref}>Loading...</div>
);`}
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Attach ref to a sentinel div at the bottom of VirtualList. When it enters view, load more items.
        </p>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API</h2>
        <CodeBlock
          code={`function useLazyLoad<T extends HTMLElement>(
  options?: {
    rootMargin?: string;   // default: '100px'
    threshold?: number;   // default: 0
    once?: boolean;      // default: true - stay loaded once in view
    enabled?: boolean;   // default: true
  }
): {
  ref: RefObject<T | null>;
  isInView: boolean;
  hasBeenViewed: boolean;
};`}
          language="typescript"
        />
      </section>
    </div>
  );
};

export default UseLazyLoadPage;
