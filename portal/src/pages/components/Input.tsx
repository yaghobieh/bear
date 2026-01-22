import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const InputPage: FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Input</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Text input field with various styles and validation states.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Input } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple text input with placeholder."
        code={`<Input placeholder="Enter your name..." />`}
      >
        <div className="max-w-xs mx-auto">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your name..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bear-500 focus:border-transparent transition-all"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Different input styles."
        code={`<Input variant="outlined" placeholder="Outlined" />
<Input variant="filled" placeholder="Filled" />
<Input variant="underlined" placeholder="Underlined" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <input
            type="text"
            placeholder="Outlined"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Filled"
            className="w-full px-4 py-2 border border-transparent rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Underlined"
            className="w-full px-4 py-2 border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:border-bear-500"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Input with floating or static label."
        code={`<Input label="Email" placeholder="john@example.com" />
<Input label="Password" type="password" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="States"
        description="Error, success, and disabled states."
        code={`<Input error errorMessage="This field is required" />
<Input success />
<Input disabled />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <div>
            <input
              type="text"
              placeholder="Error state"
              className="w-full px-4 py-2 border-2 border-red-500 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <p className="mt-1 text-sm text-red-500">This field is required</p>
          </div>
          <input
            type="text"
            placeholder="Success state"
            defaultValue="Valid input"
            className="w-full px-4 py-2 border-2 border-green-500 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Disabled"
            disabled
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="Input with start or end icons."
        code={`<Input startIcon={<SearchIcon />} placeholder="Search..." />
<Input endIcon={<ClearIcon />} placeholder="With clear button" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="With clear button"
              defaultValue="Some text"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Small, medium, and large inputs."
        code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <input
            type="text"
            placeholder="Small"
            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Medium"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Large"
            className="w-full px-5 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>outlined | filled | underlined</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">outlined</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Input style variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Input size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Input label</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">error</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Error state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">errorMessage</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Error message text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">startIcon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Icon at start</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">endIcon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Icon at end</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default InputPage;
