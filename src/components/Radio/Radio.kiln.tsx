import { defineStory } from '@forgedevstack/kiln';
import { Radio, RadioGroup } from './Radio';

export default defineStory({
  title: 'Radio',
  component: RadioGroup,
  description: 'Radio buttons for single selection from multiple options.',
  props: {
    name: {
      type: 'text',
      default: 'example-group',
      description: 'Group name for all radios',
    },
    value: {
      type: 'select',
      options: ['option1', 'option2', 'option3'],
      default: 'option1',
      description: 'Current selected value',
    },
    direction: {
      type: 'select',
      options: ['column', 'row'],
      default: 'column',
      description: 'Layout direction',
    },
    size: {
      type: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      default: 'md',
      description: 'Size of the radio buttons',
    },
    variant: {
      type: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      default: 'primary',
      description: 'Color variant',
    },
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Whether radios are disabled',
    },
    gap: {
      type: 'number',
      default: 2,
      description: 'Gap between items',
    },
  },
  render: (props) => (
    <RadioGroup {...props}>
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
  variants: [
    {
      name: 'Default',
      props: { name: 'demo', value: 'option1' },
    },
    {
      name: 'Horizontal',
      props: { name: 'demo-h', value: 'option2', direction: 'row' },
    },
    {
      name: 'Large Success',
      props: { name: 'demo-lg', size: 'lg', variant: 'success', value: 'option1' },
    },
    {
      name: 'Disabled',
      props: { name: 'demo-disabled', disabled: true, value: 'option1' },
    },
  ],
});

