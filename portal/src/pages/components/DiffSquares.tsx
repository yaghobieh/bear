import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DiffSquares } from '@forgedevstack/bear';

const DiffSquaresPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">DiffSquares</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Compact diff summary (GitHub-style): optional +/− counts from Typography and a row of configurable squares (full, half, striped, gradients).
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { DiffSquares } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Counts plus five solid cubes."
        allowOverflow
        code={`<DiffSquares
  additionsText="+8"
  deletionsText="-2"
  cubeCount={5}
/>`}
      >
        <div className="w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-4 py-3">
          <DiffSquares additionsText="+8" deletionsText="-2" cubeCount={5} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Mixed cubes"
        description="Per-cube fill, stripe, and gradient."
        allowOverflow
        code={`<DiffSquares
  additionsText="+53"
  cubes={[
    { fill: 'full' },
    { fill: 'full' },
    { fill: 'half' },
    { fill: 'striped' },
    { gradient: 'linear-gradient(90deg,#38bdf8,#a855f7)' },
  ]}
/>`}
      >
        <div className="w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-4 py-3">
          <DiffSquares
            additionsText="+53"
            cubes={[
              { fill: 'full' },
              { fill: 'full' },
              { fill: 'half', secondaryColor: '#ea580c' },
              { fill: 'striped', color: '#38bdf8', secondaryColor: '#ea580c' },
              { gradient: 'linear-gradient(90deg,#38bdf8,#a855f7)' },
            ]}
          />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">additionsText</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Shown in primary color (Typography)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">deletionsText</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Shown in deletion/warning color</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">cubeCount</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">When cubes omitted, builds this many full cubes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">cubes</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>DiffCube[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">fill, color, gradient, etc.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">summaryTypographyProps</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Partial&lt;TypographyProps&gt;</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Override variant, weight, etc.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DiffSquaresPage;
