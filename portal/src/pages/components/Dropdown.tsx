import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const DropdownPage: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Dropdown</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A dropdown menu for displaying a list of options.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Dropdown } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple dropdown with items."
        code={`<Dropdown
  trigger={<Button>Options ▼</Button>}
  items={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Duplicate', onClick: handleDuplicate },
    { divider: true },
    { label: 'Delete', onClick: handleDelete, variant: 'danger' },
  ]}
/>`}
      >
        <div className="flex justify-center relative">
          <button 
            onClick={() => setOpen(!open)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            Options <span className="text-xs">▼</span>
          </button>
          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden min-w-[160px] z-50">
                <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Edit</button>
                <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Duplicate</button>
                <hr className="border-gray-200 dark:border-gray-700" />
                <button className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">Delete</button>
              </div>
            </>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="Dropdown items with icons."
        code={`<Dropdown
  trigger={<Button icon={<MoreIcon />} />}
  items={[
    { label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
    { label: 'Share', icon: <ShareIcon />, onClick: handleShare },
    { divider: true },
    { label: 'Delete', icon: <DeleteIcon />, variant: 'danger' },
  ]}
/>`}
      >
        <div className="max-w-[180px] mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
            <span>✏️</span> Edit
          </button>
          <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
            <span>📤</span> Share
          </button>
          <hr className="border-gray-200 dark:border-gray-700" />
          <button className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3">
            <span>🗑️</span> Delete
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
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">trigger</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Trigger element</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">items</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>DropdownItem[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Menu items</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">position</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>bottom-start | bottom-end</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Menu position</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DropdownPage;

