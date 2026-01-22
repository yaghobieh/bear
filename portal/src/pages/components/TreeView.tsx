import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const TreeViewPage: FC = () => {
  const [expanded, setExpanded] = useState<string[]>(['1', '1-1']);

  const treeData = [
    { id: '1', label: 'Documents', children: [
      { id: '1-1', label: 'Projects', children: [
        { id: '1-1-1', label: 'Project A' },
        { id: '1-1-2', label: 'Project B' },
      ]},
      { id: '1-2', label: 'Reports' },
    ]},
    { id: '2', label: 'Downloads' },
    { id: '3', label: 'Pictures', children: [
      { id: '3-1', label: 'Vacation' },
      { id: '3-2', label: 'Family' },
    ]},
  ];

  const toggle = (id: string) => {
    setExpanded(e => e.includes(id) ? e.filter(x => x !== id) : [...e, id]);
  };

  const renderTree = (nodes: typeof treeData, level = 0) => (
    <ul className={level > 0 ? 'ml-4 border-l border-gray-200 dark:border-gray-700' : ''}>
      {nodes.map(node => (
        <li key={node.id} className="py-1">
          <div 
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => node.children && toggle(node.id)}
          >
            {node.children ? (
              <span className="w-4 text-gray-400">{expanded.includes(node.id) ? '▼' : '▶'}</span>
            ) : (
              <span className="w-4" />
            )}
            <svg className="w-4 h-4 text-bear-500" fill="currentColor" viewBox="0 0 20 20">
              {node.children ? (
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"/>
              ) : (
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
              )}
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-300">{node.label}</span>
          </div>
          {node.children && expanded.includes(node.id) && renderTree(node.children, level + 1)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">TreeView</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Display hierarchical data in an expandable tree structure.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { TreeView } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Interactive tree with expandable nodes."
        code={`<TreeView data={[
  { id: '1', label: 'Documents', children: [
    { id: '1-1', label: 'Projects', children: [...] },
    { id: '1-2', label: 'Reports' },
  ]},
  { id: '2', label: 'Downloads' },
]} />`}
      >
        <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          {renderTree(treeData)}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">data</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>TreeItem[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Tree data structure</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onNodeSelect</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(id: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when node is selected</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">defaultExpanded</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Initially expanded node IDs</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">renderLabel</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(item) =&gt; ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom label renderer</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TreeViewPage;

