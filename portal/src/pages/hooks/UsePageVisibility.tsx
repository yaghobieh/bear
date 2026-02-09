import React from 'react';
import { Typography, CardCompound as Card, Badge, usePageVisibility } from '@forgedevstack/bear';

const UsePageVisibilityPage: React.FC = () => {
  const { isVisible, visibilityState } = usePageVisibility({
    onVisible: () => console.log('Tab is visible'),
    onHidden: () => console.log('Tab is hidden'),
  });

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h1" className="mb-4">usePageVisibility</Typography>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          Detect when the page/tab is visible or hidden.
        </Typography>
      </div>

      {/* Live Demo */}
      <Card>
        <Card.Header title={<Typography variant="h5">Live Demo</Typography>} />
        <Card.Body>
          <div className="flex items-center gap-4 mb-4">
            <Typography variant="body1">Tab Status:</Typography>
            <Badge variant={isVisible ? 'success' : 'warning'} size="lg">
              {isVisible ? '👁 Visible' : '🙈 Hidden'}
            </Badge>
          </div>
          
          <Typography variant="body2" className="text-neutral-500">
            Visibility state: <code className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">{visibilityState}</code>
          </Typography>

          <Typography variant="body2" className="mt-4 text-neutral-500">
            Try switching to another tab and back to see the status change!
          </Typography>
        </Card.Body>
      </Card>

      {/* Use Cases */}
      <Card>
        <Card.Header title={<Typography variant="h5">Common Use Cases</Typography>} />
        <Card.Body>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Badge variant="primary" size="sm">🎬</Badge>
              <Typography variant="body2">Pause/resume video playback</Typography>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="primary" size="sm">🔔</Badge>
              <Typography variant="body2">Show desktop notifications when tab is hidden</Typography>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="primary" size="sm">📊</Badge>
              <Typography variant="body2">Pause expensive animations or computations</Typography>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="primary" size="sm">🔄</Badge>
              <Typography variant="body2">Refresh data when tab becomes visible</Typography>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="primary" size="sm">📈</Badge>
              <Typography variant="body2">Track user engagement analytics</Typography>
            </li>
          </ul>
        </Card.Body>
      </Card>

      {/* Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Usage</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`import { usePageVisibility } from '@forgedevstack/bear';

const { isVisible, visibilityState } = usePageVisibility({
  onVisible: () => {
    // Resume video, refresh data, etc.
    videoRef.current?.play();
  },
  onHidden: () => {
    // Pause video, stop animations, etc.
    videoRef.current?.pause();
  },
});

// Also useful for conditional rendering
useEffect(() => {
  if (isVisible) {
    // Start polling for updates
    startPolling();
  } else {
    // Stop polling to save resources
    stopPolling();
  }
}, [isVisible]);`}
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
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">onVisible</td>
                  <td className="py-2 px-3 font-mono text-xs">() =&gt; void</td>
                  <td className="py-2 px-3">Callback when page becomes visible</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">onHidden</td>
                  <td className="py-2 px-3 font-mono text-xs">() =&gt; void</td>
                  <td className="py-2 px-3">Callback when page becomes hidden</td>
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
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">isVisible</td>
                  <td className="py-2 px-3 font-mono text-xs">boolean</td>
                  <td className="py-2 px-3">Whether the page is currently visible</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">visibilityState</td>
                  <td className="py-2 px-3 font-mono text-xs">DocumentVisibilityState</td>
                  <td className="py-2 px-3">'visible' | 'hidden' | 'prerender'</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UsePageVisibilityPage;
