import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const PopoverPage: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Popover</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Display rich content in a floating panel triggered by user interaction.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Popover } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple popover with content."
        code={`<Popover
  trigger={<Button>Open Popover</Button>}
  content={<div>Popover content here</div>}
/>`}
      >
        <div className="relative inline-block">
          <button 
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-bear-500 text-white rounded-lg hover:bg-bear-600"
          >
            Click me
          </button>
          {open && (
            <div className="absolute top-full left-0 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 min-w-[200px]">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Popover Title</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">This is the popover content with more details.</p>
              <button 
                onClick={() => setOpen(false)}
                className="mt-3 text-sm text-bear-500 hover:underline"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Placements"
        description="Position the popover in different directions."
        code={`<Popover placement="top" ... />
<Popover placement="right" ... />
<Popover placement="bottom" ... />
<Popover placement="left" ... />`}
      >
        <div className="flex gap-4 flex-wrap justify-center">
          {['top', 'right', 'bottom', 'left'].map((pos) => (
            <div key={pos} className="relative group">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm capitalize">
                {pos}
              </button>
              <div className={`absolute opacity-0 group-hover:opacity-100 transition-opacity z-50 p-2 bg-gray-900 text-white text-xs rounded shadow-lg ${
                pos === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' :
                pos === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' :
                pos === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-2' :
                'left-full top-1/2 -translate-y-1/2 ml-2'
              }`}>
                Content
              </div>
            </div>
          ))}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">trigger</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Element that triggers the popover</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">content</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Popover content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">placement</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>top | right | bottom | left</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">bottom</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Position relative to trigger</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">isOpen</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled open state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onClose</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when popover closes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">offset</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">8</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Distance from trigger</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PopoverPage;

