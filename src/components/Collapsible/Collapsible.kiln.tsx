import { defineStories } from '@forgedevstack/kiln';
import { Collapsible } from './Collapsible';

export default defineStories({
  title: 'Collapsible',
  component: Collapsible,
  description: 'Expandable content section.',
  stories: [
    {
      name: 'Default',
      component: () => (
        <Collapsible
          trigger={<button style={{ padding: '8px 16px', background: '#f0f0f0', borderRadius: '8px', width: '100%', textAlign: 'left' }}>Click to expand</button>}
        >
          <div style={{ padding: '16px', background: '#f9f9f9', marginTop: '8px' }}>
            This is the collapsible content.
          </div>
        </Collapsible>
      ),
      code: `<Collapsible trigger={<Button>Toggle</Button>}>
  <p>Content here...</p>
</Collapsible>`,
      description: 'Basic collapsible',
    },
    {
      name: 'Initially Open',
      component: () => (
        <Collapsible
          isOpen
          trigger={<button style={{ padding: '8px 16px', background: '#f0f0f0', borderRadius: '8px' }}>Toggle</button>}
        >
          <div style={{ padding: '16px' }}>Visible by default</div>
        </Collapsible>
      ),
      code: `<Collapsible isOpen>...</Collapsible>`,
      description: 'Open by default',
    },
  ],
});

