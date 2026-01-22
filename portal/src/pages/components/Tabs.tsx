import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const TabsPage: FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tabs</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Organize content into multiple sections with tab navigation.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Tabs, Tab, TabPanel } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple tab navigation."
        code={`<Tabs value={activeTab} onChange={setActiveTab}>
  <Tab label="Tab 1" />
  <Tab label="Tab 2" />
  <Tab label="Tab 3" />
</Tabs>
<TabPanel value={activeTab} index={0}>Content 1</TabPanel>
<TabPanel value={activeTab} index={1}>Content 2</TabPanel>
<TabPanel value={activeTab} index={2}>Content 3</TabPanel>`}
      >
        <div>
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {['Overview', 'Features', 'Pricing'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === i
                    ? 'text-bear-600 dark:text-bear-400'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab}
                {activeTab === i && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bear-500" />
                )}
              </button>
            ))}
          </div>
          <div className="py-4">
            <p className="text-gray-600 dark:text-gray-400">
              {activeTab === 0 && 'This is the Overview content panel.'}
              {activeTab === 1 && 'This is the Features content panel.'}
              {activeTab === 2 && 'This is the Pricing content panel.'}
            </p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="Tabs with icons."
        code={`<Tabs>
  <Tab icon={<HomeIcon />} label="Home" />
  <Tab icon={<SettingsIcon />} label="Settings" />
  <Tab icon={<UserIcon />} label="Profile" />
</Tabs>`}
      >
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { icon: '🏠', label: 'Home' },
            { icon: '⚙️', label: 'Settings' },
            { icon: '👤', label: 'Profile' },
          ].map((tab, i) => (
            <button
              key={tab.label}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
                i === 0 ? 'text-bear-600 dark:text-bear-400 border-b-2 border-bear-500' : 'text-gray-500'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Contained Variant"
        description="Tabs with background highlight."
        code={`<Tabs variant="contained">
  <Tab label="Tab 1" />
  <Tab label="Tab 2" />
</Tabs>`}
      >
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {['Daily', 'Weekly', 'Monthly'].map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                i === 1
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Vertical Tabs"
        description="Tabs arranged vertically."
        code={`<Tabs orientation="vertical">
  <Tab label="General" />
  <Tab label="Security" />
  <Tab label="Notifications" />
</Tabs>`}
      >
        <div className="flex gap-6">
          <div className="flex flex-col border-r border-gray-200 dark:border-gray-700 pr-4">
            {['General', 'Security', 'Notifications', 'Privacy'].map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm text-left transition-colors ${
                  i === 0
                    ? 'text-bear-600 dark:text-bear-400 border-r-2 border-bear-500 font-medium'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1">
            <p className="text-gray-600 dark:text-gray-400">General settings content appears here.</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled Tab"
        description="Tabs can be disabled."
        code={`<Tabs>
  <Tab label="Active" />
  <Tab label="Disabled" disabled />
  <Tab label="Active" />
</Tabs>`}
      >
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button className="px-4 py-3 font-medium text-sm text-bear-600 dark:text-bear-400 border-b-2 border-bear-500">
            Active
          </button>
          <button className="px-4 py-3 font-medium text-sm text-gray-300 dark:text-gray-600 cursor-not-allowed">
            Disabled
          </button>
          <button className="px-4 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            Active
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">0</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Active tab index</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: number) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Tab change handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>underline | contained</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">underline</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Tab style variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">orientation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>horizontal | vertical</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">horizontal</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Tab orientation</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">fullWidth</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Full width tabs</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TabsPage;
