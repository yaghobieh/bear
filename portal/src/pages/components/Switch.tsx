import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const SwitchPage: FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Switch</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Toggle switch for binary on/off choices.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Switch } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple toggle switch."
        code={`const [checked, setChecked] = useState(false);

<Switch checked={checked} onChange={setChecked} />`}
      >
        <div className="flex justify-center">
          <button
            role="switch"
            aria-checked={checked}
            onClick={() => setChecked(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              checked ? 'bg-bear-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                checked ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Switch with associated label."
        code={`<Switch label="Enable notifications" />
<Switch label="Dark mode" labelPlacement="start" />`}
      >
        <div className="flex flex-col gap-4 items-center">
          <label className="flex items-center gap-3 cursor-pointer">
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-bear-500">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </button>
            <span className="text-gray-700 dark:text-gray-300">Enable notifications</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-gray-700 dark:text-gray-300">Dark mode</span>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
            </button>
          </label>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different switch sizes."
        code={`<Switch size="sm" />
<Switch size="md" />
<Switch size="lg" />`}
      >
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <button className="relative inline-flex h-4 w-8 items-center rounded-full bg-bear-500 mb-2">
              <span className="inline-block h-3 w-3 transform rounded-full bg-white translate-x-4" />
            </button>
            <p className="text-xs text-gray-500">sm</p>
          </div>
          <div className="text-center">
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-bear-500 mb-2">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </button>
            <p className="text-xs text-gray-500">md</p>
          </div>
          <div className="text-center">
            <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-bear-500 mb-2">
              <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-7" />
            </button>
            <p className="text-xs text-gray-500">lg</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Different color variants."
        code={`<Switch color="primary" />
<Switch color="secondary" />
<Switch color="success" />
<Switch color="warning" />`}
      >
        <div className="flex items-center justify-center gap-4">
          {[
            { color: 'bg-bear-500', label: 'primary' },
            { color: 'bg-purple-500', label: 'secondary' },
            { color: 'bg-green-500', label: 'success' },
            { color: 'bg-amber-500', label: 'warning' },
          ].map(({ color, label }) => (
            <div key={label} className="text-center">
              <button className={`relative inline-flex h-6 w-11 items-center rounded-full ${color} mb-2`}>
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled switch state."
        code={`<Switch disabled />
<Switch disabled checked />`}
      >
        <div className="flex items-center justify-center gap-6">
          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed">
            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
          </button>
          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-bear-300 opacity-50 cursor-not-allowed">
            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
          </button>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">checked</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Checked state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(checked: boolean) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Change handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Switch size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | secondary | success | warning</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disabled state</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SwitchPage;
