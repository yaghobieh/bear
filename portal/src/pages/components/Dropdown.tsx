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

      <ComponentPreview
        title="Searchable (v1.2.3)"
        description="Enable search/filter within dropdown items. Users can type to narrow down options."
        code={`<Dropdown
  trigger={<Button>Select Team ▼</Button>}
  searchable
  searchPlaceholder="Filter teams..."
  items={[
    { key: 'eng', label: 'Engineering' },
    { key: 'design', label: 'Design' },
    { key: 'pm', label: 'Product' },
    { key: 'qa', label: 'QA' },
    { key: 'devops', label: 'DevOps' },
  ]}
/>`}
      >
        <div className="max-w-[220px] mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
            <input className="w-full text-sm bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400" placeholder="Filter teams..." />
          </div>
          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Engineering</button>
          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Design</button>
          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Product</button>
          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">QA</button>
          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">DevOps</button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Multi-Select (v1.2.3)"
        description="Toggle multiple items on click with checkmarks. Selected keys are tracked via onSelectionChange."
        code={`<Dropdown
  trigger={<Button>Tags ▼</Button>}
  multiSelect
  selectedKeys={['react', 'ts']}
  onSelectionChange={setSelectedKeys}
  items={[
    { key: 'react', label: 'React' },
    { key: 'ts', label: 'TypeScript' },
    { key: 'node', label: 'Node.js' },
    { key: 'vite', label: 'Vite' },
  ]}
/>`}
      >
        <div className="max-w-[200px] mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"><span className="text-pink-500">&#10003;</span> React</button>
          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"><span className="text-pink-500">&#10003;</span> TypeScript</button>
          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"><span className="opacity-0">&#10003;</span> Node.js</button>
          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"><span className="opacity-0">&#10003;</span> Vite</button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Loading & Empty States (v1.2.3)"
        description="Show a loading spinner during async fetch, and custom empty text when no items match."
        code={`<Dropdown
  trigger={<Button>Async ▼</Button>}
  loading
  loadingText="Fetching options..."
  items={[]}
/>

<Dropdown
  trigger={<Button>Search ▼</Button>}
  searchable
  emptyText="No results found"
  items={[]}
/>`}
      >
        <div className="flex gap-4 justify-center">
          <div className="w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-center py-6 text-sm text-gray-400 gap-2">
              <span className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-pink-500 rounded-full" />
              Fetching options...
            </div>
          </div>
          <div className="w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
              <input className="w-full text-sm bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400" placeholder="Search..." value="zzz" readOnly />
            </div>
            <div className="flex items-center justify-center py-6 text-sm text-gray-400">No results found</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Header, Footer & Item Descriptions (v1.2.3)"
        description="Add a header/footer to the dropdown and descriptions to items for richer menus."
        code={`<Dropdown
  trigger={<Button>Account ▼</Button>}
  header={<div className="px-3 py-2 text-xs font-semibold text-gray-500">ACCOUNT</div>}
  footer={<div className="px-3 py-2 border-t text-xs text-gray-400">v1.2.3</div>}
  items={[
    { key: 'profile', label: 'Profile', description: 'View and edit your profile' },
    { key: 'settings', label: 'Settings', description: 'App preferences' },
    { key: 'logout', label: 'Log out', danger: true },
  ]}
/>`}
      >
        <div className="max-w-[240px] mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Account</div>
          <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="text-sm text-gray-700 dark:text-gray-300">Profile</div>
            <div className="text-xs text-gray-400">View and edit your profile</div>
          </button>
          <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="text-sm text-gray-700 dark:text-gray-300">Settings</div>
            <div className="text-xs text-gray-400">App preferences</div>
          </button>
          <hr className="border-gray-200 dark:border-gray-700" />
          <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">Log out</button>
          <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400">v1.2.3</div>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">placement</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>bottom-start | bottom-end | top | ...</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Menu position relative to trigger</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">open</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled open state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>xs | sm | md | lg | xl</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Size variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">matchWidth</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Match trigger width</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxHeight</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Max height before scroll</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">closeOnSelect</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close on item click</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">searchable</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable search/filter input</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">searchPlaceholder</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Placeholder for search input</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">filterFn</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(item, query) =&gt; boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom filter function</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">loading</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show loading spinner inside dropdown</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">emptyText</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text shown when no items match</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">renderItem</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(item, index) =&gt; ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom item renderer</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">multiSelect</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable multi-select mode</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">selectedKeys</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled selected keys (multiSelect)</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">onSelectionChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(keys: string[]) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when selection changes</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">header</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Header content above items</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">footer</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Footer content below items</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20"><td className="px-4 py-3 font-mono text-bear-600">virtualized</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Virtual scrolling for large lists</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DropdownPage;

