import React from 'react';
import { Typography, CardCompound as Card, Badge, useOnline } from '@forgedevstack/bear';

const UseOnlinePage: React.FC = () => {
  const { isOnline, since } = useOnline({
    onOnline: () => console.log('Back online!'),
    onOffline: () => console.log('Gone offline!'),
  });

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h1" className="mb-4">useOnline</Typography>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          Detect online/offline network status with callbacks.
        </Typography>
      </div>

      {/* Live Demo */}
      <Card>
        <Card.Header title={<Typography variant="h5">Live Demo</Typography>} />
        <Card.Body>
          <div className="flex items-center gap-4">
            <Typography variant="body1">Network Status:</Typography>
            <Badge variant={isOnline ? 'success' : 'danger'} size="lg">
              {isOnline ? '🟢 Online' : '🔴 Offline'}
            </Badge>
          </div>
          {since && (
            <Typography variant="caption" className="mt-2 block opacity-60">
              Last change: {new Date(since).toLocaleTimeString()}
            </Typography>
          )}
          <Typography variant="body2" className="mt-4 text-neutral-500">
            Try turning off your WiFi to see the status change!
          </Typography>
        </Card.Body>
      </Card>

      {/* Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Usage</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`import { useOnline } from '@forgedevstack/bear';

const { isOnline, since } = useOnline({
  onOnline: () => console.log('Back online!'),
  onOffline: () => console.log('Gone offline!'),
});

return (
  <div>
    {isOnline ? '🟢 Online' : '🔴 Offline'}
    {since && <span>Changed at: {new Date(since).toLocaleTimeString()}</span>}
  </div>
);`}
          </pre>
        </Card.Body>
      </Card>

      {/* API */}
      <Card>
        <Card.Header title={<Typography variant="h5">API</Typography>} />
        <Card.Body>
          <Typography variant="subtitle2" className="mb-2">Options</Typography>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-neutral-900 dark:text-neutral-100">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-2 px-3 font-semibold">Option</th>
                  <th className="text-left py-2 px-3 font-semibold">Type</th>
                  <th className="text-left py-2 px-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900">
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">onOnline</td>
                  <td className="py-2 px-3 font-mono text-xs">() =&gt; void</td>
                  <td className="py-2 px-3">Callback when going online</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">onOffline</td>
                  <td className="py-2 px-3 font-mono text-xs">() =&gt; void</td>
                  <td className="py-2 px-3">Callback when going offline</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Typography variant="subtitle2" className="mb-2">Returns</Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-neutral-900 dark:text-neutral-100">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-2 px-3 font-semibold">Property</th>
                  <th className="text-left py-2 px-3 font-semibold">Type</th>
                  <th className="text-left py-2 px-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900">
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">isOnline</td>
                  <td className="py-2 px-3 font-mono text-xs">boolean</td>
                  <td className="py-2 px-3">Current online status</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">since</td>
                  <td className="py-2 px-3 font-mono text-xs">number | null</td>
                  <td className="py-2 px-3">Timestamp of last status change</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UseOnlinePage;
