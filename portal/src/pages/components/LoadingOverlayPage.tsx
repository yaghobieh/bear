import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { LoadingOverlay, Button } from '@forgedevstack/bear';

const LoadingOverlayPage: FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">LoadingOverlay</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={90} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Semi-transparent overlay with a spinner, placed over any container to indicate loading. Configurable opacity, blur, label, and loader.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { LoadingOverlay } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Toggle the overlay to see it in action."
        code={`<div style={{ position: 'relative', height: 200 }}>
  <LoadingOverlay visible={loading} />
  <p>Your content here...</p>
</div>`}
      >
        <div>
          <Button onClick={() => { setVisible(true); setTimeout(() => setVisible(false), 2000); }} className="mb-4">
            Show Loading (2s)
          </Button>
          <div className="relative h-48 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <LoadingOverlay visible={visible} />
            <p className="text-gray-700 dark:text-gray-300">This content will be covered by the overlay when loading.</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Click the button above to see the overlay.</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Add a label below the spinner."
        code={`<LoadingOverlay visible label="Processing..." />`}
      >
        <div className="relative h-32 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <LoadingOverlay visible label="Processing..." />
          <p className="text-gray-700 dark:text-gray-300">Content under overlay.</p>
        </div>
      </ComponentPreview>

    </div>
  );
};

export default LoadingOverlayPage;
