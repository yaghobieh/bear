import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

// Checkbox implementation
const Checkbox: FC<{ 
  label: string; 
  checked?: boolean; 
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
}> = ({ label, checked = false, onChange, indeterminate }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <div
      onClick={() => onChange?.(!checked)}
      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
        checked || indeterminate ? 'bg-bear-500 border-bear-500' : 'border-gray-400'
      }`}
    >
      {checked && <span className="text-white text-xs font-bold">✓</span>}
      {indeterminate && !checked && <span className="text-white text-xs font-bold">−</span>}
    </div>
    <span className="text-gray-700 dark:text-gray-300">{label}</span>
  </label>
);

const CheckboxPage: FC = () => {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(true);
  const [items, setItems] = useState([true, false, true]);

  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean) && !allChecked;

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Checkbox</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Checkboxes allow users to select multiple options from a set.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Checkbox } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Standard checkboxes with labels."
        code={`<Checkbox label="Accept terms" checked={agreed} onChange={setAgreed} />
<Checkbox label="Subscribe to newsletter" />
<Checkbox label="Remember me" defaultChecked />`}
      >
        <div className="flex flex-col gap-3">
          <Checkbox label="Accept terms" checked={checked1} onChange={setChecked1} />
          <Checkbox label="Subscribe to newsletter" checked={checked2} onChange={setChecked2} />
          <Checkbox label="Remember me" checked={checked3} onChange={setChecked3} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Indeterminate State"
        description="Parent checkbox with partial selection."
        code={`const allChecked = items.every(Boolean);
const someChecked = items.some(Boolean) && !allChecked;

<Checkbox 
  label="Select All" 
  checked={allChecked}
  indeterminate={someChecked}
  onChange={(checked) => setItems(items.map(() => checked))}
/>
{items.map((checked, i) => (
  <Checkbox key={i} label={\`Item \${i + 1}\`} checked={checked} />
))}`}
      >
        <div className="flex flex-col gap-3">
          <Checkbox 
            label="Select All" 
            checked={allChecked}
            indeterminate={someChecked}
            onChange={(c) => setItems(items.map(() => c))}
          />
          <div className="ml-6 flex flex-col gap-2">
            {items.map((c, i) => (
              <Checkbox 
                key={i} 
                label={`Item ${i + 1}`} 
                checked={c}
                onChange={(v) => {
                  const newItems = [...items];
                  newItems[i] = v;
                  setItems(newItems);
                }}
              />
            ))}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">checked</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled checked state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">indeterminate</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show indeterminate state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(checked: boolean) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called when state changes</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CheckboxPage;

