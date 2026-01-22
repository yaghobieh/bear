import { defineStories } from '@forgedevstack/kiln';
import { Popover } from './Popover';

export default defineStories({
  title: 'Popover',
  component: Popover,
  description: 'Floating content panel.',
  stories: [
    {
      name: 'Default',
      component: () => (
        <Popover
          trigger={<button style={{ padding: '8px 16px', background: '#E85D04', color: 'white', borderRadius: '8px' }}>Open</button>}
          content={<div style={{ padding: '16px' }}>Popover content</div>}
        />
      ),
      code: `<Popover
  trigger={<Button>Open</Button>}
  content={<div>Content</div>}
/>`,
      description: 'Basic popover',
    },
    {
      name: 'Placements',
      component: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Popover placement="top" trigger={<button>Top</button>} content={<div>Top</div>} />
          <Popover placement="bottom" trigger={<button>Bottom</button>} content={<div>Bottom</div>} />
          <Popover placement="left" trigger={<button>Left</button>} content={<div>Left</div>} />
          <Popover placement="right" trigger={<button>Right</button>} content={<div>Right</div>} />
        </div>
      ),
      code: `<Popover placement="top" ... />
<Popover placement="bottom" ... />`,
      description: 'Different placements',
    },
  ],
});

