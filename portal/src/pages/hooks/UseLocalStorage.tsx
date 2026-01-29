import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { useLocalStorage, Button, Input, Switch, Card } from '@forgedevstack/bear';

const UseLocalStoragePage: FC = () => {
  const [name, setName, removeName] = useLocalStorage('demo-name', '');
  const [darkMode, setDarkMode] = useLocalStorage('demo-dark', false);
  const [count, setCount] = useLocalStorage('demo-count', 0);

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">useLocalStorage</h1>
        <LinesOfCode lines={80} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Persist state in localStorage with automatic sync across browser tabs.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { useLocalStorage } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Persistent State"
        description="Values persist across page refreshes and sync between tabs."
        code={`const [name, setName, removeName] = useLocalStorage('user-name', '');
const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false);
const [count, setCount] = useLocalStorage('counter', 0);`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="flex-1"
            />
            <Button variant="outline" onClick={removeName}>Clear</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-900 dark:text-white">Dark Mode (demo)</p>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Counter</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCount((c) => c - 1)}>-</Button>
                <Button variant="outline" onClick={() => setCount((c) => c + 1)}>+</Button>
                <Button variant="ghost" onClick={() => setCount(0)}>Reset</Button>
              </div>
            </div>
          </Card>

          <p className="text-sm text-gray-500">
            Try refreshing the page or opening in another tab!
          </p>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API</h2>
        <CodeBlock
          code={`function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
    syncTabs?: boolean;  // Sync across tabs (default: true)
  }
): [T, (value: T | ((prev: T) => T)) => void, () => void];`}
          language="typescript"
        />
      </section>
    </div>
  );
};

export default UseLocalStoragePage;

