import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ChipPage: FC = () => {
  const [chips, setChips] = useState(['React', 'TypeScript', 'Tailwind']);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Chip</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Compact elements for tags, filters, and selections.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Chip } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple chip for displaying tags."
        code={`<Chip label="React" />`}
      >
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-bear-100 text-bear-700 rounded-full text-sm font-medium dark:bg-bear-900 dark:text-bear-300">React</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium dark:bg-blue-900 dark:text-blue-300">TypeScript</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium dark:bg-green-900 dark:text-green-300">Node.js</span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Deletable"
        description="Chips that can be removed by the user."
        code={`<Chip label="React" onDelete={() => handleDelete()} />`}
      >
        <div className="flex gap-2 flex-wrap">
          {chips.map((chip) => (
            <span key={chip} className="inline-flex items-center gap-1 px-3 py-1 bg-bear-100 text-bear-700 rounded-full text-sm font-medium dark:bg-bear-900 dark:text-bear-300">
              {chip}
              <button 
                onClick={() => setChips(c => c.filter(x => x !== chip))}
                className="w-4 h-4 rounded-full hover:bg-bear-200 dark:hover:bg-bear-800 flex items-center justify-center"
              >
                ×
              </button>
            </span>
          ))}
          {chips.length === 0 && (
            <button onClick={() => setChips(['React', 'TypeScript', 'Tailwind'])} className="text-sm text-bear-500">Reset</button>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Different visual styles."
        code={`<Chip variant="filled" label="Filled" />
<Chip variant="outlined" label="Outlined" />
<Chip variant="soft" label="Soft" />`}
      >
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-bear-500 text-white rounded-full text-sm font-medium">Filled</span>
          <span className="px-3 py-1 border border-bear-500 text-bear-500 rounded-full text-sm font-medium">Outlined</span>
          <span className="px-3 py-1 bg-bear-100 text-bear-700 rounded-full text-sm font-medium dark:bg-bear-900 dark:text-bear-300">Soft</span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icon"
        description="Include an icon with the chip."
        code={`<Chip icon={<CheckIcon />} label="Verified" />`}
      >
        <div className="flex gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium dark:bg-green-900 dark:text-green-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Verified
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium dark:bg-yellow-900 dark:text-yellow-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            Warning
          </span>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Chip text content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>filled | outlined | soft</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">soft</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Chip size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Leading icon</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onDelete</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when delete is clicked</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ChipPage;

