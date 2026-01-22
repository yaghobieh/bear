import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ButtonGroupPage: FC = () => {
  const [selected, setSelected] = useState('center');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">ButtonGroup</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Group related buttons together with connected styling.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { ButtonGroup, Button } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Group buttons with shared borders."
        code={`<ButtonGroup>
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>`}
      >
        <div className="flex justify-center">
          <div className="inline-flex rounded-lg overflow-hidden border border-bear-500">
            {['Left', 'Center', 'Right'].map((label, i) => (
              <button
                key={label}
                onClick={() => setSelected(label.toLowerCase())}
                className={`px-4 py-2 transition-colors ${
                  selected === label.toLowerCase()
                    ? 'bg-bear-500 text-white'
                    : 'bg-bear-500/10 text-bear-500 hover:bg-bear-500/20'
                } ${i > 0 ? 'border-l border-bear-500/30' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Outline Variant"
        description="Outlined button group style."
        code={`<ButtonGroup variant="outline">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>`}
      >
        <div className="flex justify-center">
          <div className="inline-flex">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg">One</button>
            <button className="px-4 py-2 border-t border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Two</button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg">Three</button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different button group sizes."
        code={`<ButtonGroup size="sm">...</ButtonGroup>
<ButtonGroup size="md">...</ButtonGroup>
<ButtonGroup size="lg">...</ButtonGroup>`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex rounded overflow-hidden border border-bear-500">
            <button className="px-2 py-1 text-xs bg-bear-500 text-white">S</button>
            <button className="px-2 py-1 text-xs bg-bear-500/10 text-bear-500 border-l border-bear-500/30">M</button>
            <button className="px-2 py-1 text-xs bg-bear-500/10 text-bear-500 border-l border-bear-500/30">L</button>
          </div>
          <div className="inline-flex rounded-lg overflow-hidden border border-bear-500">
            <button className="px-4 py-2 bg-bear-500 text-white">S</button>
            <button className="px-4 py-2 bg-bear-500/10 text-bear-500 border-l border-bear-500/30">M</button>
            <button className="px-4 py-2 bg-bear-500/10 text-bear-500 border-l border-bear-500/30">L</button>
          </div>
          <div className="inline-flex rounded-xl overflow-hidden border border-bear-500">
            <button className="px-6 py-3 text-lg bg-bear-500 text-white">S</button>
            <button className="px-6 py-3 text-lg bg-bear-500/10 text-bear-500 border-l border-bear-500/30">M</button>
            <button className="px-6 py-3 text-lg bg-bear-500/10 text-bear-500 border-l border-bear-500/30">L</button>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | outline | ghost</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Button size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">orientation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>horizontal | vertical</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">horizontal</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Button layout</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ButtonGroupPage;

