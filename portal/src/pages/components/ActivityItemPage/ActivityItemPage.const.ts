import type { PropRow } from '@/components/PropsTable';

export const ACTIVITY_ITEM_PROPS: PropRow[] = [
  { name: 'icon', type: 'ReactNode', description: 'Leading icon' },
  { name: 'title', type: 'string', description: 'Activity title' },
  { name: 'description', type: 'string', description: 'Optional detail' },
  { name: 'time', type: 'string', description: 'Relative or absolute time' },
  { name: 'user', type: 'string', description: 'Actor name' },
];

export const ACTIVITY_ITEM_CODE = `import { ActivityItem, Badge } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return (
    <ActivityItem
      icon={<Badge variant="primary" size="sm">A</Badge>}
      title="Published a post"
      description="Release notes for Chart and the component catalog."
      time="2m"
      user="Ada"
    />
  );
}
`;
