import type { PropRow } from '@/components/PropsTable';

export const TABLE_SKELETON_ROWS = 4;
export const TABLE_SKELETON_COLUMNS = 4;

export const TABLE_SKELETON_PROPS: PropRow[] = [
  { name: 'rows', type: 'number', description: 'Placeholder row count' },
  { name: 'columns', type: 'number', description: 'Placeholder column count' },
  { name: 'animation', type: "'pulse' | 'wave' | 'none'", default: 'pulse', description: 'Placeholder motion' },
];

export const TABLE_SKELETON_CODE = `import { TableSkeleton } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return <TableSkeleton rows={4} columns={4} />;
}
`;
