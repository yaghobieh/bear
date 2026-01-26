import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { KilnLink } from '@/components/KilnLink';
import { ActiveBar } from '@forgedevstack/bear';

const ActiveBarPage: FC = () => {
  const [active1, setActive1] = useState('tab1');
  const [active2, setActive2] = useState('overview');

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ActiveBar</h1>
        <KilnLink path="/active-bar" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A navigation bar with an animated active indicator that slides between items.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { ActiveBar } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple tab navigation with sliding indicator."
        code={`const [activeId, setActiveId] = useState('tab1');

<ActiveBar
  activeId={activeId}
  items={[
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ]}
  onItemClick={(item) => setActiveId(item.id)}
/>`}
      >
        <ActiveBar
          activeId={active1}
          items={[
            { id: 'tab1', label: 'Tab 1' },
            { id: 'tab2', label: 'Tab 2' },
            { id: 'tab3', label: 'Tab 3' },
          ]}
          onItemClick={(item) => setActive1(item.id)}
        />
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="Items can include icons."
        code={`<ActiveBar
  activeId={activeId}
  items={[
    { id: 'overview', label: 'Overview', icon: <Icon name="home" /> },
    { id: 'analytics', label: 'Analytics', icon: <Icon name="chart" /> },
    { id: 'settings', label: 'Settings', icon: <Icon name="settings" /> },
  ]}
  onItemClick={(item) => setActiveId(item.id)}
/>`}
      >
        <ActiveBar
          activeId={active2}
          items={[
            { id: 'overview', label: 'Overview', icon: <span>📊</span> },
            { id: 'analytics', label: 'Analytics', icon: <span>📈</span> },
            { id: 'settings', label: 'Settings', icon: <span>⚙️</span> },
          ]}
          onItemClick={(item) => setActive2(item.id)}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Different visual styles."
        code={`<ActiveBar variant="default" ... />
<ActiveBar variant="pills" ... />
<ActiveBar variant="underline" ... />`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Default</p>
            <ActiveBar
              activeId={active1}
              items={[
                { id: 'tab1', label: 'Tab 1' },
                { id: 'tab2', label: 'Tab 2' },
                { id: 'tab3', label: 'Tab 3' },
              ]}
              onItemClick={(item) => setActive1(item.id)}
              variant="default"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Pills</p>
            <ActiveBar
              activeId={active1}
              items={[
                { id: 'tab1', label: 'Tab 1' },
                { id: 'tab2', label: 'Tab 2' },
                { id: 'tab3', label: 'Tab 3' },
              ]}
              onItemClick={(item) => setActive1(item.id)}
              variant="pills"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Underline</p>
            <ActiveBar
              activeId={active1}
              items={[
                { id: 'tab1', label: 'Tab 1' },
                { id: 'tab2', label: 'Tab 2' },
                { id: 'tab3', label: 'Tab 3' },
              ]}
              onItemClick={(item) => setActive1(item.id)}
              variant="underline"
            />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">items</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ActiveBarItem[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Array of navigation items</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">activeId</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">ID of the active item</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onItemClick</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(item: ActiveBarItem) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when item is clicked</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>'default' | 'pills' | 'underline'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'default'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>'sm' | 'md' | 'lg'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'md'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Size of the bar</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">fullWidth</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Stretch to full width</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">animated</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable animation</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">ActiveBarItem</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Property</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Unique identifier</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Display label</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Optional icon</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">badge</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string | number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Optional badge</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ActiveBarPage;
