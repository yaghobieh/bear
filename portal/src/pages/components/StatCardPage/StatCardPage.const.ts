import type { PropRow } from '@/components/PropsTable';

export const STAT_CARD_PROPS: PropRow[] = [
  { name: 'title', type: 'string', description: 'Metric label' },
  { name: 'value', type: 'string | number', description: 'Primary value' },
  { name: 'color', type: 'string', description: 'Gradient hex' },
  { name: 'onClick', type: '() => void', description: 'Optional view-all action' },
];

export const STAT_CARD_CODE = `import { Flex, StatCard } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return (
    <Flex gap={4} wrap="wrap">
      <StatCard title="Users" value="1.2k" />
      <StatCard title="Revenue" value="$48k" color="#8b5cf6" onClick={() => undefined} />
    </Flex>
  );
}
`;
