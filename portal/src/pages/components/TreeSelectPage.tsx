import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { TreeSelect } from '@forgedevstack/bear';

const DEMO_NODES = [
  {
    id: 'frontend',
    label: 'Frontend',
    children: [
      { id: 'react', label: 'React' },
      { id: 'vue', label: 'Vue' },
      { id: 'angular', label: 'Angular' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    children: [
      { id: 'node', label: 'Node.js' },
      { id: 'python', label: 'Python' },
      { id: 'go', label: 'Go' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    children: [
      { id: 'postgres', label: 'PostgreSQL' },
      { id: 'mongo', label: 'MongoDB' },
      { id: 'redis', label: 'Redis' },
    ],
  },
];

const DEPT_NODES = [
  {
    id: 'engineering',
    label: 'Engineering',
    children: [
      { id: 'web', label: 'Web Team' },
      { id: 'mobile', label: 'Mobile Team' },
      { id: 'infra', label: 'Infrastructure' },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    children: [
      { id: 'ux', label: 'UX Research' },
      { id: 'ui', label: 'UI Design' },
    ],
  },
  { id: 'marketing', label: 'Marketing' },
  { id: 'sales', label: 'Sales' },
];

const TreeSelectPage: FC = () => {
  const [single, setSingle] = useState<string | string[]>('');
  const [multi, setMulti] = useState<string | string[]>(['react', 'node']);
  const [dept, setDept] = useState<string | string[]>('');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        TreeSelect
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">
          New
        </span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Hierarchical dropdown selector with expandable tree nodes, search filtering, and multi-select support.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { TreeSelect } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Single-select tree with expandable nodes. Click to open and select."
        code={`const nodes = [
  { id: 'frontend', label: 'Frontend', children: [
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue' },
  ]},
  { id: 'backend', label: 'Backend', children: [
    { id: 'node', label: 'Node.js' },
  ]},
];

<TreeSelect
  nodes={nodes}
  value={value}
  onChange={setValue}
  label="Technology"
/>`}
      >
        <div className="w-72">
          <TreeSelect
            nodes={DEMO_NODES}
            value={single}
            onChange={setSingle}
            label="Technology"
            placeholder="Select a technology…"
            expandAll
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Multi-Select"
        description="Select multiple nodes. Tags appear in the trigger."
        code={`<TreeSelect
  nodes={nodes}
  value={selected}
  onChange={setSelected}
  multiple
  label="Skills"
/>`}
      >
        <div className="w-80">
          <TreeSelect
            nodes={DEMO_NODES}
            value={multi}
            onChange={setMulti}
            multiple
            label="Skills"
            expandAll
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Error"
        description="Validation error displayed below the selector."
        code={`<TreeSelect
  nodes={departments}
  label="Department"
  error="Please select a department"
/>`}
      >
        <div className="w-72">
          <TreeSelect
            nodes={DEPT_NODES}
            value={dept}
            onChange={setDept}
            label="Department"
            error="Please select a department"
          />
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-2 font-medium">Prop</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Default</th>
                <th className="px-4 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-700 text-gray-700 dark:text-zinc-300">
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">nodes</td><td className="px-4 py-2">TreeNode[]</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Tree hierarchy data</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">value</td><td className="px-4 py-2">string | string[]</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Selected node id(s)</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">onChange</td><td className="px-4 py-2">(value) =&gt; void</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Change handler</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">multiple</td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">false</td><td className="px-4 py-2">Multi-select mode</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">searchable</td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">true</td><td className="px-4 py-2">Show search filter</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">expandAll</td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">false</td><td className="px-4 py-2">Expand all nodes initially</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">clearable</td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">true</td><td className="px-4 py-2">Show clear button</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">size</td><td className="px-4 py-2">'sm' | 'md' | 'lg'</td><td className="px-4 py-2">'md'</td><td className="px-4 py-2">Trigger size</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">error</td><td className="px-4 py-2">string</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Error message</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">maxHeight</td><td className="px-4 py-2">number</td><td className="px-4 py-2">280</td><td className="px-4 py-2">Dropdown max height (px)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TreeSelectPage;
