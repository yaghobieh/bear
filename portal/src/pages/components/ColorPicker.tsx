import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ColorPickerPage: FC = () => {
  const [color, setColor] = useState('#E85D04');
  const presets = ['#E85D04', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F59E0B', '#EC4899', '#06B6D4'];

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">ColorPicker</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Allow users to select colors with presets or custom input.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { ColorPicker } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Color picker with native input and presets."
        code={`<ColorPicker value={color} onChange={setColor} />`}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-lg border-2 border-gray-200 dark:border-gray-600"
              style={{ backgroundColor: color }}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg w-28 font-mono text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Presets"
        description="Quick selection from predefined colors."
        code={`<ColorPicker presets={['#E85D04', '#3B82F6', ...]} />`}
      >
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {presets.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  color === c ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Selected:</span>
            <div 
              className="w-8 h-8 rounded"
              style={{ backgroundColor: color }}
            />
            <code className="text-sm text-gray-700 dark:text-gray-300">{color}</code>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">#000000</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected color (hex)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(color: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when color changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">presets</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Preset color options</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable the picker</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ColorPickerPage;

