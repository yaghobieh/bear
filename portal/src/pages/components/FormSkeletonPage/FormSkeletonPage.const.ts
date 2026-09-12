import type { PropRow } from '@/components/PropsTable';

export const FORM_SKELETON_FIELDS = 3;

export const FORM_SKELETON_PROPS: PropRow[] = [
  { name: 'fields', type: 'number', default: '3', description: 'Number of placeholder fields' },
  { name: 'animation', type: "'pulse' | 'wave' | 'none'", default: 'pulse', description: 'Placeholder motion' },
];

export const FORM_SKELETON_CODE = `import { FormSkeleton } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return <FormSkeleton fields={3} animation="pulse" />;
}
`;

export const FORM_SKELETON_STATIC_CODE = `import { Flex, FormSkeleton } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return (
    <Flex direction="column" gap={4}>
      <FormSkeleton fields={2} animation="none" />
    </Flex>
  );
}
`;
