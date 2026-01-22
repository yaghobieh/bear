import { defineStory } from '@forgedevstack/kiln';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';

export default defineStory({
  title: 'ButtonGroup',
  component: ButtonGroup,
  description: 'ButtonGroup component for grouping related buttons together.',
  props: {
    size: {
      type: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      default: 'md',
      description: 'Size applied to all buttons',
    },
    variant: {
      type: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'outline', 'ghost'],
      default: 'primary',
      description: 'Variant applied to all buttons',
    },
    orientation: {
      type: 'select',
      options: ['horizontal', 'vertical'],
      default: 'horizontal',
      description: 'Orientation of the group',
    },
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Whether all buttons are disabled',
    },
    fullWidth: {
      type: 'boolean',
      default: false,
      description: 'Whether buttons should be full width',
    },
  },
  render: (props) => (
    <ButtonGroup {...props}>
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
  variants: [
    {
      name: 'Primary',
      props: { variant: 'primary' },
    },
    {
      name: 'Outline',
      props: { variant: 'outline' },
    },
    {
      name: 'Vertical',
      props: { orientation: 'vertical', variant: 'outline' },
    },
    {
      name: 'Large',
      props: { size: 'lg', variant: 'secondary' },
    },
    {
      name: 'Full Width',
      props: { fullWidth: true, variant: 'outline' },
    },
    {
      name: 'Disabled',
      props: { disabled: true },
    },
  ],
});

