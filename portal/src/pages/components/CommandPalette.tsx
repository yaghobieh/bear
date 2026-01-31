import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { CommandPalette, Button } from '@forgedevstack/bear';
import type { CommandItem } from '@forgedevstack/bear';

const CommandPalettePage: FC = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const navigate = useNavigate();

  const commands: CommandItem[] = [
    { id: 'new-file', label: 'New File', shortcut: 'Ctrl+N', category: 'File', onSelect: () => setOpen(false) },
    { id: 'open', label: 'Open File', shortcut: 'Ctrl+O', category: 'File', onSelect: () => setOpen(false) },
    { id: 'save', label: 'Save', shortcut: 'Ctrl+S', category: 'File', onSelect: () => setOpen(false) },
    { id: 'search', label: 'Search', shortcut: 'Ctrl+K', category: 'Edit', onSelect: () => setOpen(false) },
    { id: 'settings', label: 'Settings', shortcut: 'Ctrl+,', category: 'Edit', onSelect: () => setOpen(false) },
    { id: 'theme', label: 'Toggle Theme', category: 'View', onSelect: () => setOpen(false) },
    { id: 'docs', label: 'Go to Docs', category: 'Navigation', onSelect: () => { navigate('/'); setOpen(false); } },
  ];

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">CommandPalette</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Command palette (Cmd+K style) for quick actions. Search, navigate, and execute commands.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { CommandPalette } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Press Ctrl+K (or Cmd+K) to open, or click the button."
        code={`<>
  <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
  <CommandPalette
    commands={commands}
    open={open}
    onOpenChange={setOpen}
    groupByCategory
  />
</>`}
        allowOverflow
      >
        <div className="flex flex-col gap-4 items-center">
          <Button onClick={() => setOpen(true)}>Open Command Palette (Ctrl+K)</Button>
          <CommandPalette commands={commands} open={open} onOpenChange={setOpen} groupByCategory />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Recent Commands"
        description="Shows recently used commands at the top."
        code={`<CommandPalette
  commands={commands}
  open={open}
  onOpenChange={setOpen}
  showRecent
  maxRecent={3}
  recentIds={recentIds}
  onRecentChange={setRecentIds}
/>`}
        allowOverflow
      >
        <div className="flex flex-col gap-4 items-center">
          <Button onClick={() => setOpen2(true)}>Open (with recent)</Button>
          <CommandPalette
            commands={commands}
            open={open2}
            onOpenChange={setOpen2}
            showRecent
            maxRecent={3}
            groupByCategory
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">commands</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>CommandItem[]</code></td><td>Available commands</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">open</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td>Controlled open state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onOpenChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(open) =&gt; void</code></td><td>Open state handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">triggerKey</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td>Keyboard shortcut key (default &quot;k&quot;)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">groupByCategory</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td>Group commands by category</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showRecent</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td>Show recent commands</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CommandPalettePage;
