import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Select } from '@forgedevstack/bear';

const BASIC_OPTIONS = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const COUNTRY_OPTIONS = [
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'uk', label: '🇬🇧 United Kingdom' },
  { value: 'ca', label: '🇨🇦 Canada' },
];

const CAR_OPTIONS = [
  { value: 'bmw', label: 'BMW' },
  { value: 'audi', label: 'Audi', disabled: true },
  { value: 'mercedes', label: 'Mercedes' },
  { value: 'toyota', label: 'Toyota' },
  { value: 'honda', label: 'Honda' },
  { value: 'nissan', label: 'Nissan' },
];

const SelectPage: FC = () => {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState('');
  const [car, setCar] = useState('');

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
        code={`<Select
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Select an option"
/>`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <Select
            options={BASIC_OPTIONS}
            value={value}
            onChange={setValue}
            placeholder="Select an option"
            fullWidth
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Select with a label."
        code={`<Select
  label="Country"
  options={countryOptions}
  value={country}
  onChange={setCountry}
  placeholder="Select country"
  fullWidth
/>`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <Select
            label="Country"
            options={COUNTRY_OPTIONS}
            value={country}
            onChange={setCountry}
            placeholder="Select country"
            fullWidth
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different select sizes."
        code={`<Select options={options} size="sm" placeholder="Small" fullWidth />
<Select options={options} size="md" placeholder="Medium" fullWidth />
<Select options={options} size="lg" placeholder="Large" fullWidth />`}
        allowOverflow
      >
        <div className="flex flex-col gap-4 max-w-xs w-full">
          <Select options={BASIC_OPTIONS} size="sm" placeholder="Small" fullWidth />
          <Select options={BASIC_OPTIONS} size="md" placeholder="Medium" fullWidth />
          <Select options={BASIC_OPTIONS} size="lg" placeholder="Large" fullWidth />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="States"
        description="Error and disabled states."
        code={`<Select options={options} error="Please select an option" fullWidth />
<Select options={options} disabled placeholder="Disabled" fullWidth />`}
        allowOverflow
      >
        <div className="flex flex-col gap-4 max-w-xs w-full">
          <Select
            options={BASIC_OPTIONS}
            error="Please select an option"
            fullWidth
          />
          <Select
            options={BASIC_OPTIONS}
            disabled
            placeholder="Disabled"
            fullWidth
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Disabled Options"
        description="Some options can be disabled."
        code={`<Select
  label="Car"
  options={[
    { value: 'bmw', label: 'BMW' },
    { value: 'audi', label: 'Audi', disabled: true },
    { value: 'toyota', label: 'Toyota' },
  ]}
  value={car}
  onChange={setCar}
  placeholder="Select car"
  fullWidth
/>`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <Select
            label="Car"
            options={CAR_OPTIONS}
            value={car}
            onChange={setCar}
            placeholder="Select car"
            fullWidth
          />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">options</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>SelectOption[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Array of {`{ value, label, disabled? }`}</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Change handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">placeholder</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Select an option</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Placeholder text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">error</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Error message</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Select size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">fullWidth</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Full width select</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disabled state</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SelectPage;
