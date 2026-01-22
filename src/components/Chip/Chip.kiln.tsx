import { defineStories } from '@forgedevstack/kiln';
import { Chip } from './Chip';

export default defineStories({
  title: 'Chip',
  component: Chip,
  description: 'Compact element for tags and filters.',
  stories: [
    {
      name: 'Default',
      component: () => <Chip label="React" />,
      code: `<Chip label="React" />`,
      description: 'Basic chip',
    },
    {
      name: 'Variants',
      component: () => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Chip variant="filled" label="Filled" />
          <Chip variant="outlined" label="Outlined" />
          <Chip variant="soft" label="Soft" />
        </div>
      ),
      code: `<Chip variant="filled" label="Filled" />
<Chip variant="outlined" label="Outlined" />`,
      description: 'Different styles',
    },
    {
      name: 'Deletable',
      component: () => <Chip label="Click X" onDelete={() => alert('Deleted!')} />,
      code: `<Chip label="Tag" onDelete={() => handleDelete()} />`,
      description: 'With delete button',
    },
    {
      name: 'Sizes',
      component: () => (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Chip size="sm" label="Small" />
          <Chip size="md" label="Medium" />
          <Chip size="lg" label="Large" />
        </div>
      ),
      code: `<Chip size="sm" label="Small" />
<Chip size="md" label="Medium" />`,
      description: 'Different sizes',
    },
  ],
});

