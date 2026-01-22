import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const AutocompletePage: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
  const filteredOptions = options.filter(o => o.toLowerCase().includes(inputValue.toLowerCase()));

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
        description="Type to filter suggestions."
        code={`const options = ['Apple', 'Banana', 'Cherry', 'Date'];

<Autocomplete
  options={options}
  placeholder="Search fruits..."
  onChange={(value) => console.log(value)}
/>`}
      >
        <div className="max-w-xs mx-auto relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            placeholder="Search fruits..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bear-500 focus:border-transparent"
          />
          {showDropdown && inputValue && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => setInputValue(option)}
                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {option}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Object Options"
        description="Use objects with label and value."
        code={`const options = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
];

<Autocomplete
  options={options}
  getOptionLabel={(opt) => opt.label}
  onChange={(value) => console.log(value)}
/>`}
      >
        <div className="max-w-xs mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Select country..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
              {[
                { flag: '🇺🇸', name: 'United States' },
                { flag: '🇬🇧', name: 'United Kingdom' },
                { flag: '🇩🇪', name: 'Germany' },
              ].map(c => (
                <div key={c.name} className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <span>{c.flag}</span>
                  <span className="text-gray-700 dark:text-gray-300">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Free Solo"
        description="Allow custom values not in options."
        code={`<Autocomplete
  options={options}
  freeSolo
  placeholder="Enter or select..."
/>`}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">options</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>T[] | (query: string) =&gt; Promise&lt;T[]&gt;</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Options array or async function</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>T | null</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">null</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: T | null) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Change handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">getOptionLabel</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(option: T) =&gt; string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Get label for object options</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">freeSolo</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Allow custom values</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">loading</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show loading state</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AutocompletePage;

