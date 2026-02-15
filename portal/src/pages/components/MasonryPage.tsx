import { useState } from 'react';
import { Masonry } from '@forgedevstack/bear';

const COLORS = [
  'bg-pink-200 dark:bg-pink-800',
  'bg-blue-200 dark:bg-blue-800',
  'bg-green-200 dark:bg-green-800',
  'bg-yellow-200 dark:bg-yellow-800',
  'bg-purple-200 dark:bg-purple-800',
  'bg-orange-200 dark:bg-orange-800',
  'bg-teal-200 dark:bg-teal-800',
  'bg-red-200 dark:bg-red-800',
];

const HEIGHTS = [150, 200, 120, 250, 180, 220, 160, 280, 140, 190, 230, 170];

export default function MasonryPage() {
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState(16);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Masonry</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Pinterest-style masonry grid layout. Automatically distributes items across columns for a balanced visual flow.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Controls</h2>
          <div className="flex gap-4 mb-4">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Columns: <select value={columns} onChange={(e) => setColumns(Number(e.target.value))} className="ml-2 px-2 py-1 rounded border dark:bg-gray-800 dark:border-gray-700">
                {[2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Gap: <select value={gap} onChange={(e) => setGap(Number(e.target.value))} className="ml-2 px-2 py-1 rounded border dark:bg-gray-800 dark:border-gray-700">
                {[8, 12, 16, 24, 32].map((n) => <option key={n} value={n}>{n}px</option>)}
              </select>
            </label>
          </div>
          <Masonry columns={columns} gap={gap}>
            {HEIGHTS.map((h, i) => (
              <div
                key={i}
                className={`${COLORS[i % COLORS.length]} rounded-xl flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-200`}
                style={{ height: h }}
              >
                Item {i + 1}
              </div>
            ))}
          </Masonry>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Responsive Columns</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Responsive breakpoints: base=1, sm=2, md=3, lg=4</p>
          <Masonry columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={12}>
            {HEIGHTS.slice(0, 8).map((h, i) => (
              <div key={i} className={`${COLORS[i]} rounded-lg p-4`} style={{ height: h }}>
                <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">Card {i + 1}</span>
              </div>
            ))}
          </Masonry>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { Masonry } from '@forgedevstack/bear';

<Masonry columns={3} gap={16}>
  <div style={{ height: 200 }}>Item 1</div>
  <div style={{ height: 300 }}>Item 2</div>
  <div style={{ height: 150 }}>Item 3</div>
</Masonry>

// Responsive
<Masonry columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={16}>
  {items.map(item => <Card key={item.id} />)}
</Masonry>`}
          </pre>
        </section>
      </div>
    </div>
  );
}
