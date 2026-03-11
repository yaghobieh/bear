import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ContextMenuPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        ContextMenu
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">
          New
        </span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Right-click context menus for contextual actions.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { ContextMenu } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple context menu with actions."
        code={`<ContextMenu
  items={[
    { id: 'copy', label: 'Copy' },
    { id: 'paste', label: 'Paste' },
    { id: 'cut', label: 'Cut' },
  ]}
>
  <div>Right-click here</div>
</ContextMenu>`}
      >
        <div className="flex justify-center">
          <div className="relative inline-block p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <span className="text-gray-600 dark:text-gray-400">Right-click here</span>
            <div className="absolute left-0 top-0 mt-2 w-40 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg py-1 z-10">
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                Copy
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                Paste
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                Cut
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Submenus"
        description="Nested menu items."
        code={`<ContextMenu
  items={[
    { id: 'new', label: 'New', children: [
      { id: 'file', label: 'File' },
      { id: 'folder', label: 'Folder' },
    ]},
    { id: 'open', label: 'Open' },
  ]}
>
  <div>Right-click here</div>
</ContextMenu>`}
      >
        <div className="flex justify-center">
          <div className="relative inline-block p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <span className="text-gray-600 dark:text-gray-400">Right-click here</span>
            <div className="absolute left-0 top-0 mt-2 w-40 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg py-1 z-10">
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300 flex justify-between items-center">
                New
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                Open
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons and Shortcuts"
        description="Menu items with icons and keyboard shortcuts."
        code={`<ContextMenu
  items={[
    { id: 'copy', label: 'Copy', icon: <CopyIcon />, shortcut: '⌘C' },
    { id: 'paste', label: 'Paste', icon: <PasteIcon />, shortcut: '⌘V' },
    { id: 'cut', label: 'Cut', icon: <CutIcon />, shortcut: '⌘X' },
  ]}
>
  <div>Right-click here</div>
</ContextMenu>`}
      >
        <div className="flex justify-center">
          <div className="relative inline-block p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <span className="text-gray-600 dark:text-gray-400">Right-click here</span>
            <div className="absolute left-0 top-0 mt-2 w-52 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg py-1 z-10">
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-4">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy
                </span>
                <span className="text-xs text-gray-400">⌘C</span>
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-4">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  </svg>
                  Paste
                </span>
                <span className="text-xs text-gray-400">⌘V</span>
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-4">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  </svg>
                  Cut
                </span>
                <span className="text-xs text-gray-400">⌘X</span>
              </div>
            </div>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">items</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ContextMenuEntry[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Menu items and submenus</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Element that triggers context menu</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable context menu</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onOpenChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(open: boolean) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when menu opens or closes</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ContextMenuPage;
