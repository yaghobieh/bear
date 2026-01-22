import { defineStory } from '@forgedevstack/kiln';
import { Fab } from './Fab';

const PlusIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default defineStory({
  title: 'Fab',
  component: Fab,
  description: 'Floating Action Button for primary actions that appear in front of all screen content.',
  props: {
    size: {
      type: 'select',
      options: ['sm', 'md', 'lg'],
      default: 'md',
      description: 'Size of the FAB',
    },
    variant: {
      type: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      default: 'primary',
      description: 'Color variant',
    },
    extended: {
      type: 'boolean',
      default: false,
      description: 'Extended FAB with label',
    },
    position: {
      type: 'select',
      options: ['relative', 'bottom-right', 'bottom-left', 'top-right', 'top-left', 'bottom-center'],
      default: 'relative',
      description: 'Position on screen',
    },
    shadow: {
      type: 'boolean',
      default: true,
      description: 'Show shadow',
    },
    animated: {
      type: 'boolean',
      default: true,
      description: 'Animation on hover',
    },
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Whether FAB is disabled',
    },
  },
  render: (props) => (
    <Fab {...props}>
      <PlusIcon />
    </Fab>
  ),
  variants: [
    {
      name: 'Default',
      props: {},
    },
    {
      name: 'Large Success',
      props: { size: 'lg', variant: 'success' },
    },
    {
      name: 'Small Secondary',
      props: { size: 'sm', variant: 'secondary' },
    },
    {
      name: 'Danger',
      props: { variant: 'danger' },
    },
    {
      name: 'Disabled',
      props: { disabled: true },
    },
  ],
});

