import { defineStory } from '@forgedevstack/kiln';
import { Checkbox } from './Checkbox';

export default defineStory({
  title: 'Checkbox',
  component: Checkbox,
  description: 'Checkbox component for boolean selection with support for indeterminate state.',
  props: {
    label: {
      type: 'text',
      default: 'Accept terms',
      description: 'Checkbox label',
    },
    checked: {
      type: 'boolean',
      default: false,
      description: 'Whether checkbox is checked',
    },
    indeterminate: {
      type: 'boolean',
      default: false,
      description: 'Whether checkbox is in indeterminate state',
    },
    size: {
      type: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      default: 'md',
      description: 'Size of the checkbox',
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
      description: 'Whether checkbox is disabled',
    },
    error: {
      type: 'boolean',
      default: false,
      description: 'Error state',
    },
  },
  variants: [
    {
      name: 'Unchecked',
      props: { label: 'Accept terms', checked: false },
    },
    {
      name: 'Checked',
      props: { label: 'Accept terms', checked: true },
    },
    {
      name: 'Indeterminate',
      props: { label: 'Select all', indeterminate: true },
    },
    {
      name: 'Success Variant',
      props: { label: 'Subscribe to newsletter', checked: true, variant: 'success' },
    },
    {
      name: 'Large',
      props: { label: 'Large checkbox', size: 'lg' },
    },
    {
      name: 'With Error',
      props: { label: 'Required field', error: true, helperText: 'This field is required' },
    },
    {
      name: 'Disabled',
      props: { label: 'Disabled option', disabled: true, checked: true },
    },
  ],
});

