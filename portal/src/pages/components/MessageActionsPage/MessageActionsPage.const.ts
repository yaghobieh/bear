import type { PropRow } from '@/components/PropsTable';

export const MESSAGE_ACTIONS_REPLY = 'Bear owns the chat surfaces. Your app owns the model loop.';

export const MESSAGE_ACTIONS_PROPS: PropRow[] = [
  { name: 'onCopy', type: '() => void', description: 'Copy the reply' },
  { name: 'onRetry', type: '() => void', description: 'Regenerate' },
  { name: 'onGood', type: '() => void', description: 'Mark helpful' },
  { name: 'onBad', type: '() => void', description: 'Mark unhelpful' },
];

export const MESSAGE_ACTIONS_CODE = `import { useState } from 'react';
import { Alert, MessageActions, Typography } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  const [action, setAction] = useState('idle');

  return (
    <>
      <Typography>Bear owns the chat surfaces. Your app owns the model loop.</Typography>
      <MessageActions
        onCopy={() => {
          navigator.clipboard.writeText('Bear owns the chat surfaces.');
          setAction('copy');
        }}
        onRetry={() => setAction('retry')}
        onGood={() => setAction('good')}
        onBad={() => setAction('bad')}
      />
      {action !== 'idle' && <Alert severity="info">Last action: {action}</Alert>}
    </>
  );
}
`;
