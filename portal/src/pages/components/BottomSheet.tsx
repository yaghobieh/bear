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
              <tr><td className="px-4 py-3 font-mono text-bear-600">isOpen</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visibility</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onClose</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">title</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">—</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Header title</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg | full</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Max height</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showCloseButton</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Header close control</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">closeOnBackdrop</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Backdrop closes sheet</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">closeOnEscape</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Escape closes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showHandle</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Drag handle</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">enableScroll</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Body scrolls when content overflows</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">isSticky</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Sticky header while body scrolls</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BottomSheetPage;
