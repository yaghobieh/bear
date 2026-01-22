import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ToastPage: FC = () => {
  const [toasts, setToasts] = useState<{ id: number; message: string; severity: string }[]>([]);
  let toastId = 0;

  const showToast = (severity: string) => {
    const id = ++toastId;
    const messages: Record<string, string> = {
      success: 'Operation completed successfully!',
      error: 'Something went wrong!',
      warning: 'Please check your input.',
      info: 'Here is some information.',
    };
    setToasts((prev) => [...prev, { id, message: messages[severity], severity }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Toast</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Toast notifications for displaying brief messages to users.
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
        code={`// In your root component
import { ToastProvider } from '@forgedevstack/bear';

function App() {
  return (
    <ToastProvider position="top-right">
      <YourApp />
    </ToastProvider>
  );
}

// In any child component
import { useToast } from '@forgedevstack/bear';

function MyComponent() {
  const toast = useToast();

  const handleClick = () => {
    toast.success('Operation completed!');
    toast.error('Something went wrong!');
    toast.warning('Please check your input.');
    toast.info('Here is some information.');
  };

  return <button onClick={handleClick}>Show Toast</button>;
}`}
      >
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => showToast('success')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Success Toast
          </button>
          <button
            onClick={() => showToast('error')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Error Toast
          </button>
          <button
            onClick={() => showToast('warning')}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
          >
            Warning Toast
          </button>
          <button
            onClick={() => showToast('info')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Info Toast
          </button>
        </div>
        <div className="fixed top-20 right-4 flex flex-col gap-2 z-50">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`px-4 py-3 rounded-lg text-white shadow-lg animate-fade-in ${
                toast.severity === 'success' ? 'bg-green-500' :
                toast.severity === 'error' ? 'bg-red-500' :
                toast.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
              }`}
            >
              {toast.message}
            </div>
          ))}
        </div>
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
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ToastPage;

