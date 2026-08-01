import { FC } from 'react';
import { Button, ToastProvider, useToast } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ToastDemoButtons: FC = () => {
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => toast.success('Operation completed successfully!')}>Success Toast</Button>
      <Button onClick={() => toast.error('Something went wrong!')}>Error Toast</Button>
      <Button onClick={() => toast.warning('Please check your input.')}>Warning Toast</Button>
      <Button onClick={() => toast.info('Here is some information.')}>Info Toast</Button>
    </div>
  );
};

const ToastPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Toast</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Toast notifications for displaying brief messages to users. Severity drives shared live-region
        politeness (`aria-live` / `role`).
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { ToastProvider, useToast } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Usage"
        description="Wrap your app with ToastProvider and use the useToast hook."
        code={`import { ToastProvider, useToast, Button } from '@forgedevstack/bear';

function App() {
  return (
    <ToastProvider position="top-right" maxToasts={5}>
      <Demo />
    </ToastProvider>
  );
}

function Demo() {
  const toast = useToast();
  return <Button onClick={() => toast.success('Done')}>Success Toast</Button>;
}`}
      >
        <ToastProvider position="top-right" maxToasts={5}>
          <ToastDemoButtons />
        </ToastProvider>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Toast Methods</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Method</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">toast.success(message)</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show success toast</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">toast.error(message)</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show error toast</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">toast.warning(message)</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show warning toast</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">toast.info(message)</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show info toast</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">toast.dismiss(id)</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Dismiss specific toast</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">toast.dismissAll()</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Dismiss all toasts</td></tr>
            </tbody>
          </table>
        </div>
      </section>

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
              <tr><td className="px-4 py-3 font-mono text-bear-600">position</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ToastPosition</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">top-right</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Position of toast container</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">duration</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">5000</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Auto-dismiss duration (ms)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">closable</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show close button</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxToasts</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">5</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Max visible toasts in the stack (ToastProvider)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">pauseOnHover</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Pause auto-dismiss while hovered</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ToastPage;
