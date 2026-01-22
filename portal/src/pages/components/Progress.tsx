import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ProgressPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Progress</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Progress indicators for operations in progress.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Progress, CircularProgress } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Linear Progress"
        description="Horizontal progress bar."
        code={`<Progress value={60} />`}
      >
        <div className="max-w-md mx-auto space-y-4">
          {[30, 60, 100].map(value => (
            <div key={value}>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{value}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-bear-500 rounded-full transition-all"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Different progress colors."
        code={`<Progress value={70} color="primary" />
<Progress value={70} color="success" />
<Progress value={70} color="warning" />
<Progress value={70} color="error" />`}
      >
        <div className="max-w-md mx-auto space-y-3">
          {[
            { color: 'bg-bear-500', label: 'primary' },
            { color: 'bg-green-500', label: 'success' },
            { color: 'bg-amber-500', label: 'warning' },
            { color: 'bg-red-500', label: 'error' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="text-sm text-gray-500 w-20">{label}</span>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full`} style={{ width: '70%' }} />
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different progress bar heights."
        code={`<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />`}
      >
        <div className="max-w-md mx-auto space-y-4">
          {[
            { size: 'sm', height: 'h-1' },
            { size: 'md', height: 'h-2' },
            { size: 'lg', height: 'h-4' },
          ].map(({ size, height }) => (
            <div key={size}>
              <span className="text-sm text-gray-500 mb-1 block">{size}</span>
              <div className={`${height} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
                <div className="h-full bg-bear-500 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Indeterminate"
        description="Progress with unknown duration."
        code={`<Progress indeterminate />`}
      >
        <div className="max-w-md mx-auto">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-bear-500 rounded-full animate-pulse" style={{
              animation: 'indeterminate 1.5s ease-in-out infinite',
            }} />
          </div>
          <style>{`
            @keyframes indeterminate {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(400%); }
            }
          `}</style>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Circular Progress"
        description="Circular progress indicator."
        code={`<CircularProgress value={75} />
<CircularProgress value={50} size="lg" />
<CircularProgress indeterminate />`}
      >
        <div className="flex items-center justify-center gap-8 py-4">
          {[25, 50, 75, 100].map(value => (
            <div key={value} className="relative">
              <svg className="w-16 h-16 -rotate-90">
                <circle
                  className="text-gray-200 dark:text-gray-700"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="28"
                  cx="32"
                  cy="32"
                />
                <circle
                  className="text-bear-500"
                  strokeWidth="4"
                  strokeDasharray={`${value * 1.76} 176`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="28"
                  cx="32"
                  cy="32"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                {value}%
              </span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Progress with label inside or outside."
        code={`<Progress value={75} showLabel />
<Progress value={75} label="Uploading..." />`}
      >
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
              <div className="h-full bg-bear-500 rounded-full" style={{ width: '75%' }} />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                75%
              </span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Uploading files...</span>
              <span className="text-bear-600 dark:text-bear-400 font-medium">75%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-bear-500 rounded-full" style={{ width: '75%' }} />
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
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">0</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Progress value (0-100)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | success | warning | error</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Progress color</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Progress size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">indeterminate</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Unknown progress</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showLabel</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show percentage</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProgressPage;
