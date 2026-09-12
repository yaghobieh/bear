import type { PropRow } from '@/components/PropsTable';

export const CARD_SKELETON_PROPS: PropRow[] = [
  { name: 'animation', type: "'pulse' | 'wave' | 'none'", default: 'pulse', description: 'Placeholder motion' },
  { name: 'width', type: 'number | string', description: 'Card width' },
  { name: 'height', type: 'number | string', description: 'Card height' },
];

export const CARD_SKELETON_CODE = `import { CardSkeleton } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return <CardSkeleton />;
}
`;
