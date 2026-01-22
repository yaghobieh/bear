import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ModalPage: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Modal</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Dialog overlay for important content that requires user attention.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Modal } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple modal with title and content."
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>

<Modal isOpen={open} onClose={() => setOpen(false)}>
  <Modal.Header>Modal Title</Modal.Header>
  <Modal.Body>Modal content goes here...</Modal.Body>
  <Modal.Footer>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </Modal.Footer>
</Modal>`}
      >
        <div className="flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-lg bg-bear-500 text-white hover:bg-bear-600 transition-colors"
          >
            Open Modal
          </button>
          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
              <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Modal Title</h3>
                  <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-600 dark:text-gray-400">This is the modal content. You can put any content here including forms, images, or text.</p>
                </div>
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                  <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg bg-bear-500 text-white hover:bg-bear-600">Confirm</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different modal widths."
        code={`<Modal size="sm">Small</Modal>
<Modal size="md">Medium</Modal>
<Modal size="lg">Large</Modal>
<Modal size="full">Full width</Modal>`}
      >
        <div className="flex gap-3 justify-center flex-wrap">
          {[
            { size: 'sm', width: '384px' },
            { size: 'md', width: '512px' },
            { size: 'lg', width: '768px' },
            { size: 'xl', width: '1024px' },
          ].map(({ size, width }) => (
            <div key={size} className="text-center">
              <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">
                {size}: {width}
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Centered"
        description="Vertically centered modal."
        code={`<Modal centered>
  Centered content
</Modal>`}
      >
        <div className="relative h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 text-sm text-gray-600 dark:text-gray-300">
              Vertically centered
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Without Overlay Close"
        description="Prevent closing by clicking backdrop."
        code={`<Modal closeOnOverlay={false}>
  Click X to close
</Modal>`}
      >
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg">
            <span>⚠️</span>
            <span className="text-sm">Must click X or Cancel to close</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Scrollable"
        description="Modal with scrollable content."
        code={`<Modal scrollBehavior="inside">
  <Modal.Body>
    {longContent}
  </Modal.Body>
</Modal>`}
      >
        <div className="max-w-xs mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-white">
            Scrollable Content
          </div>
          <div className="h-24 overflow-y-auto px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">This content is scrollable when it exceeds the modal height.</p>
            <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className="mb-2">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
          </div>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">isOpen</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Modal visibility</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onClose</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg | xl | full</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Modal width</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">centered</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Center vertically</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">closeOnOverlay</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close on backdrop click</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">closeOnEsc</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close on Escape key</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ModalPage;
