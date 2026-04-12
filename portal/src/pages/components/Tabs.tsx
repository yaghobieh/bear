import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Tabs, TabList, Tab, TabPanel, Typography } from '@forgedevstack/bear';
import { CODE_BASIC, CODE_LIMIT, CODE_WRAP, CODE_PILLS, CODE_DISABLED } from './Tabs.code';

const TAB_IDS = ['overview', 'features', 'pricing', 'docs', 'support', 'blog', 'about', 'contact'];

const TabsPage: FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tabs</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Tabbed interface with <strong>TabList</strong>, <strong>Tab</strong>, and <strong>TabPanel</strong>. Use <code className="bear-px-1 bear-py-0.5 bear-rounded bear-bg-gray-200 dark:bear-bg-zinc-700 bear-text-sm">maxVisibleTabs</code> to limit visible tabs and show the rest in a &quot;…&quot; dropdown (selected tab moves to first). Use <code className="bear-px-1 bear-py-0.5 bear-rounded bear-bg-gray-200 dark:bear-bg-zinc-700 bear-text-sm">wrap</code> so tabs break to the next line without breakpoints.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Tabs, TabList, Tab, TabPanel } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          API: <a href="/api/tabs" className="text-pink-600 dark:text-pink-400 hover:underline">Tabs API</a> (maxVisibleTabs, wrap, overflow dropdown).
        </p>
      </section>

      <ComponentPreview
        title="Basic usage"
        description="Controlled tabs with id-based panels. variant line | pills | enclosed."
        code={CODE_BASIC}
      >
        <Tabs value={activeTab} defaultTab="overview" onChange={setActiveTab} variant="line">
          <TabList>
            <Tab id="overview">Overview</Tab>
            <Tab id="features">Features</Tab>
            <Tab id="pricing">Pricing</Tab>
          </TabList>
          <TabPanel tabId="overview">
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">Overview content panel.</Typography>
          </TabPanel>
          <TabPanel tabId="features">
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">Features content panel.</Typography>
          </TabPanel>
          <TabPanel tabId="pricing">
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">Pricing content panel.</Typography>
          </TabPanel>
        </Tabs>
      </ComponentPreview>

      <ComponentPreview
        title="Limit visible tabs (maxVisibleTabs) + overflow dropdown"
        description={'Show at most N tabs; the rest in a "⋯" menu. The menu stays visible (scroll the tab row on narrow widths). Resize the viewport to see breakpoint-based limits in the next example.'}
        code={CODE_LIMIT}
        allowOverflow
      >
        <Tabs value={activeTab} defaultTab="overview" onChange={setActiveTab} variant="pills">
          <TabList maxVisibleTabs={5}>
            {TAB_IDS.map((id) => (
              <Tab key={id} id={id}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Tab>
            ))}
          </TabList>
          {TAB_IDS.map((id) => (
            <TabPanel key={id} tabId={id}>
              <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                Content for {id}. When this tab was chosen from the &quot;…&quot; dropdown, it moved to the first visible slot.
              </Typography>
            </TabPanel>
          ))}
        </Tabs>
      </ComponentPreview>

      <ComponentPreview
        title="maxVisibleTabs by theme breakpoints"
        description="Object form: mobile &lt; md, tablet md–lg, desktop ≥ lg from Bear theme.breakpoints. Optional custom overrides all."
        code={`<TabList
  maxVisibleTabs={{
    mobile: 3,
    tablet: 4,
    desktop: 5,
    custom: 10,
  }}
>
  ...
</TabList>`}
        allowOverflow
      >
        <Tabs value={activeTab} defaultTab="overview" onChange={setActiveTab} variant="pills">
          <TabList
            maxVisibleTabs={{
              mobile: 3,
              tablet: 4,
              desktop: 5,
            }}
          >
            {TAB_IDS.map((id) => (
              <Tab key={id} id={id}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Tab>
            ))}
          </TabList>
          {TAB_IDS.map((id) => (
            <TabPanel key={id} tabId={id}>
              <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                Content for {id} (responsive max visible).
              </Typography>
            </TabPanel>
          ))}
        </Tabs>
      </ComponentPreview>

      <ComponentPreview
        title="Wrap (auto-break, no breakpoints)"
        description="TabList with wrap: tabs flow to the next line when they don't fit. No media queries."
        code={CODE_WRAP}
      >
        <Tabs defaultTab="a" variant="pills">
          <TabList wrap className="bear-max-w-md">
            {['a', 'b', 'c', 'd', 'e', 'f'].map((id) => (
              <Tab key={id} id={id}>Tab {id.toUpperCase()}</Tab>
            ))}
          </TabList>
          <TabPanel tabId="a"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Panel A</Typography></TabPanel>
          <TabPanel tabId="b"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Panel B</Typography></TabPanel>
          <TabPanel tabId="c"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Panel C</Typography></TabPanel>
          <TabPanel tabId="d"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Panel D</Typography></TabPanel>
          <TabPanel tabId="e"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Panel E</Typography></TabPanel>
          <TabPanel tabId="f"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Panel F</Typography></TabPanel>
        </Tabs>
      </ComponentPreview>

      <ComponentPreview
        title="Variants: line, pills, enclosed"
        description="line = underline; pills = rounded background; enclosed = bordered top."
        code={CODE_PILLS}
      >
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">variant=&quot;line&quot;</p>
            <Tabs defaultTab="l1" variant="line">
              <TabList>
                <Tab id="l1">Tab 1</Tab>
                <Tab id="l2">Tab 2</Tab>
              </TabList>
              <TabPanel tabId="l1"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Line content 1</Typography></TabPanel>
              <TabPanel tabId="l2"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Line content 2</Typography></TabPanel>
            </Tabs>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">variant=&quot;pills&quot;</p>
            <Tabs defaultTab="p1" variant="pills">
              <TabList>
                <Tab id="p1">Tab 1</Tab>
                <Tab id="p2">Tab 2</Tab>
              </TabList>
              <TabPanel tabId="p1"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Pills content 1</Typography></TabPanel>
              <TabPanel tabId="p2"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Pills content 2</Typography></TabPanel>
            </Tabs>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">variant=&quot;enclosed&quot;</p>
            <Tabs defaultTab="e1" variant="enclosed">
              <TabList>
                <Tab id="e1">Tab 1</Tab>
                <Tab id="e2">Tab 2</Tab>
              </TabList>
              <TabPanel tabId="e1"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Enclosed content 1</Typography></TabPanel>
              <TabPanel tabId="e2"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Enclosed content 2</Typography></TabPanel>
            </Tabs>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled tab"
        description="Tab accepts disabled; overflow dropdown respects disabled state."
        code={CODE_DISABLED}
      >
        <Tabs defaultTab="active" variant="line">
          <TabList>
            <Tab id="active">Active</Tab>
            <Tab id="disabled" disabled>Disabled</Tab>
            <Tab id="other">Other</Tab>
          </TabList>
          <TabPanel tabId="active"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Active panel</Typography></TabPanel>
          <TabPanel tabId="disabled"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Disabled panel</Typography></TabPanel>
          <TabPanel tabId="other"><Typography variant="body2" className="text-gray-600 dark:text-gray-400">Other panel</Typography></TabPanel>
        </Tabs>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>

        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Tabs</h3>
        <div className="overflow-x-auto mb-8">
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled active tab id</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">defaultTab</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Initial tab when uncontrolled</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(tabId: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Tab change callback</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>line | pills | enclosed</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">line</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">List visual style (passed to TabList via context)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">className</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Root class</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">TabList</h3>
        <div className="overflow-x-auto mb-8">
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Tab</code> components</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxVisibleTabs</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | {'{'} mobile?, tablet?, desktop?, custom?{'}'}</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Cap visible tabs; rest in ⋯ menu. Breakpoints use <code className="text-xs">theme.breakpoints</code>. <code className="text-xs">custom</code> wins over breakpoints.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">wrap</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Multiline tabs (disables the horizontal scroll + flex split used with maxVisibleTabs)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">className</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Extra classes</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Tab / ActiveTab / TabPanel</h3>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">Tab</td><td className="px-4 py-3 font-mono text-bear-600">id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Required. Matches <code className="text-xs">tabId</code> on TabPanel</td></tr>
              <tr><td className="px-4 py-3">Tab</td><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td></tr>
              <tr><td className="px-4 py-3">Tab</td><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td></tr>
              <tr><td className="px-4 py-3">ActiveTab</td><td colSpan={3} className="px-4 py-3 text-gray-600 dark:text-gray-400">Same as <code className="text-xs">Tab</code> (exported alias for documentation tooling)</td></tr>
              <tr><td className="px-4 py-3">TabPanel</td><td className="px-4 py-3 font-mono text-bear-600">tabId</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Panel shown when this tab is active</td></tr>
              <tr><td className="px-4 py-3">TabPanel</td><td className="px-4 py-3 font-mono text-bear-600">className</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            With <code className="bear-px-1 bear-py-0.5 bear-rounded bear-bg-gray-200 dark:bear-bg-zinc-700">maxVisibleTabs</code>, the ⋯ control uses a portaled <code className="text-xs">Dropdown</code> (<code className="text-xs">z-index: 11000</code>). Use <code className="text-xs">allowOverflow</code> on demo cards if a parent uses <code className="text-xs">overflow: hidden</code>.
        </p>
      </section>
    </div>
  );
};

export default TabsPage;
