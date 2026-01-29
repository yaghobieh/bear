import { FC, useState, useEffect } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { useDebounce, Input, Card } from '@forgedevstack/bear';

const UseDebouncePage: FC = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    if (debouncedValue) {
      setSearchCount((c) => c + 1);
    }
  }, [debouncedValue]);

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">useDebounce</h1>
        <LinesOfCode lines={120} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Debounce values or callbacks. Useful for search inputs, API calls, and performance optimization.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { useDebounce, useDebouncedCallback } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Debounced Search"
        description="Value updates are debounced by 500ms. Watch the search count."
        code={`const [value, setValue] = useState('');
const debouncedValue = useDebounce(value, 500);

useEffect(() => {
  // API call only fires after user stops typing
  fetchResults(debouncedValue);
}, [debouncedValue]);`}
      >
        <div className="space-y-4">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type to search..."
          />
          <div className="flex gap-4">
            <Card className="flex-1 p-4">
              <p className="text-sm text-gray-500 mb-1">Current Value</p>
              <p className="text-gray-900 dark:text-white">{value || '(empty)'}</p>
            </Card>
            <Card className="flex-1 p-4">
              <p className="text-sm text-gray-500 mb-1">Debounced Value</p>
              <p className="text-gray-900 dark:text-white">{debouncedValue || '(empty)'}</p>
            </Card>
            <Card className="flex-1 p-4">
              <p className="text-sm text-gray-500 mb-1">Search Count</p>
              <p className="text-pink-600">{searchCount}</p>
            </Card>
          </div>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">useDebouncedCallback</h2>
        <CodeBlock
          code={`const { callback: debouncedSave, cancel, flush } = useDebouncedCallback(
  (value) => saveToServer(value),
  500,
  { leading: false, trailing: true, maxWait: 2000 }
);

// Cancel pending execution
cancel();

// Execute immediately
flush();`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API</h2>
        <CodeBlock
          code={`// Debounce a value
function useDebounce<T>(value: T, delay?: number): T;

// Debounce a callback
function useDebouncedCallback<T>(
  callback: T,
  delay?: number,
  options?: {
    leading?: boolean;   // Execute on leading edge
    trailing?: boolean;  // Execute on trailing edge
    maxWait?: number;    // Maximum wait time
  }
): {
  callback: T;
  cancel: () => void;
  flush: () => void;
  isPending: () => boolean;
};`}
          language="typescript"
        />
      </section>
    </div>
  );
};

export default UseDebouncePage;

