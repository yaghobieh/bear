import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const SelectPage: FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Select</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Dropdown select component for choosing from a list of options.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Select } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple select dropdown."
        code={`<Select placeholder="Select an option">
  <Select.Option value="1">Option 1</Select.Option>
  <Select.Option value="2">Option 2</Select.Option>
  <Select.Option value="3">Option 3</Select.Option>
</Select>`}
      >
        <div className="max-w-xs mx-auto">
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bear-500 focus:border-transparent cursor-pointer"
          >
            <option value="" disabled>Select an option...</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Select with a label."
        code={`<Select label="Country" placeholder="Select country">
  <Select.Option value="us">United States</Select.Option>
  <Select.Option value="uk">United Kingdom</Select.Option>
  <Select.Option value="ca">Canada</Select.Option>
</Select>`}
      >
        <div className="max-w-xs mx-auto">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
          >
            <option value="" disabled>Select country...</option>
            <option value="us">🇺🇸 United States</option>
            <option value="uk">🇬🇧 United Kingdom</option>
            <option value="ca">🇨🇦 Canada</option>
          </select>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different select sizes."
        code={`<Select size="sm" placeholder="Small" />
<Select size="md" placeholder="Medium" />
<Select size="lg" placeholder="Large" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <select className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option>Small</option>
          </select>
          <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option>Medium</option>
          </select>
          <select className="w-full px-5 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option>Large</option>
          </select>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="States"
        description="Error and disabled states."
        code={`<Select error errorMessage="Please select an option" />
<Select disabled />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <div>
            <select className="w-full px-4 py-2 border-2 border-red-500 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option>Error state</option>
            </select>
            <p className="mt-1 text-sm text-red-500">Please select an option</p>
          </div>
          <select
            disabled
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
          >
            <option>Disabled</option>
          </select>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Grouped Options"
        description="Options organized into groups."
        code={`<Select label="Car">
  <Select.Group label="European">
    <Select.Option value="bmw">BMW</Select.Option>
    <Select.Option value="audi">Audi</Select.Option>
  </Select.Group>
  <Select.Group label="Japanese">
    <Select.Option value="toyota">Toyota</Select.Option>
    <Select.Option value="honda">Honda</Select.Option>
  </Select.Group>
</Select>`}
      >
        <div className="max-w-xs mx-auto">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Car</label>
          <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <optgroup label="European">
              <option value="bmw">BMW</option>
              <option value="audi">Audi</option>
              <option value="mercedes">Mercedes</option>
            </optgroup>
            <optgroup label="Japanese">
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
              <option value="nissan">Nissan</option>
            </optgroup>
          </select>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Change handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Select size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">error</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Error state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disabled state</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SelectPage;
