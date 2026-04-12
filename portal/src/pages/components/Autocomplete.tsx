import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Autocomplete } from '@forgedevstack/bear';
import type { AutocompleteOption } from '@forgedevstack/bear';

const fruitOptions: AutocompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const countryOptions: AutocompleteOption[] = [
  { value: 'us', label: 'United States', description: '+1' },
  { value: 'uk', label: 'United Kingdom', description: '+44' },
  { value: 'de', label: 'Germany', description: '+49' },
];

const AutocompletePage: FC = () => {
  const [fruitValue, setFruitValue] = useState('');
  const [countryValue, setCountryValue] = useState('');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Autocomplete</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Text input with suggestions and typeahead functionality.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Autocomplete } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Type to filter suggestions. Menu renders in a portal above surrounding layout."
        allowOverflow
        code={`const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];

<Autocomplete
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Search fruits..."
/>`}
      >
        <div className="max-w-xs mx-auto w-full">
          <Autocomplete
            options={fruitOptions}
            value={fruitValue}
            onChange={setFruitValue}
            placeholder="Search fruits..."
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Object Options"
        description="Options use label, value, and optional description."
        allowOverflow
        code={`const options = [
  { value: 'us', label: 'United States', description: '+1' },
  { value: 'uk', label: 'United Kingdom', description: '+44' },
];

<Autocomplete
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select country..."
/>`}
      >
        <div className="max-w-xs mx-auto w-full">
          <Autocomplete
            options={countryOptions}
            value={countryValue}
            onChange={setCountryValue}
            placeholder="Select country..."
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Free Solo"
        description="Allow custom values not in options."
        allowOverflow
        code={`<Autocomplete options={options} value={value} onChange={setValue} freeSolo placeholder="Enter or select..." />`}
      >
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Normal</div>
            <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">
              Must match option
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Free Solo</div>
            <div className="px-3 py-1.5 bg-bear-100 dark:bg-bear-900/30 rounded text-sm text-bear-600 dark:text-bear-400">
              Any value allowed
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Async Loading"
        description="Fetch options from API."
        code={`<Autocomplete
  options={async (query) => {
    const res = await fetch(\`/api/search?q=\${query}\`);
    return res.json();
  }}
  loading={isLoading}
/>`}
      >
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="animate-spin w-5 h-5 border-2 border-bear-500 border-t-transparent rounded-full" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Loading options...</span>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">options</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>AutocompleteOption[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Options list</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">''</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Input value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">—</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Change handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onSelect</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(option) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">—</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">When a row is picked</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">freeSolo</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Allow custom values</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">loading</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Loading indicator</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AutocompletePage;
