import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { useClipboard, Button, Input } from '@forgedevstack/bear';

const UseClipboardPage: FC = () => {
  const { copy, copied, value } = useClipboard({ timeout: 2000 });
  const [text, setText] = useState('Hello, Bear UI!');

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">useClipboard</h1>
        <LinesOfCode lines={60} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Copy text to clipboard with status tracking. Includes timeout for resetting copied state.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { useClipboard } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Copy text to clipboard and show copied status."
        code={`const { copy, copied } = useClipboard();

<Button onClick={() => copy('Hello!')}>
  {copied ? 'Copied!' : 'Copy'}
</Button>`}
      >
        <div className="flex items-center gap-4">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to copy"
            className="flex-1"
          />
          <Button onClick={() => copy(text)} variant={copied ? 'outline' : 'primary'}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        {value && (
          <p className="mt-2 text-sm text-gray-500">
            Last copied: {value}
          </p>
        )}
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API</h2>
        <CodeBlock
          code={`interface UseClipboardOptions {
  timeout?: number;      // Reset copied state after ms (default: 2000)
  onSuccess?: (value: string) => void;
  onError?: (error: Error) => void;
}

interface UseClipboardReturn {
  copy: (value: string) => Promise<boolean>;
  copied: boolean;
  value: string | null;
  reset: () => void;
  error: Error | null;
}`}
          language="typescript"
        />
      </section>
    </div>
  );
};

export default UseClipboardPage;

