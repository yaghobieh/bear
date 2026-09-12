import type { PropRow } from '@/components/PropsTable';

export const APPROVAL_CARD_PROPS: PropRow[] = [
  { name: 'title', type: 'string', description: 'Card heading' },
  { name: 'onApprove', type: '() => void', description: 'Approve action' },
  { name: 'onReject', type: '() => void', description: 'Reject action' },
  { name: 'children', type: 'ReactNode', description: 'Proposed change' },
];

export const APPROVAL_CARD_CODE = `import { useState } from 'react';
import { Alert, ApprovalCard } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  const [status, setStatus] = useState('pending');

  return (
    <>
      <ApprovalCard
        title="Apply the suggested edit"
        onApprove={() => setStatus('approved')}
        onReject={() => setStatus('rejected')}
      >
        Replace the single-line input with PromptComposer.
      </ApprovalCard>
      <Alert severity="info">Status: {status}</Alert>
    </>
  );
}
`;
