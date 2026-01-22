import { defineStories } from '@forgedevstack/kiln';
import { Kbd } from './Kbd';

export default defineStories({
  title: 'Kbd',
  component: Kbd,
  description: 'Keyboard key display.',
  stories: [
    {
      name: 'Single Keys',
      component: () => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Kbd>⌘</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>Tab</Kbd>
        </div>
      ),
      code: `<Kbd>⌘</Kbd>
<Kbd>Shift</Kbd>
<Kbd>Enter</Kbd>`,
      description: 'Individual keys',
    },
    {
      name: 'Shortcuts',
      component: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Save:</span>
          <Kbd>⌘</Kbd>
          <span>+</span>
          <Kbd>S</Kbd>
        </div>
      ),
      code: `<span>Save: <Kbd>⌘</Kbd> + <Kbd>S</Kbd></span>`,
      description: 'Keyboard shortcuts',
    },
  ],
});

