import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Cascader } from '@forgedevstack/bear';
import type { CascaderOption } from '@forgedevstack/bear';

const CASCADER_OPTIONS: CascaderOption[] = [
  {
    value: 'electronics',
    label: 'Electronics',
    children: [
      { value: 'phones', label: 'Phones', children: [{ value: 'iphone', label: 'iPhone' }, { value: 'android', label: 'Android' }] },
      { value: 'laptops', label: 'Laptops', children: [{ value: 'macbook', label: 'MacBook' }, { value: 'windows', label: 'Windows' }] },
    ],
  },
  {
    value: 'clothing',
    label: 'Clothing',
    children: [
      { value: 'men', label: 'Men', children: [{ value: 'shirts', label: 'Shirts' }, { value: 'pants', label: 'Pants' }] },
      { value: 'women', label: 'Women', children: [{ value: 'dresses', label: 'Dresses' }, { value: 'shoes', label: 'Shoes' }] },
    ],
  },
];

const CascaderPage: FC = () => {
  const [value, setValue] = useState<string[]>([]);
  const [value2, setValue2] = useState<string[]>([]);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Cascader</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Hierarchical selection component for nested options. Click or hover to expand levels.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Cascader } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Hierarchical selection with click to expand."
        code={`<Cascader
  options={[
    { value: 'electronics', label: 'Electronics', children: [...] },
    { value: 'clothing', label: 'Clothing', children: [...] },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Select option"
/>`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <Cascader options={CASCADER_OPTIONS} value={value} onChange={setValue} placeholder="Select option" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Expand on Hover"
        description="Use expandTrigger=&quot;hover&quot; to expand on hover."
        code={`<Cascader
  options={options}
  value={value}
  onChange={setValue}
  expandTrigger="hover"
/>`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <Cascader options={CASCADER_OPTIONS} value={value2} onChange={setValue2} expandTrigger="hover" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Cascader with label and showFullPath."
        code={`<Cascader
  label="Category"
  options={options}
  value={value}
  onChange={setValue}
  showFullPath
  pathSeparator=" > "
/>`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <Cascader
            label="Category"
            options={CASCADER_OPTIONS}
            value={value}
            onChange={setValue}
            showFullPath
            pathSeparator=" > "
          />
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
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">options</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>CascaderOption[]</code></td><td>Hierarchical options</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string[]</code></td><td>Selected path</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value, selectedOptions) =&gt; void</code></td><td>Change handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">expandTrigger</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>&apos;click&apos; | &apos;hover&apos;</code></td><td>How to expand</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showFullPath</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td>Show full path in trigger</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">changeOnSelect</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td>Allow selecting parent</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CascaderPage;
