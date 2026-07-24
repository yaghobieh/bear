import { FC, useState } from 'react';
import { Backdrop, Button, Spinner, Typography } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';

const BackdropPage: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Backdrop</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Scrim overlay for modals, drawers, and loading states. Supports blur and invisible modes.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Backdrop } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Tinted overlay that can host centered content."
        code={`const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Show backdrop</Button>
  <Backdrop open={open} blur onClick={() => setOpen(false)}>
    <Spinner />
  </Backdrop>
</>`}
      >
        <Button onClick={() => setOpen(true)}>Show backdrop</Button>
        <Backdrop open={open} blur onClick={() => setOpen(false)}>
          <div className="flex flex-col items-center gap-3 text-white">
            <Spinner />
            <Typography variant="body2" className="text-white">
              Click anywhere to dismiss
            </Typography>
          </div>
        </Backdrop>
      </ComponentPreview>

      <PropsTable
        title="Props"
        rows={[
          { name: 'open', type: 'boolean', default: 'true', description: 'Whether the backdrop is visible' },
          { name: 'invisible', type: 'boolean', default: 'false', description: 'Hide tint while keeping the blocking layer' },
          { name: 'blur', type: 'boolean', default: 'false', description: 'Apply backdrop blur' },
          { name: 'zIndex', type: 'number', default: '11000', description: 'Stacking order' },
          { name: 'onClick', type: '(event) => void', description: 'Click handler for dismiss patterns' },
        ]}
      />
    </div>
  );
};

export default BackdropPage;
