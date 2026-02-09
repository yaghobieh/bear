import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Alert } from '@forgedevstack/bear';

const AlertPage: FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Alert</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Alerts display brief, important messages to attract user attention.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Alert } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Severities"
        description="Different alert types for different contexts."
        code={`<Alert severity="success">Operation completed successfully!</Alert>
<Alert severity="info">This is an informational message.</Alert>
<Alert severity="warning">Warning: Check your input.</Alert>
<Alert severity="error">Error: Something went wrong.</Alert>`}
      >
        <div className="space-y-3 max-w-md mx-auto">
          <Alert severity="success">Operation completed successfully!</Alert>
          <Alert severity="info">This is an informational message.</Alert>
          <Alert severity="warning">Warning: Check your input.</Alert>
          <Alert severity="error">Error: Something went wrong.</Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Title"
        description="Alerts with a prominent title."
        code={`<Alert severity="success" title="Success">
  Your changes have been saved.
</Alert>`}
      >
        <div className="max-w-md mx-auto">
          <Alert severity="success" title="Success">Your changes have been saved.</Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Closable"
        description="Alerts that can be dismissed."
        code={`const [visible, setVisible] = useState(true);

{visible && (
  <Alert severity="info" closable onClose={() => setVisible(false)}>
    Click X to dismiss this alert.
  </Alert>
)}`}
      >
        <div className="max-w-md mx-auto">
          {visible ? (
            <Alert severity="info" closable onClose={() => setVisible(false)}>
              Click X to dismiss this alert.
            </Alert>
          ) : (
            <button 
              onClick={() => setVisible(true)}
              className="px-4 py-2 bg-bear-500 text-white rounded-lg"
            >
              Show Alert Again
            </button>
          )}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">severity</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>success | info | warning | error</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">info</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Alert type</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">title</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Alert title</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">closable</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show close button</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onClose</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Close handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">auto</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom icon</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AlertPage;

