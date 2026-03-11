import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Popconfirm, Button } from '@forgedevstack/bear';

const PopconfirmPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Popconfirm</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={120} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Inline confirmation popover — ask users to confirm an action before proceeding. Supports placement, danger variant, and custom icon.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Popconfirm } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Wraps any element. Click to show the confirmation popover."
        code={`<Popconfirm title="Are you sure?" onConfirm={() => alert('Confirmed!')}>
  <Button>Delete</Button>
</Popconfirm>`}
      >
        <Popconfirm title="Are you sure?" onConfirm={() => alert('Confirmed!')}>
          <Button>Delete</Button>
        </Popconfirm>
      </ComponentPreview>

      <ComponentPreview
        title="Danger Variant"
        description="Red confirm button for destructive actions."
        code={`<Popconfirm title="Delete this item?" description="This cannot be undone." variant="danger" onConfirm={() => alert('Deleted!')}>
  <Button variant="outline">Remove</Button>
</Popconfirm>`}
      >
        <Popconfirm title="Delete this item?" description="This cannot be undone." variant="danger" onConfirm={() => alert('Deleted!')}>
          <Button variant="outline">Remove</Button>
        </Popconfirm>
      </ComponentPreview>

      <ComponentPreview
        title="Placement"
        description="Position the popover around the trigger."
        code={`<Popconfirm title="Confirm?" placement="right">
  <Button variant="secondary">Right</Button>
</Popconfirm>`}
      >
        <div className="flex gap-4">
          <Popconfirm title="Confirm?" placement="top" onConfirm={() => {}}>
            <Button variant="secondary">Top</Button>
          </Popconfirm>
          <Popconfirm title="Confirm?" placement="bottom" onConfirm={() => {}}>
            <Button variant="secondary">Bottom</Button>
          </Popconfirm>
          <Popconfirm title="Confirm?" placement="left" onConfirm={() => {}}>
            <Button variant="secondary">Left</Button>
          </Popconfirm>
          <Popconfirm title="Confirm?" placement="right" onConfirm={() => {}}>
            <Button variant="secondary">Right</Button>
          </Popconfirm>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default PopconfirmPage;
