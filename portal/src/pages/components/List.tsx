import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ListPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">List</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Lists are continuous, vertical indexes of text or images.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { List, ListItem, ListItemIcon } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple list with items."
        code={`<List>
  <ListItem primary="Inbox" secondary="You have 3 new messages" />
  <ListItem primary="Drafts" />
  <ListItem primary="Sent" secondary="Last sent: 2 days ago" />
</List>`}
      >
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
          {[
            { primary: 'Inbox', secondary: 'You have 3 new messages' },
            { primary: 'Drafts', secondary: null },
            { primary: 'Sent', secondary: 'Last sent: 2 days ago' },
          ].map((item, i) => (
            <div 
              key={item.primary} 
              className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${i > 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}`}
            >
              <div className="text-gray-900 dark:text-white">{item.primary}</div>
              {item.secondary && <div className="text-sm text-gray-500 dark:text-gray-400">{item.secondary}</div>}
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="List items with leading icons."
        code={`<List>
  <ListItem icon={<InboxIcon />} primary="Inbox" />
  <ListItem icon={<SendIcon />} primary="Sent" />
  <ListItem icon={<SettingsIcon />} primary="Settings" />
</List>`}
      >
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
          {[
            { icon: '📥', label: 'Inbox' },
            { icon: '📤', label: 'Sent' },
            { icon: '⚙️', label: 'Settings' },
          ].map((item, i) => (
            <div 
              key={item.label}
              className={`px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${i > 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-gray-900 dark:text-white">{item.label}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Selectable"
        description="List with selectable items."
        code={`<List>
  <ListItem 
    primary="Item 1" 
    selected={selected === 'item1'}
    onClick={() => setSelected('item1')}
  />
  <ListItem 
    primary="Item 2"
    selected={selected === 'item2'}
    onClick={() => setSelected('item2')}
  />
</List>`}
      >
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
          <div className="px-4 py-3 bg-bear-500/10 border-l-4 border-bear-500 text-bear-600 dark:text-bear-400 cursor-pointer">
            Selected Item
          </div>
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
            Other Item
          </div>
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
            Another Item
          </div>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">ListItem</h3>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Primary text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">secondary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Secondary text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Leading icon</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">selected</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disabled state</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ListPage;

