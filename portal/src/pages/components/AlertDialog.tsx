import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { AlertDialog, Button, Card } from '@forgedevstack/bear';

const AlertDialogPage: FC = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setLoadingOpen(false);
    }, 2000);
  };

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">AlertDialog</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A focused confirmation dialog for actions that require user acknowledgment. Simpler than Modal, built for "Are you sure?" flows.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { AlertDialog } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple confirmation dialog with title and description."
        code={`<AlertDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  onConfirm={() => { handleAction(); setOpen(false); }}
  title="Confirm Action"
  description="Are you sure you want to continue?"
/>`}
      >
        <div className="flex justify-center">
          <Button onClick={() => setBasicOpen(true)}>Open AlertDialog</Button>
          <AlertDialog
            isOpen={basicOpen}
            onClose={() => setBasicOpen(false)}
            onConfirm={() => setBasicOpen(false)}
            title="Confirm Action"
            description="Are you sure you want to continue? This will apply changes to your account."
            confirmVariant="primary"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Danger / Destructive"
        description="For destructive actions like delete, with red confirm button."
        code={`<AlertDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  onConfirm={handleDelete}
  title="Delete Project?"
  description="This will permanently delete the project and all its data. This action cannot be undone."
  confirmText="Delete"
  confirmVariant="danger"
/>`}
      >
        <div className="flex justify-center">
          <Button variant="danger" onClick={() => setDangerOpen(true)}>Delete Project</Button>
          <AlertDialog
            isOpen={dangerOpen}
            onClose={() => setDangerOpen(false)}
            onConfirm={() => setDangerOpen(false)}
            title="Delete Project?"
            description="This will permanently delete the project and all its data. This action cannot be undone."
            confirmText="Delete"
            confirmVariant="danger"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Loading State"
        description="Show loading spinner on confirm with loadingText."
        code={`<AlertDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  onConfirm={handleDelete}
  title="Delete Account?"
  description="All data will be permanently removed."
  confirmText="Delete"
  loading={isDeleting}
  loadingText="Deleting..."
  confirmVariant="danger"
/>`}
      >
        <div className="flex justify-center">
          <Button variant="danger" onClick={() => setLoadingOpen(true)}>Delete Account</Button>
          <AlertDialog
            isOpen={loadingOpen}
            onClose={() => setLoadingOpen(false)}
            onConfirm={handleDelete}
            title="Delete Account?"
            description="All data will be permanently removed. This cannot be undone."
            confirmText="Delete"
            loading={isDeleting}
            loadingText="Deleting..."
            confirmVariant="danger"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Labels"
        description="Override button labels and variant."
        code={`<AlertDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  onConfirm={() => setOpen(false)}
  title="Publish Changes?"
  description="Your changes will go live immediately."
  confirmText="Publish Now"
  cancelText="Not Yet"
  confirmVariant="success"
/>`}
      >
        <div className="flex justify-center">
          <Button variant="success" onClick={() => setCustomOpen(true)}>Publish</Button>
          <AlertDialog
            isOpen={customOpen}
            onClose={() => setCustomOpen(false)}
            onConfirm={() => setCustomOpen(false)}
            title="Publish Changes?"
            description="Your changes will go live immediately and be visible to all users."
            confirmText="Publish Now"
            cancelText="Not Yet"
            confirmVariant="success"
          />
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <Card className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">isOpen</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">—</td>
                <td className="p-3">Whether dialog is visible</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">onClose</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3">—</td>
                <td className="p-3">Called on cancel / backdrop / escape</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">onConfirm</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3">—</td>
                <td className="p-3">Called when confirm button is clicked</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">title</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Dialog heading</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">description</td>
                <td className="p-3 font-mono">string | ReactNode</td>
                <td className="p-3">—</td>
                <td className="p-3">Body text / content</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">confirmText</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">"Confirm"</td>
                <td className="p-3">Confirm button label</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">cancelText</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">"Cancel"</td>
                <td className="p-3">Cancel button label</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">confirmVariant</td>
                <td className="p-3 font-mono">BearVariant</td>
                <td className="p-3">"danger"</td>
                <td className="p-3">Variant color for confirm button</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">loading</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3">Show loading state on confirm</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-pink-500">loadingText</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Text to show during loading</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
};

export default AlertDialogPage;
