import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const DrawerPage: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Drawer</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Sliding panel for navigation, forms, or additional content.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Drawer } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Slide-in panel from the side."
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Drawer</Button>

<Drawer isOpen={open} onClose={() => setOpen(false)}>
  <Drawer.Header>Drawer Title</Drawer.Header>
  <Drawer.Body>Content goes here...</Drawer.Body>
</Drawer>`}
      >
        <div className="flex justify-center">
          <button 
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-lg bg-bear-500 text-white hover:bg-bear-600 transition-colors"
          >
            Open Drawer
          </button>
          {open && (
            <div className="fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Drawer Title</h3>
                  <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400">This is the drawer content. You can put any content here including forms, lists, or navigation items.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Positions"
        description="Drawer can slide from any side."
        code={`<Drawer position="left">Left</Drawer>
<Drawer position="right">Right</Drawer>
<Drawer position="top">Top</Drawer>
<Drawer position="bottom">Bottom</Drawer>`}
      >
        <div className="flex gap-3 justify-center flex-wrap">
          <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">← Left</div>
          <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">Right →</div>
          <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">↑ Top</div>
          <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">Bottom ↓</div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different drawer widths."
        code={`<Drawer size="sm">Small (320px)</Drawer>
<Drawer size="md">Medium (400px)</Drawer>
<Drawer size="lg">Large (560px)</Drawer>
<Drawer size="full">Full width</Drawer>`}
      >
        <div className="flex gap-3 justify-center flex-wrap">
          <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">sm: 320px</div>
          <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">md: 400px</div>
          <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">lg: 560px</div>
          <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">full: 100%</div>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">isOpen</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Drawer visibility</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onClose</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">position</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>left | right | top | bottom</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">right</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Slide direction</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg | full</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Drawer width</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">closeOnOverlay</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close on backdrop click</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DrawerPage;

