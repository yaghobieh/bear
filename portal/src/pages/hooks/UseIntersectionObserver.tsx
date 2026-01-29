import { FC, useRef } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { useIntersectionObserver, useInView, Card, Progress } from '@forgedevstack/bear';

const UseIntersectionObserverPage: FC = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  const { isIntersecting: box1Visible, intersectionRatio: ratio1 } = useIntersectionObserver(ref1, { threshold: [0, 0.5, 1] });
  const box2Visible = useInView(ref2, { threshold: 0.5 });
  const box3Visible = useInView(ref3, { freezeOnceVisible: true });

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">useIntersectionObserver</h1>
        <LinesOfCode lines={85} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Detect when elements enter or leave the viewport. Perfect for lazy loading, animations, and analytics.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { useIntersectionObserver, useInView } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Viewport Detection"
        description="Scroll the boxes in and out of view to see the status change."
        code={`const ref = useRef<HTMLDivElement>(null);

// Full API
const { isIntersecting, intersectionRatio, entry } = useIntersectionObserver(ref, {
  threshold: 0.5,
  freezeOnceVisible: true,
});

// Simple boolean
const isVisible = useInView(ref);`}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Card className="p-3">
              <p className="text-sm text-gray-500">Box 1</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${box1Visible ? 'bg-green-500' : 'bg-gray-300'}`} />
                <p className="text-sm">{box1Visible ? 'Visible' : 'Hidden'}</p>
              </div>
              <Progress value={ratio1 * 100} size="sm" className="mt-2" />
            </Card>
            <Card className="p-3">
              <p className="text-sm text-gray-500">Box 2</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${box2Visible ? 'bg-green-500' : 'bg-gray-300'}`} />
                <p className="text-sm">{box2Visible ? 'Visible' : 'Hidden'}</p>
              </div>
            </Card>
            <Card className="p-3">
              <p className="text-sm text-gray-500">Box 3 (freeze)</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${box3Visible ? 'bg-green-500' : 'bg-gray-300'}`} />
                <p className="text-sm">{box3Visible ? 'Loaded' : 'Waiting'}</p>
              </div>
            </Card>
          </div>

          <div className="h-40 overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="h-32" />
            <div
              ref={ref1}
              className={`h-24 mb-4 rounded-lg flex items-center justify-center transition-all ${
                box1Visible ? 'bg-pink-500 text-white scale-100' : 'bg-gray-200 dark:bg-gray-700 scale-95'
              }`}
            >
              Box 1 - {Math.round(ratio1 * 100)}% visible
            </div>
            <div
              ref={ref2}
              className={`h-24 mb-4 rounded-lg flex items-center justify-center transition-all ${
                box2Visible ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              Box 2 - 50% threshold
            </div>
            <div
              ref={ref3}
              className={`h-24 rounded-lg flex items-center justify-center transition-all ${
                box3Visible ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              Box 3 - Once visible, stays loaded
            </div>
            <div className="h-32" />
          </div>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API</h2>
        <CodeBlock
          code={`function useIntersectionObserver<T extends HTMLElement>(
  ref: RefObject<T>,
  options?: {
    threshold?: number | number[];
    root?: Element | Document | null;
    rootMargin?: string;
    freezeOnceVisible?: boolean;
    enabled?: boolean;
    onChange?: (entry: IntersectionObserverEntry) => void;
  }
): {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
  intersectionRatio: number;
};

// Simplified version
function useInView<T extends HTMLElement>(
  ref: RefObject<T>,
  options?: Omit<UseIntersectionObserverOptions, 'onChange'>
): boolean;`}
          language="typescript"
        />
      </section>
    </div>
  );
};

export default UseIntersectionObserverPage;

