import { defineStory } from '@forgedevstack/kiln';
import { Paper } from './Paper';

export default defineStory({
  title: 'Paper',
  component: Paper,
  description: 'Paper component as a surface container with elevation shadows.',
  props: {
    elevation: {
      type: 'select',
      options: [0, 1, 2, 3, 4, 5],
      default: 1,
      description: 'Elevation level (shadow depth)',
    },
    rounded: {
      type: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      default: 'md',
      description: 'Border radius variant',
    },
    variant: {
      type: 'select',
      options: ['elevation', 'outlined'],
      default: 'elevation',
      description: 'Paper variant',
    },
    padding: {
      type: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      default: 'md',
      description: 'Padding size',
    },
    background: {
      type: 'select',
      options: ['default', 'paper', 'transparent'],
      default: 'default',
      description: 'Background color',
    },
    fullWidth: {
      type: 'boolean',
      default: false,
      description: 'Whether paper should fill parent width',
    },
    children: {
      type: 'text',
      default: 'Paper content',
      description: 'Content',
    },
  },
  variants: [
    {
      name: 'Default',
      props: { elevation: 1, padding: 'md', children: 'Default paper with elevation' },
    },
    {
      name: 'High Elevation',
      props: { elevation: 4, padding: 'md', children: 'High elevation shadow' },
    },
    {
      name: 'Outlined',
      props: { variant: 'outlined', padding: 'md', children: 'Outlined variant' },
    },
    {
      name: 'Rounded XL',
      props: { elevation: 2, rounded: 'xl', padding: 'lg', children: 'Extra rounded corners' },
    },
    {
      name: 'Paper Background',
      props: { elevation: 0, background: 'paper', padding: 'md', children: 'Paper background color' },
    },
  ],
});

