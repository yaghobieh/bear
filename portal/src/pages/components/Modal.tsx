import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Modal, Button } from '@forgedevstack/bear';

const ModalPage: FC = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

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

<Modal 
  isOpen={open} 
  onClose={() => setOpen(false)}
  title="Welcome to Bear UI"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Got it</Button>
    </>
  }
>
  <p>This is a basic modal with header and footer.</p>
</Modal>`}
      >
        <div className="flex justify-center">
          <Button onClick={() => setBasicOpen(true)}>Open Modal</Button>
          
          <Modal 
            isOpen={basicOpen} 
            onClose={() => setBasicOpen(false)}
            title="Welcome to Bear UI"
            footer={
              <>
                <Button variant="ghost" onClick={() => setBasicOpen(false)}>Cancel</Button>
                <Button onClick={() => setBasicOpen(false)}>Got it</Button>
              </>
            }
          >
            <p>This is a basic modal with header and footer sections.</p>
            <p className="mt-2 text-gray-500">Click outside or press ESC to close.</p>
          </Modal>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Confirmation Modal"
        description="Modal for confirming destructive actions."
        code={`<Modal 
  isOpen={open} 
  onClose={handleClose}
  title="Delete Item?"
  footer={
    <>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </>
  }
>
  <p>Are you sure? This cannot be undone.</p>
</Modal>`}
      >
        <div className="flex justify-center">
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>Delete Item</Button>
          
          <Modal 
            isOpen={confirmOpen} 
            onClose={() => setConfirmOpen(false)}
            title="Delete Item?"
            footer={
              <>
                <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={() => setConfirmOpen(false)}>Delete</Button>
              </>
            }
          >
            <p>Are you sure you want to delete this item?</p>
            <p className="mt-2 text-red-500 text-sm">This action cannot be undone.</p>
          </Modal>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Modals come in different sizes."
        code={`<Modal size="sm" isOpen={open}>...</Modal>
<Modal size="md" isOpen={open}>...</Modal>
<Modal size="lg" isOpen={open}>...</Modal>
<Modal size="xl" isOpen={open}>...</Modal>
<Modal size="full" isOpen={open}>...</Modal>`}
      >
        <div className="flex justify-center">
          <Button onClick={() => setSizeOpen(true)}>Open Large Modal</Button>
          
          <Modal 
            isOpen={sizeOpen} 
            onClose={() => setSizeOpen(false)} 
            size="lg"
            title="Large Modal"
            footer={<Button onClick={() => setSizeOpen(false)}>Close</Button>}
          >
            <p>This is a large modal. Use different sizes for different content needs.</p>
            <p className="mt-4 text-gray-500">Available sizes: sm, md, lg, xl, full</p>
          </Modal>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Without Close Button"
        description="Modal without the X button in header."
        code={`<Modal 
  isOpen={open} 
  onClose={handleClose}
  showCloseButton={false}
  title="Important Notice"
>
  ...
</Modal>`}
      >
        <div className="flex justify-center gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">showCloseButton: false</p>
            <p className="text-xs text-gray-400">The X button is hidden from the header</p>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">isOpen</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Control visibility</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onClose</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">title</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Modal title</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">footer</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Footer content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg | xl | full</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Modal size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showCloseButton</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show X button</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">closeOnBackdrop</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close on backdrop click</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">closeOnEscape</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close on ESC key</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ModalPage;
