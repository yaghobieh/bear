import { FC, useState, createContext, useContext } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

// Radio context
const RadioGroupContext = createContext<{ value: string; onChange: (v: string) => void } | null>(null);

// Radio implementation
const Radio: FC<{ value: string; label: string; variant?: 'primary' | 'success' | 'danger' }> = ({ 
  value, label, variant = 'primary' 
}) => {
  const ctx = useContext(RadioGroupContext);
  const isChecked = ctx?.value === value;
  const colors = { primary: '#ec4899', success: '#22c55e', danger: '#ef4444' };

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => ctx?.onChange(value)}
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
        style={{ borderColor: isChecked ? colors[variant] : '#6b7280' }}
      >
        {isChecked && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[variant] }} />}
      </div>
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
};

const RadioGroup: FC<{ value: string; onChange: (v: string) => void; children: React.ReactNode }> = ({ 
  value, onChange, children 
}) => (
  <RadioGroupContext.Provider value={{ value, onChange }}>
    <div className="flex flex-col gap-3">{children}</div>
  </RadioGroupContext.Provider>
);

const RadioPage: FC = () => {
  const [selected, setSelected] = useState('option1');
  const [colorSelected, setColorSelected] = useState('primary');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Radio</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Radio buttons allow users to select a single option from a list.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Radio, RadioGroup } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Group radio buttons for single selection."
        code={`const [selected, setSelected] = useState('option1');

<RadioGroup value={selected} onChange={setSelected}>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
  <Radio value="option3" label="Option 3" />
</RadioGroup>`}
      >
        <RadioGroup value={selected} onChange={setSelected}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Radio buttons with different colors."
        code={`<RadioGroup value={selected} onChange={setSelected}>
  <Radio value="primary" variant="primary" label="Primary" />
  <Radio value="success" variant="success" label="Success" />
  <Radio value="danger" variant="danger" label="Danger" />
</RadioGroup>`}
      >
        <RadioGroup value={colorSelected} onChange={setColorSelected}>
          <Radio value="primary" variant="primary" label="Primary" />
          <Radio value="success" variant="success" label="Success" />
          <Radio value="danger" variant="danger" label="Danger" />
        </RadioGroup>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">RadioGroup</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called when selection changes</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Radio</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Radio value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | success | danger</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color variant</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default RadioPage;

