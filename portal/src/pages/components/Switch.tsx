import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Switch } from '@forgedevstack/bear';

const SwitchPage: FC = () => {
  const [checked, setChecked] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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

<Switch checked={checked} onCheckedChange={setChecked} />`}
      >
        <div className="flex justify-center">
          <Switch checked={checked} onCheckedChange={setChecked} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Switch with label text."
        code={`<Switch 
  label="Enable notifications" 
  checked={notifications} 
  onCheckedChange={setNotifications} 
/>`}
      >
        <div className="flex flex-col gap-4 items-start mx-auto max-w-xs">
          <Switch 
            label="Enable notifications" 
            checked={notifications} 
            onCheckedChange={setNotifications} 
          />
          <Switch 
            label="Dark mode" 
            checked={darkMode} 
            onCheckedChange={setDarkMode} 
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Available switch sizes."
        code={`<Switch size="sm" label="Small" />
<Switch size="md" label="Medium" />
<Switch size="lg" label="Large" />`}
      >
        <div className="flex flex-col gap-4 items-start mx-auto max-w-xs">
          <Switch size="sm" label="Small switch" defaultChecked />
          <Switch size="md" label="Medium switch" defaultChecked />
          <Switch size="lg" label="Large switch" defaultChecked />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="Switch with custom icons."
        code={`<Switch 
  label="Theme" 
  checkedIcon={<span>🌙</span>}
  uncheckedIcon={<span>☀️</span>}
/>`}
      >
        <div className="flex flex-col gap-4 items-start mx-auto max-w-xs">
          <Switch 
            label="Theme mode"
            checkedIcon={<span>🌙</span>}
            uncheckedIcon={<span>☀️</span>}
            defaultChecked
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled switch states."
        code={`<Switch label="Disabled off" disabled />
<Switch label="Disabled on" disabled defaultChecked />`}
      >
        <div className="flex flex-col gap-4 items-start mx-auto max-w-xs">
          <Switch label="Disabled off" disabled />
          <Switch label="Disabled on" disabled defaultChecked />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">checked</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">defaultChecked</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Initial state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onCheckedChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(checked: boolean) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Change handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Switch size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">checkedIcon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Icon when checked</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">uncheckedIcon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Icon when unchecked</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disabled state</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SwitchPage;
