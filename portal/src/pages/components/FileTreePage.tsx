import { useState } from 'react';
import { FileTree, type FileTreeNode } from '@forgedevstack/bear';

const DEMO_ITEMS: FileTreeNode[] = [
  {
    id: 'src',
    label: 'src',
    type: 'folder',
    children: [
      {
        id: 'src-app',
        label: 'App.tsx',
        type: 'file',
      },
      {
        id: 'src-index',
        label: 'index.tsx',
        type: 'file',
      },
      {
        id: 'src-components',
        label: 'components',
        type: 'folder',
        children: [
          { id: 'src-components-button', label: 'Button.tsx', type: 'file' },
          { id: 'src-components-input', label: 'Input.tsx', type: 'file' },
        ],
      },
    ],
  },
  {
    id: 'public',
    label: 'public',
    type: 'folder',
    children: [
      { id: 'public-index', label: 'index.html', type: 'file' },
    ],
  },
  { id: 'package', label: 'package.json', type: 'file' },
];

export default function FileTreePage() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">FileTree</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        File/folder tree built on TreeView. Use for file explorers, project outlines, or any hierarchical data. Supports selection and expand/collapse.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Demo</h2>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-w-sm">
            <FileTree
              items={DEMO_ITEMS}
              selectedId={selectedId}
              defaultExpandedIds={['src', 'src-components']}
              onSelect={(node: FileTreeNode) => setSelectedId(node.id)}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { FileTree, type FileTreeNode } from '@forgedevstack/bear';

const items: FileTreeNode[] = [
  { id: '1', label: 'src', type: 'folder', children: [
    { id: '1-1', label: 'App.tsx', type: 'file' },
  ]},
  { id: '2', label: 'package.json', type: 'file' },
];

<FileTree
  items={items}
  selectedId={selectedId}
  defaultExpandedIds={['1']}
  onSelect={(node) => setSelectedId(node.id)}
/>`}
          </pre>
        </section>
      </div>
    </div>
  );
}
