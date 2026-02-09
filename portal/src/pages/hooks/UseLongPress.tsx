import React, { useState } from 'react';
import { Typography, CardCompound as Card, Button, useLongPress } from '@forgedevstack/bear';

const UseLongPressPage: React.FC = () => {
  const [message, setMessage] = useState('Press or hold the button');
  
  const longPressProps = useLongPress({
    threshold: 500,
    onLongPress: () => setMessage('🎉 Long pressed!'),
    onClick: () => setMessage('👆 Clicked!'),
    onStart: () => setMessage('⏳ Pressing...'),
  });

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h1" className="mb-4">useLongPress</Typography>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          Detect long press gestures with configurable threshold.
        </Typography>
      </div>

      {/* Live Demo */}
      <Card>
        <Card.Header title={<Typography variant="h5">Live Demo</Typography>} />
        <Card.Body>
          <div className="text-center space-y-4">
            <Button {...longPressProps} variant="primary" size="lg">
              Press & Hold (500ms)
            </Button>
            <Typography variant="body1" className="mt-4">
              {message}
            </Typography>
          </div>
        </Card.Body>
      </Card>

      {/* Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Usage</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`import { useLongPress } from '@forgedevstack/bear';

const longPressProps = useLongPress({
  threshold: 500, // 500ms
  onLongPress: () => console.log('Long pressed!'),
  onClick: () => console.log('Clicked!'),
  onStart: () => console.log('Press started'),
  onFinish: () => console.log('Press finished'),
  onCancel: () => console.log('Press cancelled'),
});

return <button {...longPressProps}>Hold me</button>;`}
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
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">threshold</td>
                  <td className="py-2 px-3 font-mono text-xs">number</td>
                  <td className="py-2 px-3 font-mono text-xs">400</td>
                  <td className="py-2 px-3">Long press duration in ms</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">onLongPress</td>
                  <td className="py-2 px-3 font-mono text-xs">(e) =&gt; void</td>
                  <td className="py-2 px-3 font-mono text-xs">-</td>
                  <td className="py-2 px-3">Callback for long press</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">onClick</td>
                  <td className="py-2 px-3 font-mono text-xs">(e) =&gt; void</td>
                  <td className="py-2 px-3 font-mono text-xs">-</td>
                  <td className="py-2 px-3">Callback for regular click</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">disabled</td>
                  <td className="py-2 px-3 font-mono text-xs">boolean</td>
                  <td className="py-2 px-3 font-mono text-xs">false</td>
                  <td className="py-2 px-3">Disable detection</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Typography variant="subtitle2" className="mb-2">Returns</Typography>
          <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
            Returns event handlers to spread on your element:
            <code className="ml-2 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">
              onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchEnd
            </code>
          </Typography>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UseLongPressPage;
