import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Sidebar as BearSidebar } from '@forgedevstack/bear';

// Simple inline icons for the demo
const HomeIconSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const UsersIconSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const SettingsIconSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);
const InfoIconSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

const SidebarPage: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('home');

  const basicItems: SidebarItem[] = [
    { id: 'home', label: 'Home', icon: <HomeIconSvg /> },
    { id: 'users', label: 'Users', icon: <UsersIconSvg /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIconSvg /> },
    { id: 'about', label: 'About', icon: <InfoIconSvg /> },
  ];

  const nestedItems: SidebarItem[] = [
    { id: 'home', label: 'Home', icon: <HomeIconSvg /> },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: <SettingsIconSvg />,
      children: [
        { id: 'profile', label: 'Profile' },
        { id: 'security', label: 'Security' },
        { id: 'notifications', label: 'Notifications' },
      ],
    },
  ];

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Sidebar</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Collapsible navigation sidebar with nested items and customizable styling.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Sidebar, SidebarGroup } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Navigation sidebar with icons and active state."
        code={`const items = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'users', label: 'Users', icon: <UsersIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

<Sidebar
  items={items}
  activeItemId={active}
  onItemClick={(item) => setActive(item.id)}
  header={<span className="font-bold text-lg">My App</span>}
/>`}
      >
        <div className="h-80 border rounded-lg overflow-hidden">
          <BearSidebar
            items={basicItems}
            activeItemId={active}
            onItemClick={(item) => setActive(item.id)}
            header={<span className="bear-font-bold bear-text-lg">My App</span>}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Collapsible"
        description="Sidebar with collapse/expand functionality."
        code={`<Sidebar
  items={items}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  activeItemId={active}
  header={<span>Logo</span>}
/>`}
      >
        <div className="h-80 border rounded-lg overflow-hidden">
          <BearSidebar
            items={basicItems}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            activeItemId={active}
            onItemClick={(item) => setActive(item.id)}
            header={<span className="bear-font-bold">Logo</span>}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Nested Items"
        description="Sidebar with expandable nested menu items."
        code={`const items = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: <SettingsIcon />,
    children: [
      { id: 'profile', label: 'Profile' },
      { id: 'security', label: 'Security' },
    ],
  },
];

<Sidebar items={items} />`}
      >
        <div className="h-80 border rounded-lg overflow-hidden">
          <BearSidebar
            items={nestedItems}
            activeItemId={active}
            onItemClick={(item) => setActive(item.id)}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Different sidebar styles: default, bordered, floating."
        code={`<Sidebar items={items} variant="default" />
<Sidebar items={items} variant="bordered" />
<Sidebar items={items} variant="floating" />`}
      >
        <div className="flex gap-4 h-64">
          <div className="border rounded-lg overflow-hidden">
            <BearSidebar items={basicItems.slice(0, 2)} variant="default" header="Default" />
          </div>
          <div className="border rounded-lg overflow-hidden">
            <BearSidebar items={basicItems.slice(0, 2)} variant="bordered" header="Bordered" />
          </div>
          <div className="border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <BearSidebar items={basicItems.slice(0, 2)} variant="floating" header="Floating" />
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
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">items</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>SidebarItem[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Navigation items array</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">collapsed</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Collapsed state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onCollapsedChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(collapsed: boolean) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Collapse toggle callback</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">width</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Expanded width (default: 256)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">collapsedWidth</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Collapsed width (default: 64)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">header</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Header content (logo, title)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">footer</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Footer content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">activeItemId</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Active item ID for highlighting</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>"default" | "bordered" | "floating"</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">position</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>"left" | "right"</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Sidebar position (default: left)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SidebarPage;

