import type { PropRow } from '@/components/PropsTable';

export const CHAT_ERROR_PROPS: PropRow[] = [
  { name: 'title', type: 'string', description: 'Error heading' },
  { name: 'children', type: 'ReactNode', description: 'Error detail' },
  { name: 'onRetry', type: '() => void', description: 'Retry action' },
];

export const CHAT_ERROR_CODE = `import { useState } from 'react';
import { ChatError } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  const [retries, setRetries] = useState(0);

  return (
    <ChatError title="Request failed" onRetry={() => setRetries((count) => count + 1)}>
      The model timed out. Try again. Retries: {retries}
    </ChatError>
  );
}
`;

export const CHAT_ERROR_STATIC_CODE = `import { ChatError } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return (
    <ChatError title="Quota exceeded">
      Daily token budget is used up. Try again tomorrow.
    </ChatError>
  );
}
`;
