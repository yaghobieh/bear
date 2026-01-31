import { FC, useState, useCallback } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { NotificationCenter } from '@forgedevstack/bear';
import type { NotificationItem } from '@forgedevstack/bear';

const createNotification = (overrides: Partial<NotificationItem> = {}): NotificationItem => ({
  id: crypto.randomUUID(),
  type: 'info',
  title: 'Sample notification',
  description: 'This is a sample notification message.',
  timestamp: new Date(),
  read: false,
  ...overrides,
});

const NotificationCenterPage: FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => [
    createNotification({ id: '1', type: 'success', title: 'Success', description: 'Your action was completed.', read: false }),
    createNotification({ id: '2', type: 'warning', title: 'Warning', description: 'Please check your settings.', read: true }),
    createNotification({ id: '3', type: 'error', title: 'Error', description: 'Something went wrong.', read: false }),
  ]);

  const handleMarkAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const handleDismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleClearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const handleNotificationClick = useCallback((n: NotificationItem) => {
    handleMarkAsRead(n.id);
  }, [handleMarkAsRead]);

  const sampleNotifications: NotificationItem[] = [
    createNotification({ id: 'a', type: 'info', title: 'New update available', description: 'Version 1.0.6 is ready.' }),
    createNotification({ id: 'b', type: 'success', title: 'Payment received', description: 'Your payment of $99 has been processed.' }),
    createNotification({ id: 'c', type: 'warning', title: 'Storage almost full', description: 'You have used 90% of your storage.' }),
  ];

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">NotificationCenter</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Notification center with bell icon, unread count badge, and dropdown panel.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { NotificationCenter } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Notification center with bell icon and badge."
        code={`<NotificationCenter
  notifications={notifications}
  onMarkAsRead={handleMarkAsRead}
  onDismiss={handleDismiss}
  onMarkAllAsRead={handleMarkAllAsRead}
  onClearAll={handleClearAll}
/>`}
        allowOverflow
      >
        <div className="flex justify-center">
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDismiss={handleDismiss}
            onMarkAllAsRead={handleMarkAllAsRead}
            onClearAll={handleClearAll}
            onNotificationClick={handleNotificationClick}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Different Notification Types"
        description="Info, success, warning, and error types."
        code={`const notifications = [
  { id: '1', type: 'info', title: 'Info', ... },
  { id: '2', type: 'success', title: 'Success', ... },
  { id: '3', type: 'warning', title: 'Warning', ... },
  { id: '4', type: 'error', title: 'Error', ... },
];
<NotificationCenter notifications={notifications} />`}
        allowOverflow
      >
        <div className="flex justify-center">
          <NotificationCenter
            notifications={sampleNotifications}
            onMarkAsRead={() => {}}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">notifications</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>NotificationItem[]</code></td><td>List of notifications</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onMarkAsRead</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(id: string) =&gt; void</code></td><td>Mark notification as read</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onMarkAllAsRead</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td>Mark all as read</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onDismiss</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(id: string) =&gt; void</code></td><td>Dismiss notification</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onClearAll</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td>Clear all notifications</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxVisible</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td>Max notifications before &quot;Show more&quot;</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default NotificationCenterPage;
