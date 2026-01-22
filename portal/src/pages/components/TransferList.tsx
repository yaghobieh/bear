import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const TransferListPage: FC = () => {
  const [left, setLeft] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [right, setRight] = useState(['Item 5']);
  const [selectedLeft, setSelectedLeft] = useState<string[]>([]);
  const [selectedRight, setSelectedRight] = useState<string[]>([]);

  const moveRight = () => {
    setRight([...right, ...selectedLeft]);
    setLeft(left.filter(i => !selectedLeft.includes(i)));
    setSelectedLeft([]);
  };

  const moveLeft = () => {
    setLeft([...left, ...selectedRight]);
    setRight(right.filter(i => !selectedRight.includes(i)));
    setSelectedRight([]);
  };

  const toggleLeft = (item: string) => {
    setSelectedLeft(selectedLeft.includes(item) 
      ? selectedLeft.filter(i => i !== item) 
      : [...selectedLeft, item]
    );
  };

  const toggleRight = (item: string) => {
    setSelectedRight(selectedRight.includes(item) 
      ? selectedRight.filter(i => i !== item) 
      : [...selectedRight, item]
    );
  };

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Transfer List</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A dual-list component for moving items between two lists.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { TransferList } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Move items between two lists."
        code={`const [left, setLeft] = useState(['Item 1', 'Item 2', 'Item 3']);
const [right, setRight] = useState([]);

<TransferList
  leftItems={left}
  rightItems={right}
  leftTitle="Available"
  rightTitle="Selected"
  onChange={(newLeft, newRight) => {
    setLeft(newLeft);
    setRight(newRight);
  }}
/>`}
      >
        <div className="flex items-start gap-4 justify-center">
          <div className="w-48 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300">
              Available ({left.length})
            </div>
            <div className="p-2 max-h-48 overflow-auto">
              {left.map(item => (
                <label key={item} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedLeft.includes(item)}
                    onChange={() => toggleLeft(item)}
                    className="accent-bear-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 py-8">
            <button 
              onClick={moveRight}
              disabled={selectedLeft.length === 0}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50"
            >
              →
            </button>
            <button 
              onClick={moveLeft}
              disabled={selectedRight.length === 0}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50"
            >
              ←
            </button>
          </div>

          <div className="w-48 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300">
              Selected ({right.length})
            </div>
            <div className="p-2 max-h-48 overflow-auto">
              {right.length === 0 ? (
                <div className="px-2 py-4 text-center text-sm text-gray-400">No items</div>
              ) : (
                right.map(item => (
                  <label key={item} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedRight.includes(item)}
                      onChange={() => toggleRight(item)}
                      className="accent-bear-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </label>
                ))
              )}
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
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">items</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>TransferListItem[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">All available items</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">leftTitle</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Left list title</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">rightTitle</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Right list title</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">searchable</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable search</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(left, right) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Change handler</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TransferListPage;

