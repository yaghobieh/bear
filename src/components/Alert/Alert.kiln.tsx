import { defineStory } from '@forgedevstack/kiln';
import { Alert } from './Alert';

export default defineStory({
  title: 'Alert',
  component: Alert,
  description: 'Alert component for displaying important messages to users.',
  props: {
    severity: {
      type: 'select',
      options: ['success', 'info', 'warning', 'error'],
      default: 'info',
      description: 'Alert severity/type',
    },
    variant: {
      type: 'select',
      options: ['standard', 'filled', 'outlined'],
      default: 'standard',
      description: 'Alert visual variant',
    },
    title: {
      type: 'text',
      default: '',
      description: 'Alert title',
    },
    children: {
      type: 'text',
      default: 'This is an alert message.',
      description: 'Alert content',
    },
    icon: {
      type: 'boolean',
      default: true,
      description: 'Whether to show icon',
    },
    closable: {
      type: 'boolean',
      default: false,
      description: 'Whether alert can be closed',
    },
  },
  variants: [
    {
      name: 'Success',
      props: { severity: 'success', children: 'Operation completed successfully!' },
    },
    {
      name: 'Info',
      props: { severity: 'info', children: 'This is an informational message.' },
    },
    {
      name: 'Warning',
      props: { severity: 'warning', children: 'Warning: Please review your input.' },
    },
    {
      name: 'Error',
      props: { severity: 'error', children: 'An error occurred. Please try again.' },
    },
    {
      name: 'With Title',
      props: { severity: 'info', title: 'Information', children: 'This alert has a title.' },
    },
    {
      name: 'Filled',
      props: { severity: 'success', variant: 'filled', children: 'Filled variant alert.' },
    },
    {
      name: 'Outlined',
      props: { severity: 'warning', variant: 'outlined', children: 'Outlined variant alert.' },
    },
    {
      name: 'Closable',
      props: { severity: 'info', closable: true, children: 'This alert can be closed.' },
    },
  ],
});

