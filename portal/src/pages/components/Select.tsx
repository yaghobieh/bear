import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
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
  const [nativeValue, setNativeValue] = useState('');
  const [emptyValue, setEmptyValue] = useState('');

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

      <ComponentPreview
        title="Native select"
        description="Renders a native HTML select while keeping the same options API."
        code={`<Select
  native
  label="Priority"
  options={options}
  value={value}
  onChange={setValue}
  displayEmpty
  placeholder="Choose priority"
  fullWidth
/>`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <Select
            native
            label="Priority"
            options={BASIC_OPTIONS}
            value={nativeValue}
            onChange={setNativeValue}
            displayEmpty
            placeholder="Choose priority"
            fullWidth
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="displayEmpty + renderValue"
        description="Keep the empty option visible and customize the closed trigger label."
        code={`<Select
  displayEmpty
  options={options}
  value={value}
  onChange={setValue}
  renderValue={(v) => \`Selected: \${v}\`}
  placeholder="Nothing selected"
  fullWidth
/>`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <Select
            displayEmpty
            options={BASIC_OPTIONS}
            value={emptyValue}
            onChange={setEmptyValue}
            renderValue={(v) => `Selected: ${v}`}
            placeholder="Nothing selected"
            fullWidth
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Open effects"
        description="Menu stays on the trigger. Choose the enter animation."
        code={`<Select openEffect="slide-down" options={options} />`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <Select
            options={BASIC_OPTIONS}
            value={value}
            onChange={setValue}
            placeholder="slide-down"
            openEffect="slide-down"
            fullWidth
          />
        </div>
      </ComponentPreview>

      <PropsTable
        title="Props"
        rows={[
          { name: 'options', type: 'SelectOption[]', default: 'Required', description: 'Array of { value, label, disabled? }' },
          { name: 'value', type: 'string', description: 'Selected value' },
          { name: 'onChange', type: '(value: string) => void', description: 'Change handler' },
          { name: 'placeholder', type: 'string', default: 'Select an option', description: 'Placeholder text' },
          { name: 'label', type: 'string', description: 'Label text' },
          { name: 'error', type: 'string', description: 'Error message' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Select size' },
          { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Full width select' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
          { name: 'native', type: 'boolean', default: 'false', description: 'Render a native HTML select' },
          { name: 'displayEmpty', type: 'boolean', default: 'false', description: 'Show empty/placeholder when value is empty' },
          { name: 'renderValue', type: '(value: string) => ReactNode', description: 'Custom closed-trigger display for custom Select' },
          { name: 'openEffect', type: "'none' | 'fade' | 'slide-down' | 'scale'", default: 'slide-down', description: 'Menu open animation; menu stays on the trigger while scrolling' },
        ]}
      />
    </div>
  );
};

export default SelectPage;
