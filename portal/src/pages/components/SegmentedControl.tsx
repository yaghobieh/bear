import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { SegmentedControl } from '@forgedevstack/bear';

const SegmentedControlPage: FC = () => {
  const [value, setValue] = useState('list');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">SegmentedControl</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Segmented control for switching between mutually exclusive options.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { SegmentedControl } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple segmented control."
        code={`<SegmentedControl
  items={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'map', label: 'Map' },
  ]}
  value={value}
  onChange={setValue}
/>`}
      >
        <SegmentedControl
          items={[
            { value: 'list', label: 'List' },
            { value: 'grid', label: 'Grid' },
            { value: 'map', label: 'Map' },
          ]}
          value={value}
          onChange={setValue}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Full Width"
        description="Segmented control that takes full width."
        code={`<SegmentedControl items={items} fullWidth />`}
      >
        <SegmentedControl
          items={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ]}
          defaultValue="a"
          fullWidth
        />
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Small, medium, and large sizes."
        code={`<SegmentedControl items={items} size="sm" />
<SegmentedControl items={items} size="md" />
<SegmentedControl items={items} size="lg" />`}
      >
        <div className="space-y-4 max-w-md">
          <SegmentedControl
            items={[{ value: 'sm', label: 'Small' }, { value: 's2', label: 'Size' }]}
            defaultValue="sm"
            size="sm"
          />
          <SegmentedControl
            items={[{ value: 'md', label: 'Medium' }, { value: 'm2', label: 'Size' }]}
            defaultValue="md"
            size="md"
          />
          <SegmentedControl
            items={[{ value: 'lg', label: 'Large' }, { value: 'l2', label: 'Size' }]}
            defaultValue="lg"
            size="lg"
          />
        </div>
      </ComponentPreview>
    </div>
  );
};

export default SegmentedControlPage;
