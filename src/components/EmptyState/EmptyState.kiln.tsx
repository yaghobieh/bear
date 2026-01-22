import { defineStories } from '@forgedevstack/kiln';
import { EmptyState } from './EmptyState';

export default defineStories({
  title: 'EmptyState',
  component: EmptyState,
  description: 'Placeholder for empty content.',
  stories: [
    {
      name: 'Default',
      component: () => (
        <EmptyState
          title="No data found"
          description="Try adjusting your filters"
        />
      ),
      code: `<EmptyState title="No data" description="Try adjusting filters" />`,
      description: 'Basic empty state',
    },
    {
      name: 'With Action',
      component: () => (
        <EmptyState
          title="No projects yet"
          description="Get started by creating your first project"
          action={<button style={{ padding: '8px 16px', background: '#E85D04', color: 'white', borderRadius: '8px' }}>Create Project</button>}
        />
      ),
      code: `<EmptyState title="..." action={<Button>Create</Button>} />`,
      description: 'With call-to-action',
    },
  ],
});

