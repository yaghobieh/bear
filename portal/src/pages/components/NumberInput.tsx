import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const NumberInputPage: FC = () => {
  const [value, setValue] = useState(5);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">NumberInput</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Input field specifically designed for numeric values with increment/decrement controls.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { NumberInput } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Number input with stepper controls."
        code={`<NumberInput value={5} onChange={setValue} />`}
      >
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setValue(v => v - 1)}
            className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-lg font-bold text-gray-700 dark:text-gray-300"
          >
            −
          </button>
          <input 
            type="number" 
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-20 text-center py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <button 
            onClick={() => setValue(v => v + 1)}
            className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-lg font-bold text-gray-700 dark:text-gray-300"
          >
            +
          </button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Min/Max"
        description="Restrict values to a specific range."
        code={`<NumberInput min={0} max={10} value={value} onChange={setValue} />`}
      >
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setValue(v => Math.max(0, v - 1))}
            disabled={value <= 0}
            className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 text-lg font-bold text-gray-700 dark:text-gray-300"
          >
            −
          </button>
          <input 
            type="number" 
            value={value}
            min={0}
            max={10}
            onChange={(e) => setValue(Math.min(10, Math.max(0, Number(e.target.value))))}
            className="w-20 text-center py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <button 
            onClick={() => setValue(v => Math.min(10, v + 1))}
            disabled={value >= 10}
            className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 text-lg font-bold text-gray-700 dark:text-gray-300"
          >
            +
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">Range: 0 - 10</p>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">0</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Current value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: number) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when value changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">min</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Minimum value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">max</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Maximum value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">step</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">1</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Step increment</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable the input</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default NumberInputPage;

