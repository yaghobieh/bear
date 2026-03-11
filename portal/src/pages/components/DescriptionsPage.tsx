import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Descriptions } from '@forgedevstack/bear';

const BASIC_ITEMS = [
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'john@example.com' },
  { label: 'Role', value: 'Admin' },
  { label: 'Status', value: 'Active' },
  { label: 'Created', value: '2026-01-15' },
  { label: 'Last Login', value: '2 hours ago' },
];

const DescriptionsPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Descriptions</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={160} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Key-value detail display for showing structured information — user profiles, order details, system info. Supports bordered, horizontal/vertical layouts.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Descriptions } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple key-value pairs in a grid."
        code={`<Descriptions title="User Info" items={[
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'john@example.com' },
]} />`}
      >
        <Descriptions title="User Info" items={BASIC_ITEMS} />
      </ComponentPreview>

      <ComponentPreview
        title="Bordered"
        description="Bordered table-like layout."
        code={`<Descriptions title="Order" bordered items={items} />`}
      >
        <Descriptions title="Order Details" bordered items={BASIC_ITEMS} />
      </ComponentPreview>

      <ComponentPreview
        title="Vertical Layout"
        description="Labels stacked above values."
        code={`<Descriptions layout="vertical" items={items} />`}
      >
        <Descriptions layout="vertical" items={BASIC_ITEMS} columns={3} />
      </ComponentPreview>
    </div>
  );
};

export default DescriptionsPage;
