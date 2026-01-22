import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const DataTablePage: FC = () => {
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor' },
  ];

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">DataTable</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Feature-rich data table with sorting, filtering, pagination, and more.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { DataTable } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Table"
        description="Simple data display with columns."
        code={`const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

<DataTable data={data} columns={columns} />`}
      >
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Email</th>
                <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sampleData.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{row.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300">
                      {row.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Sorting"
        description="Sortable columns for data organization."
        code={`<DataTable
  data={data}
  columns={columns}
  sortable
  defaultSort={{ key: 'name', direction: 'asc' }}
/>`}
      >
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="flex items-center gap-2">
                    Name
                    <span className="text-bear-500">↓</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="flex items-center gap-2">
                    Email
                    <span className="text-gray-400">↕</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[...sampleData].sort((a, b) => a.name.localeCompare(b.name)).map(row => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{row.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.email}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Pagination"
        description="Page through large datasets."
        code={`<DataTable
  data={data}
  columns={columns}
  pagination
  pageSize={10}
/>`}
      >
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sampleData.slice(0, 2).map(row => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{row.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-2">
            <span className="text-sm text-gray-500">Showing 1-2 of 3</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed">Prev</button>
              <button className="px-3 py-1 text-sm rounded bg-bear-500 text-white">1</button>
              <button className="px-3 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">2</button>
              <button className="px-3 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Next</button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Row Selection"
        description="Select rows for bulk actions."
        code={`<DataTable
  data={data}
  columns={columns}
  selectable
  onSelectionChange={(selected) => console.log(selected)}
/>`}
      >
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 w-12">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-bear-500 focus:ring-bear-500" />
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sampleData.map((row, idx) => (
                <tr key={row.id} className={idx === 0 ? 'bg-bear-50 dark:bg-bear-900/20' : ''}>
                  <td className="px-4 py-3">
                    <input type="checkbox" defaultChecked={idx === 0} className="rounded border-gray-300 dark:border-gray-600 text-bear-500 focus:ring-bear-500" />
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{row.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">data</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>T[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Table data</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">columns</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Column[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Column definitions</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">sortable</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable sorting</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">pagination</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable pagination</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">selectable</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable row selection</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">pageSize</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">10</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Rows per page</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DataTablePage;

