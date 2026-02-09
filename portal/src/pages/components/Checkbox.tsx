import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Checkbox } from '@forgedevstack/bear';

const CheckboxPage: FC = () => {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [items, setItems] = useState([true, false, true]);

  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean) && !allChecked;

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Checkbox</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Selection control for choosing one or more options.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Checkbox } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple checkbox with label."
        code={`<Checkbox label="Accept terms" />
<Checkbox label="Subscribe to newsletter" defaultChecked />`}
      >
        <div className="flex flex-col gap-3 items-start mx-auto max-w-xs">
          <Checkbox 
            label="Accept terms and conditions" 
            checked={checked1}
            onChange={(e) => setChecked1(e.target.checked)}
          />
          <Checkbox 
            label="Subscribe to newsletter" 
            checked={checked2}
            onChange={(e) => setChecked2(e.target.checked)}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Indeterminate State"
        description="Parent checkbox with partially selected children."
        code={`<Checkbox 
  label="Select all" 
  indeterminate={someChecked} 
  checked={allChecked}
  onChange={handleSelectAll}
/>
<Checkbox label="Item 1" checked={items[0]} />
<Checkbox label="Item 2" checked={items[1]} />
<Checkbox label="Item 3" checked={items[2]} />`}
      >
        <div className="flex flex-col gap-3 items-start mx-auto max-w-xs">
          <Checkbox
            label="Select all items"
            indeterminate={someChecked}
            checked={allChecked}
            onChange={() => {
              if (allChecked || someChecked) {
                setItems([false, false, false]);
              } else {
                setItems([true, true, true]);
              }
            }}
          />
          <div className="ml-6 flex flex-col gap-2">
            {['Item 1', 'Item 2', 'Item 3'].map((label, i) => (
              <Checkbox
                key={i}
                label={label}
                checked={items[i]}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[i] = e.target.checked;
                  setItems(newItems);
                }}
              />
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different checkbox sizes."
        code={`<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />`}
      >
        <div className="flex flex-col gap-3 items-start mx-auto max-w-xs">
          <Checkbox size="sm" label="Small checkbox" defaultChecked />
          <Checkbox size="md" label="Medium checkbox" defaultChecked />
          <Checkbox size="lg" label="Large checkbox" defaultChecked />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled checkbox states."
        code={`<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled checked />`}
      >
        <div className="flex flex-col gap-3 items-start mx-auto max-w-xs">
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Disabled checked" disabled defaultChecked />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Custom checkbox colors."
        code={`<Checkbox color="primary" label="Primary" />
<Checkbox color="success" label="Success" />
<Checkbox color="danger" label="Danger" />`}
      >
        <div className="flex flex-col gap-3 items-start mx-auto max-w-xs">
          <Checkbox color="primary" label="Primary" defaultChecked />
          <Checkbox color="success" label="Success" defaultChecked />
          <Checkbox color="danger" label="Danger" defaultChecked />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">checked</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">defaultChecked</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Initial state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">indeterminate</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Partial selection</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Checkbox size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | success | danger</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disabled state</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CheckboxPage;
