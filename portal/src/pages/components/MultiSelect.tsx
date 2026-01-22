import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const MultiSelectPage: FC = () => {
  const [selected, setSelected] = useState<string[]>(['React', 'TypeScript']);

  const handleRemove = (tag: string) => {
    setSelected(prev => prev.filter(t => t !== tag));
  };

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">MultiSelect</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Select multiple values with tag-style display.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { MultiSelect } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Select multiple items from a dropdown."
        code={`const options = ['React', 'Vue', 'Angular', 'Svelte'];

<MultiSelect
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Select frameworks..."
/>`}
      >
        <div className="max-w-md mx-auto">
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 min-h-[42px] flex flex-wrap gap-2">
            {selected.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md text-sm"
              >
                {tag}
                <button
                  onClick={() => handleRemove(tag)}
                  className="hover:text-bear-900 dark:hover:text-bear-100"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder={selected.length === 0 ? 'Select frameworks...' : ''}
              className="flex-1 min-w-[100px] bg-transparent border-none focus:outline-none text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Chips"
        description="Display selected values as colored chips."
        code={`<MultiSelect
  options={options}
  value={selected}
  variant="chips"
  chipColor="primary"
/>`}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {['Design', 'Development', 'Marketing', 'Sales'].map((tag, i) => {
            const colors = [
              'bg-bear-500 text-white',
              'bg-purple-500 text-white',
              'bg-green-500 text-white',
              'bg-blue-500 text-white',
            ];
            return (
              <span
                key={tag}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${colors[i]}`}
              >
                {tag}
                <button className="hover:opacity-80">×</button>
              </span>
            );
          })}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Grouped Options"
        description="Organize options into groups."
        code={`const options = [
  { group: 'Frontend', items: ['React', 'Vue', 'Angular'] },
  { group: 'Backend', items: ['Node.js', 'Python', 'Go'] },
];

<MultiSelect options={options} groupBy="group" />`}
      >
        <div className="max-w-xs mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Frontend
          </div>
          {['React', 'Vue', 'Angular'].map(item => (
            <div key={item} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
              <input type="checkbox" className="rounded text-bear-500" defaultChecked={item === 'React'} />
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
          <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Backend
          </div>
          {['Node.js', 'Python', 'Go'].map(item => (
            <div key={item} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
              <input type="checkbox" className="rounded text-bear-500" />
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Maximum Selection"
        description="Limit the number of selected items."
        code={`<MultiSelect
  options={options}
  maxSelections={3}
  value={selected}
/>`}
      >
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg">
            <span className="text-lg">⚠️</span>
            <span className="text-sm">Maximum 3 items can be selected</span>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">options</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>T[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Available options</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>T[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected values</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(values: T[]) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Change handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>tags | chips</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">tags</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Display variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxSelections</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Maximum selections</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">groupBy</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Group options by key</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MultiSelectPage;

