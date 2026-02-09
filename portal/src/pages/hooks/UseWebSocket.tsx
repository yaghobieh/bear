import React from 'react';
import { Typography, CardCompound as Card, Badge } from '@forgedevstack/bear';

const UseWebSocketPage: React.FC = () => {
  // Note: Demo without actual WebSocket connection
  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h1" className="mb-4">useWebSocket</Typography>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          WebSocket connection management with auto-reconnect and message handling.
        </Typography>
      </div>

      {/* Features */}
      <Card>
        <Card.Header title={<Typography variant="h5">Features</Typography>} />
        <Card.Body>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Badge variant="success" size="sm">✓</Badge>
              <Typography variant="body2">Auto-connect on mount</Typography>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="success" size="sm">✓</Badge>
              <Typography variant="body2">Auto-reconnect with configurable attempts</Typography>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="success" size="sm">✓</Badge>
              <Typography variant="body2">JSON message parsing</Typography>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="success" size="sm">✓</Badge>
              <Typography variant="body2">Connection status tracking</Typography>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="success" size="sm">✓</Badge>
              <Typography variant="body2">TypeScript generics for message types</Typography>
            </li>
          </ul>
        </Card.Body>
      </Card>

      {/* Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Usage</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`import { useWebSocket } from '@forgedevstack/bear';

interface Message {
  type: string;
  data: unknown;
}

const { 
  status, 
  isConnected, 
  lastMessage, 
  send, 
  sendJson,
  connect,
  disconnect 
} = useWebSocket<Message>('wss://api.example.com/ws', {
  autoConnect: true,
  autoReconnect: true,
  reconnectAttempts: 5,
  reconnectInterval: 3000,
  onOpen: () => console.log('Connected!'),
  onClose: () => console.log('Disconnected'),
  onMessage: (event) => console.log('Received:', event.data),
  onError: (error) => console.error('Error:', error),
});

// Send messages
sendJson({ type: 'ping' });
send('raw string message');

return (
  <div>
    <p>Status: {status}</p>
    <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
    <p>Last message: {JSON.stringify(lastMessage)}</p>
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
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">autoConnect</td>
                  <td className="py-2 px-3 font-mono text-xs">boolean</td>
                  <td className="py-2 px-3 font-mono text-xs">true</td>
                  <td className="py-2 px-3">Connect on mount</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">autoReconnect</td>
                  <td className="py-2 px-3 font-mono text-xs">boolean</td>
                  <td className="py-2 px-3 font-mono text-xs">true</td>
                  <td className="py-2 px-3">Auto-reconnect on disconnect</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">reconnectAttempts</td>
                  <td className="py-2 px-3 font-mono text-xs">number</td>
                  <td className="py-2 px-3 font-mono text-xs">5</td>
                  <td className="py-2 px-3">Max reconnect attempts</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">reconnectInterval</td>
                  <td className="py-2 px-3 font-mono text-xs">number</td>
                  <td className="py-2 px-3 font-mono text-xs">3000</td>
                  <td className="py-2 px-3">Reconnect delay (ms)</td>
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
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">status</td>
                  <td className="py-2 px-3 font-mono text-xs">WebSocketStatus</td>
                  <td className="py-2 px-3">'connecting' | 'open' | 'closing' | 'closed'</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">isConnected</td>
                  <td className="py-2 px-3 font-mono text-xs">boolean</td>
                  <td className="py-2 px-3">Whether connected</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">lastMessage</td>
                  <td className="py-2 px-3 font-mono text-xs">T | null</td>
                  <td className="py-2 px-3">Last received message</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">send / sendJson</td>
                  <td className="py-2 px-3 font-mono text-xs">function</td>
                  <td className="py-2 px-3">Send raw or JSON message</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-3 font-mono text-xs text-pink-600 dark:text-pink-400">connect / disconnect</td>
                  <td className="py-2 px-3 font-mono text-xs">function</td>
                  <td className="py-2 px-3">Manual connection control</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UseWebSocketPage;
