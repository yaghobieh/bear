import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const BadgePage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Badge</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Small labels for counts, status, or additional info.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Badge } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple badge with content."
        code={`<Badge content={5}>
  <Button>Messages</Button>
</Badge>`}
      >
        <div className="flex justify-center">
          <div className="relative inline-block">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
              Messages
            </button>
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-bear-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              5
            </span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Different badge colors."
        code={`<Badge color="primary">Primary</Badge>
<Badge color="secondary">Secondary</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="error">Error</Badge>`}
      >
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { color: 'bg-bear-500', label: 'Primary' },
            { color: 'bg-purple-500', label: 'Secondary' },
            { color: 'bg-green-500', label: 'Success' },
            { color: 'bg-amber-500', label: 'Warning' },
            { color: 'bg-red-500', label: 'Error' },
          ].map(({ color, label }) => (
            <span key={label} className={`px-2.5 py-1 ${color} text-white text-xs font-medium rounded-full`}>
              {label}
            </span>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Dot Variant"
        description="Small dot indicator without content."
        code={`<Badge dot color="success">
  <Avatar>JD</Avatar>
</Badge>`}
      >
        <div className="flex justify-center gap-6">
          {[
            { color: 'bg-green-500', label: 'Online' },
            { color: 'bg-red-500', label: 'Offline' },
            { color: 'bg-amber-500', label: 'Away' },
          ].map(({ color, label }) => (
            <div key={label} className="text-center">
              <div className="relative inline-block mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className={`absolute top-0 right-0 w-3 h-3 ${color} rounded-full border-2 border-white dark:border-gray-900`} />
              </div>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Maximum Value"
        description="Display max value with + suffix."
        code={`<Badge content={100} max={99}>
  <Button>Notifications</Button>
</Badge>`}
      >
        <div className="flex justify-center gap-6">
          <div className="relative inline-block">
            <button className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <span className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
              99+
            </span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Standalone"
        description="Badge without child element."
        code={`<Badge>New</Badge>
<Badge color="success">Active</Badge>
<Badge color="warning">Pending</Badge>`}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-2.5 py-1 bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 text-xs font-medium rounded-md">
            New
          </span>
          <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-md">
            Active
          </span>
          <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium rounded-md">
            Pending
          </span>
          <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium rounded-md">
            Error
          </span>
          <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md">
            Draft
          </span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Position"
        description="Badge position around child."
        code={`<Badge position="top-right">TR</Badge>
<Badge position="top-left">TL</Badge>
<Badge position="bottom-right">BR</Badge>
<Badge position="bottom-left">BL</Badge>`}
      >
        <div className="flex justify-center gap-8">
          {[
            { pos: 'top-right', classes: '-top-2 -right-2' },
            { pos: 'top-left', classes: '-top-2 -left-2' },
            { pos: 'bottom-right', classes: '-bottom-2 -right-2' },
            { pos: 'bottom-left', classes: '-bottom-2 -left-2' },
          ].map(({ pos, classes }) => (
            <div key={pos} className="text-center">
              <div className="relative inline-block mb-2">
                <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
                <span className={`absolute ${classes} w-4 h-4 bg-bear-500 rounded-full`} />
              </div>
              <p className="text-xs text-gray-500">{pos}</p>
            </div>
          ))}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">content</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Badge content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | secondary | success | warning | error</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Badge color</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">max</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">99</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Max value before +</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">dot</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show as dot</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">position</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>top-right | top-left | bottom-right | bottom-left</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">top-right</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Badge position</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BadgePage;
