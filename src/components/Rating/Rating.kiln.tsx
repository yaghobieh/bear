import { defineStory } from '@forgedevstack/kiln';
import { Rating } from './Rating';

export default defineStory({
  title: 'Rating',
  component: Rating,
  description: 'Rating component for displaying and capturing user ratings with customizable stars and precision.',
  props: {
    value: {
      type: 'number',
      default: 3,
      description: 'Current rating value',
    },
    max: {
      type: 'number',
      default: 5,
      description: 'Maximum rating value',
    },
    size: {
      type: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      default: 'md',
      description: 'Size of the rating stars',
    },
    precision: {
      type: 'select',
      options: [0.5, 1],
      default: 1,
      description: 'Precision of rating (0.5 for half stars)',
    },
    readOnly: {
      type: 'boolean',
      default: false,
      description: 'Whether rating is read-only',
    },
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Whether rating is disabled',
    },
    showLabel: {
      type: 'boolean',
      default: false,
      description: 'Show value label next to stars',
    },
    color: {
      type: 'color',
      default: '#fbbf24',
      description: 'Color of filled stars',
    },
  },
  variants: [
    {
      name: 'Default',
      props: { value: 3, max: 5 },
    },
    {
      name: 'Half Stars',
      props: { value: 3.5, max: 5, precision: 0.5, readOnly: true },
    },
    {
      name: 'Large Pink',
      props: { value: 4, size: 'lg', color: '#ec4899' },
    },
    {
      name: 'With Label',
      props: { value: 4, showLabel: true },
    },
    {
      name: 'Read Only',
      props: { value: 4.5, readOnly: true, precision: 0.5 },
    },
    {
      name: 'Disabled',
      props: { value: 2, disabled: true },
    },
  ],
});

