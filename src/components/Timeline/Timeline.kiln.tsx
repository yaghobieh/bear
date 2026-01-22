import { defineStories } from '@forgedevstack/kiln';
import { Timeline } from './Timeline';

export default defineStories({
  title: 'Timeline',
  component: Timeline,
  description: 'Chronological event display.',
  stories: [
    {
      name: 'Default',
      component: () => (
        <Timeline
          items={[
            { title: 'Event 1', description: 'First event' },
            { title: 'Event 2', description: 'Second event' },
            { title: 'Event 3', description: 'Third event' },
          ]}
        />
      ),
      code: `<Timeline items={[
  { title: 'Event 1', description: 'First' },
  { title: 'Event 2', description: 'Second' },
]} />`,
      description: 'Basic timeline',
    },
    {
      name: 'Alternate',
      component: () => (
        <Timeline
          align="alternate"
          items={[
            { title: 'Step 1', description: 'Description' },
            { title: 'Step 2', description: 'Description' },
            { title: 'Step 3', description: 'Description' },
          ]}
        />
      ),
      code: `<Timeline align="alternate" items={[...]} />`,
      description: 'Alternating sides',
    },
  ],
});

