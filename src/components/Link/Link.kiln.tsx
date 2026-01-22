import { defineStory } from '@forgedevstack/kiln';
import { Link } from './Link';

export default defineStory({
  title: 'Link',
  component: Link,
  description: 'Link component for navigation with various styles and external link support.',
  props: {
    children: {
      type: 'text',
      default: 'Click here',
      description: 'Link text',
    },
    href: {
      type: 'text',
      default: '#',
      description: 'Link URL',
    },
    variant: {
      type: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'inherit'],
      default: 'primary',
      description: 'Link color variant',
    },
    underline: {
      type: 'select',
      options: ['none', 'hover', 'always'],
      default: 'hover',
      description: 'Underline behavior',
    },
    external: {
      type: 'boolean',
      default: false,
      description: 'Opens in new tab',
    },
    showExternalIcon: {
      type: 'boolean',
      default: true,
      description: 'Show external link icon',
    },
  },
  variants: [
    {
      name: 'Default',
      props: { href: '#', children: 'Default link' },
    },
    {
      name: 'Secondary',
      props: { href: '#', children: 'Secondary link', variant: 'secondary' },
    },
    {
      name: 'Always Underlined',
      props: { href: '#', children: 'Always underlined', underline: 'always' },
    },
    {
      name: 'No Underline',
      props: { href: '#', children: 'No underline', underline: 'none' },
    },
    {
      name: 'External',
      props: { href: 'https://example.com', children: 'External link', external: true },
    },
    {
      name: 'Custom Color',
      props: { href: '#', children: 'Custom color', color: '#8b5cf6' },
    },
  ],
});

