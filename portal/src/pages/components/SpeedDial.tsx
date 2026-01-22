import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const SpeedDialPage: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Speed Dial</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A floating action button that expands to reveal related actions.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { SpeedDial, SpeedDialAction } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Speed dial with multiple actions."
        code={`<SpeedDial
  icon={<PlusIcon />}
  actions={[
    { key: 'edit', label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
    { key: 'share', label: 'Share', icon: <ShareIcon />, onClick: handleShare },
    { key: 'delete', label: 'Delete', icon: <DeleteIcon />, onClick: handleDelete },
  ]}
/>`}
      >
        <div className="flex justify-center relative h-40">
          <div className="absolute bottom-0">
            {open && (
              <div className="flex flex-col-reverse gap-3 mb-3 items-center">
                {[
                  { icon: '✏️', label: 'Edit' },
                  { icon: '📤', label: 'Share' },
                  { icon: '🗑️', label: 'Delete' },
                ].map((action, i) => (
                  <div key={action.label} className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 50}ms` }}>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">{action.label}</span>
                    <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center">
                      {action.icon}
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button 
              onClick={() => setOpen(!open)}
              className={`w-14 h-14 rounded-full bg-bear-500 text-white shadow-lg flex items-center justify-center text-2xl transition-transform ${open ? 'rotate-45' : ''}`}
            >
              +
            </button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Direction"
        description="Actions can expand in different directions."
        code={`<SpeedDial direction="up" />
<SpeedDial direction="down" />
<SpeedDial direction="left" />
<SpeedDial direction="right" />`}
      >
        <div className="flex gap-8 justify-center items-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-bear-500 text-white flex items-center justify-center text-xl mb-2">+</div>
            <span className="text-xs text-gray-500">Up (default)</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center text-xl mb-2">+</div>
            <span className="text-xs text-gray-500">Down</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl mb-2">+</div>
            <span className="text-xs text-gray-500">Left</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl mb-2">+</div>
            <span className="text-xs text-gray-500">Right</span>
          </div>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">SpeedDial</h3>
        <div className="overflow-x-auto mb-6">
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">+</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Main button icon</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">actions</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>SpeedDialAction[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Action buttons</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">direction</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>up | down | left | right</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">up</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Expansion direction</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">position</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>bottom-right | bottom-left | top-right | top-left</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">bottom-right</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Fixed position</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">SpeedDialAction</h3>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">key</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Unique identifier</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Action icon</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Tooltip label</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onClick</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Click handler</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SpeedDialPage;

