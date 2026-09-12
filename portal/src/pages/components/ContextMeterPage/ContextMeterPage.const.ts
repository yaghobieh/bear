import type { PropRow } from '@/components/PropsTable';

export const CONTEXT_METER_USED = 72;
export const CONTEXT_METER_MAX = 100;

export const CONTEXT_METER_PROPS: PropRow[] = [
  { name: 'used', type: 'number', description: 'Tokens or units used' },
  { name: 'max', type: 'number', description: 'Budget maximum' },
];

export const CONTEXT_METER_CODE = `import { ContextMeter } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return <ContextMeter used={72} max={100} />;
}
`;

export const CONTEXT_METER_HIGH_CODE = `import { Flex, ContextMeter } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return (
    <Flex direction="column" gap={3}>
      <ContextMeter used={18} max={100} />
      <ContextMeter used={96} max={100} />
    </Flex>
  );
}
`;
