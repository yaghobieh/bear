import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const MOCK_COLORS = [
  { bg: 'bg-red-500' },
  { bg: 'bg-orange-500' },
  { bg: 'bg-yellow-500' },
  { bg: 'bg-green-500' },
  { bg: 'bg-blue-500' },
  { bg: 'bg-violet-500' },
  { bg: 'bg-pink-500' },
];

const ColorSwatchPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">ColorSwatch & ColorSwatchGroup</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Color palette selection with single or multi-select support.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { ColorSwatch, ColorSwatchGroup } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Single Swatches"
        description="Individual color swatches."
        code={`<ColorSwatch color="#ef4444" />
<ColorSwatch color="#22c55e" selected />
<ColorSwatch color="#3b82f6" size="lg" />`}
      >
        <div className="flex flex-wrap gap-3 items-center">
          <div className="h-8 w-8 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-red-500" />
          <div className="h-8 w-8 rounded-full border-2 border-bear-500 ring-2 ring-bear-200 dark:ring-bear-800 bg-green-500" />
          <div className="h-10 w-10 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-blue-500" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Group Selection"
        description="Select one color from a group."
        code={`<ColorSwatchGroup
  colors={['#ef4444', '#f97316', '#22c55e', '#3b82f6']}
  value={selected}
  onChange={setSelected}
/>`}
      >
        <div className="flex flex-wrap gap-2">
          {MOCK_COLORS.map(({ bg }, i) => (
            <div
              key={bg}
              className={`h-9 w-9 rounded-full border-2 cursor-pointer transition-all ${bg} ${
                i === 2 ? 'border-bear-500 ring-2 ring-bear-200 dark:ring-bear-800 scale-110' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Multi-Select"
        description="Select multiple colors."
        code={`<ColorSwatchGroup
  colors={colors}
  value={selected}
  onChange={setSelected}
  multiple
/>`}
      >
        <div className="flex flex-wrap gap-2">
          {MOCK_COLORS.map(({ bg }, i) => (
            <div
              key={bg}
              className={`h-9 w-9 rounded-full border-2 cursor-pointer transition-all flex items-center justify-center ${bg} ${
                [0, 2, 4].includes(i) ? 'border-bear-500 ring-2 ring-bear-200 dark:ring-bear-800' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              {[0, 2, 4].includes(i) && (
                <svg className="w-4 h-4 text-white drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Labels"
        description="Swatches with color labels."
        code={`<ColorSwatch color="#ef4444" label="Red" showLabel />
<ColorSwatchGroup colors={colors} showLabel />`}
      >
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="h-10 w-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-red-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Red</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-10 w-10 rounded-lg border-2 border-bear-500 bg-green-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Green</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-10 w-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-blue-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Blue</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Grid Layout"
        description="Swatches in a grid with custom columns."
        code={`<ColorSwatchGroup
  colors={colors}
  columns={4}
  gap="md"
  rounded
/>`}
      >
        <div className="grid grid-cols-4 gap-3 max-w-xs">
          {MOCK_COLORS.map(({ bg }) => (
            <div
              key={bg}
              className={`h-10 w-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 cursor-pointer transition-colors ${bg}`}
            />
          ))}
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Component</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatch</td><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color value (hex, rgb, etc.)</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatch</td><td className="px-4 py-3 font-mono text-bear-600">selected</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Whether swatch is selected</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatch</td><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39; | &#39;xl&#39;</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Swatch size</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatch</td><td className="px-4 py-3 font-mono text-bear-600">rounded</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Use rounded corners</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatch</td><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label text</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatch</td><td className="px-4 py-3 font-mono text-bear-600">onClick</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Click handler</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatchGroup</td><td className="px-4 py-3 font-mono text-bear-600">colors</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Array of color values</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatchGroup</td><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string | string[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected value(s)</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatchGroup</td><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Change handler</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatchGroup</td><td className="px-4 py-3 font-mono text-bear-600">multiple</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Allow multiple selection</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatchGroup</td><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Swatch size</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatchGroup</td><td className="px-4 py-3 font-mono text-bear-600">rounded</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Rounded swatches</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatchGroup</td><td className="px-4 py-3 font-mono text-bear-600">gap</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Gap between swatches</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatchGroup</td><td className="px-4 py-3 font-mono text-bear-600">columns</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Grid columns</td></tr>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ColorSwatchGroup</td><td className="px-4 py-3 font-mono text-bear-600">showLabel</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show color labels</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ColorSwatchPage;
