import { defineStory } from '@forgedevstack/kiln';
import { Typography } from './Typography';

export default defineStory({
  title: 'Typography',
  component: Typography,
  description: 'Typography component for consistent text styling across the application.',
  props: {
    variant: {
      type: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline', 'code'],
      default: 'body1',
      description: 'Typography variant',
    },
    children: {
      type: 'text',
      default: 'The quick brown fox jumps over the lazy dog',
      description: 'Text content',
    },
    align: {
      type: 'select',
      options: ['left', 'center', 'right', 'justify'],
      default: 'left',
      description: 'Text alignment',
    },
    color: {
      type: 'select',
      options: ['primary', 'secondary', 'muted', 'success', 'danger', 'warning'],
      default: 'primary',
      description: 'Text color',
    },
    weight: {
      type: 'select',
      options: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
      default: undefined,
      description: 'Font weight override',
    },
    italic: {
      type: 'boolean',
      default: false,
      description: 'Make text italic',
    },
    underline: {
      type: 'boolean',
      default: false,
      description: 'Make text underlined',
    },
    truncate: {
      type: 'boolean',
      default: false,
      description: 'Truncate with ellipsis',
    },
  },
  variants: [
    {
      name: 'Heading 1',
      props: { variant: 'h1', children: 'Heading 1' },
    },
    {
      name: 'Heading 2',
      props: { variant: 'h2', children: 'Heading 2' },
    },
    {
      name: 'Heading 3',
      props: { variant: 'h3', children: 'Heading 3' },
    },
    {
      name: 'Body Text',
      props: { variant: 'body1', children: 'This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    },
    {
      name: 'Caption',
      props: { variant: 'caption', children: 'Caption text', color: 'muted' },
    },
    {
      name: 'Overline',
      props: { variant: 'overline', children: 'OVERLINE TEXT' },
    },
    {
      name: 'Code',
      props: { variant: 'code', children: 'const x = 42;' },
    },
    {
      name: 'Colored',
      props: { variant: 'body1', children: 'Success colored text', color: 'success' },
    },
  ],
});

