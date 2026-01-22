import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const MenuPage: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Menu</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A popup menu for displaying a list of choices on click.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Menu, MenuItem, MenuDivider } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Menu with items and divider."
        code={`const [anchorEl, setAnchorEl] = useState(null);

<Button onClick={(e) => setAnchorEl(e.currentTarget)}>
  Open Menu
</Button>

<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
  <MenuItem onClick={handleProfile}>Profile</MenuItem>
  <MenuItem onClick={handleSettings}>Settings</MenuItem>
  <MenuDivider />
  <MenuItem onClick={handleLogout} danger>Logout</MenuItem>
</Menu>`}
      >
        <div className="flex justify-center relative">
          <button 
            onClick={() => setOpen(!open)}
            className="px-4 py-2 rounded-lg bg-bear-500 text-white hover:bg-bear-600 transition-colors"
          >
            Open Menu
          </button>
          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden min-w-[180px] z-50">
                <button className="w-full px-4 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                  <span>👤</span> Profile
                </button>
                <button className="w-full px-4 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                  <span>⚙️</span> Settings
                </button>
                <hr className="border-gray-200 dark:border-gray-700" />
                <button className="w-full px-4 py-2.5 text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                  <span>🚪</span> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="Menu items with leading icons."
        code={`<Menu>
  <MenuItem icon={<EditIcon />}>Edit</MenuItem>
  <MenuItem icon={<CopyIcon />}>Duplicate</MenuItem>
  <MenuDivider />
  <MenuItem icon={<DeleteIcon />} danger>Delete</MenuItem>
</Menu>`}
      >
        <div className="max-w-[200px] mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <button className="w-full px-4 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
            <span>✏️</span> Edit
          </button>
          <button className="w-full px-4 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
            <span>📋</span> Duplicate
          </button>
          <hr className="border-gray-200 dark:border-gray-700" />
          <button className="w-full px-4 py-2.5 text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
            <span>🗑️</span> Delete
          </button>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Menu</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">open</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controls visibility</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">anchorEl</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>HTMLElement | null</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Anchor element</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onClose</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">position</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>bottom-start | bottom-end | top-start | top-end</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Menu position</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">MenuItem</h3>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Leading icon</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">danger</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Destructive styling</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disabled state</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;

