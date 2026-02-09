import React from 'react';
import { Typography, CardCompound as Card, Badge, Button, useIdle } from '@forgedevstack/bear';

const UseIdlePage: React.FC = () => {
  const { isIdle, remaining, lastActive, reset, pause, resume } = useIdle({
    timeout: 10000, // 10 seconds for demo
    onIdle: () => console.log('User is idle'),
    onActive: () => console.log('User is active'),
  });

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h1" className="mb-4">useIdle</Typography>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          Detect user inactivity with configurable timeout and callbacks.
        </Typography>
      </div>

      {/* Live Demo */}
      <Card>
        <Card.Header title={<Typography variant="h5">Live Demo (10s timeout)</Typography>} />
        <Card.Body>
          <div className="flex items-center gap-4 mb-4">
            <Typography variant="body1">Status:</Typography>
            <Badge variant={isIdle ? 'warning' : 'success'} size="lg">
              {isIdle ? '💤 Idle' : '✨ Active'}
            </Badge>
          </div>
          
          <div className="space-y-2 mb-4">
            <Typography variant="body2">
              Time until idle: <strong>{Math.ceil(remaining / 1000)}s</strong>
            </Typography>
            <Typography variant="caption" className="opacity-60">
              Last active: {new Date(lastActive).toLocaleTimeString()}
            </Typography>
          </div>

          <div className="flex gap-2">
            <Button onClick={reset} variant="primary" size="sm">Reset Timer</Button>
            <Button onClick={pause} variant="ghost" size="sm">Pause</Button>
            <Button onClick={resume} variant="ghost" size="sm">Resume</Button>
          </div>

          <Typography variant="body2" className="mt-4 text-neutral-500">
            Stop moving your mouse for 10 seconds to see idle state!
          </Typography>
        </Card.Body>
      </Card>

      {/* Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Usage</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`import { useIdle } from '@forgedevstack/bear';

const { isIdle, remaining, reset, pause, resume } = useIdle({
  timeout: 60000, // 1 minute
  onIdle: () => showSessionWarning(),
  onActive: () => hideSessionWarning(),
});

return (
  <div>
    {isIdle ? 'User is idle' : \`Active (\${remaining}ms left)\`}
    <button onClick={reset}>Reset</button>
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
                  <th className="text-left py-2 px-3 font-semibold">Default</th>
                  <th className="text-left py-2 px-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900">
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">timeout</td>
                  <td className="py-2 px-3 font-mono text-xs">number</td>
                  <td className="py-2 px-3 font-mono text-xs">60000</td>
                  <td className="py-2 px-3">Idle timeout in ms</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">onIdle</td>
                  <td className="py-2 px-3 font-mono text-xs">() =&gt; void</td>
                  <td className="py-2 px-3 font-mono text-xs">-</td>
                  <td className="py-2 px-3">Callback when user becomes idle</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">onActive</td>
                  <td className="py-2 px-3 font-mono text-xs">() =&gt; void</td>
                  <td className="py-2 px-3 font-mono text-xs">-</td>
                  <td className="py-2 px-3">Callback when user becomes active</td>
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
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">isIdle</td>
                  <td className="py-2 px-3 font-mono text-xs">boolean</td>
                  <td className="py-2 px-3">Whether user is idle</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">remaining</td>
                  <td className="py-2 px-3 font-mono text-xs">number</td>
                  <td className="py-2 px-3">Time until idle (ms)</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">reset</td>
                  <td className="py-2 px-3 font-mono text-xs">() =&gt; void</td>
                  <td className="py-2 px-3">Reset idle timer</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">pause / resume</td>
                  <td className="py-2 px-3 font-mono text-xs">() =&gt; void</td>
                  <td className="py-2 px-3">Pause/resume detection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UseIdlePage;
