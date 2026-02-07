import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { BottomSheet, Button } from '@forgedevstack/bear';

const BottomSheetPage: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">BottomSheet</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Bottom sheet panel, ideal for mobile. Slides up from the bottom with backdrop.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { BottomSheet, Button } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Open bottom sheet with title and content."
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open BottomSheet</Button>

<BottomSheet isOpen={open} onClose={() => setOpen(false)} title="Sheet Title">
  <p>Content goes here...</p>
</BottomSheet>`}
      >
        <Button onClick={() => setOpen(true)}>Open BottomSheet</Button>
        <BottomSheet isOpen={open} onClose={() => setOpen(false)} title="Sheet Title">
          <p className="text-zinc-300">Content goes here. Swipe down or click backdrop to close.</p>
        </BottomSheet>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="sm, md, lg, full sizes."
        code={`<BottomSheet size="sm">Small (40% height)</BottomSheet>
<BottomSheet size="md">Medium (60%)</BottomSheet>
<BottomSheet size="full">Full (95%)</BottomSheet>`}
      >
        <div className="flex gap-3 flex-wrap">
          <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">sm — 40%</span>
          <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">md — 60%</span>
          <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">lg — 80%</span>
          <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">full — 95%</span>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default BottomSheetPage;
