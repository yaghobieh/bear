import { FC } from 'react';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  title: string;
  rows: PropRow[];
  showDefault?: boolean;
}

export const PropsTable: FC<PropsTableProps> = ({ title, rows, showDefault = true }) => (
  <section className="mb-12">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
            <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
            {showDefault && <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>}
            <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {rows.map((r) => (
            <tr key={r.name}>
              <td className="px-4 py-3 font-mono text-bear-600">{r.name}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>{r.type}</code></td>
              {showDefault && <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{r.default ?? '-'}</td>}
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);
