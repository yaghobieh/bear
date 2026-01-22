import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const SliderPage: FC = () => {
  const [value1, setValue1] = useState(50);
  const [value2, setValue2] = useState(30);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Slider</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Range input component for selecting values within a range.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Slider } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple slider with default settings."
        code={`<Slider value={50} onChange={(val) => setValue(val)} />`}
      >
        <div className="w-full max-w-md">
          <input
            type="range"
            min={0}
            max={100}
            value={value1}
            onChange={(e) => setValue1(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-bear-500"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>0</span>
            <span className="font-medium text-bear-600">{value1}</span>
            <span>100</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Value Display"
        description="Show the current value while dragging."
        code={`<Slider value={30} showValue onChange={(val) => setValue(val)} />`}
      >
        <div className="w-full max-w-md">
          <div className="relative">
            <input
              type="range"
              min={0}
              max={100}
              value={value2}
              onChange={(e) => setValue2(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-bear-500"
            />
            <div 
              className="absolute -top-8 px-2 py-1 bg-gray-900 text-white text-xs rounded transform -translate-x-1/2 pointer-events-none"
              style={{ left: `${value2}%` }}
            >
              {value2}
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Different color variants."
        code={`<Slider color="primary" />
<Slider color="success" />
<Slider color="warning" />
<Slider color="error" />`}
      >
        <div className="w-full max-w-md space-y-6">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Primary</label>
            <input type="range" defaultValue={50} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-bear-500" />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Success</label>
            <input type="range" defaultValue={70} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500" />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Warning</label>
            <input type="range" defaultValue={40} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Error</label>
            <input type="range" defaultValue={20} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">0</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Current value (controlled)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">min</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">0</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Minimum value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">max</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">100</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Maximum value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">step</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">1</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Step increment</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>BearVariant</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color theme</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showValue</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show value tooltip</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">marks</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean | Mark[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show marks on track</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: number) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when value changes</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SliderPage;

