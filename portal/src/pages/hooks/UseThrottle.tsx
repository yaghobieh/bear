import { FC, useState, useEffect } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { useThrottle, Card, Progress } from '@forgedevstack/bear';

const UseThrottlePage: FC = () => {
  const [mouseX, setMouseX] = useState(0);
  const throttledX = useThrottle(mouseX, 100);
  const [updateCount, setUpdateCount] = useState(0);
  const [throttledCount, setThrottledCount] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setUpdateCount((c) => c + 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setThrottledCount((c) => c + 1);
  }, [throttledX]);

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">useThrottle</h1>
        <LinesOfCode lines={100} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Throttle values or callbacks. Limits execution to at most once per specified interval.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { useThrottle, useThrottledCallback } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Throttled Mouse Position"
        description="Move your mouse to see throttling in action (100ms interval)."
        code={`const [mouseX, setMouseX] = useState(0);
const throttledX = useThrottle(mouseX, 100);

// Throttled callback version
const { callback: handleScroll } = useThrottledCallback(
  (e) => updateScrollPosition(e),
  100
);`}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <p className="text-sm text-gray-500 mb-2">Raw Updates</p>
              <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">{updateCount}</p>
              <p className="text-xs text-gray-400">mousemove events</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-500 mb-2">Throttled Updates</p>
              <p className="text-3xl font-bold text-pink-600">{throttledCount}</p>
              <p className="text-xs text-gray-400">state updates</p>
            </Card>
          </div>
          
          <Card className="p-4">
            <p className="text-sm text-gray-500 mb-2">Mouse X Position</p>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-400">Raw: {mouseX}px</p>
                <Progress value={(mouseX / window.innerWidth) * 100} size="sm" className="mt-1" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-pink-600">Throttled: {throttledX}px</p>
                <Progress value={(throttledX / window.innerWidth) * 100} size="sm" className="mt-1" />
              </div>
            </div>
          </Card>

          <p className="text-sm text-gray-500">
            Reduction: {updateCount > 0 ? Math.round((1 - throttledCount / updateCount) * 100) : 0}% fewer updates
          </p>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API</h2>
        <CodeBlock
          code={`// Throttle a value
function useThrottle<T>(value: T, delay?: number): T;

// Throttle a callback
function useThrottledCallback<T>(
  callback: T,
  delay?: number,
  options?: {
    leading?: boolean;   // Execute on leading edge (default: true)
    trailing?: boolean;  // Execute on trailing edge (default: true)
  }
): {
  callback: T;
  cancel: () => void;
};`}
          language="typescript"
        />
      </section>
    </div>
  );
};

export default UseThrottlePage;

