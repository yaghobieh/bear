import { defineStory } from '@forgedevstack/kiln';
import { Divider } from './Divider';

export default defineStory({
  title: 'Divider',
  component: Divider,
  description: 'Divider component for separating content with optional text.',
  props: {
    orientation: {
      type: 'select',
      options: ['horizontal', 'vertical'],
      default: 'horizontal',
      description: 'Orientation of the divider',
    },
    variant: {
      type: 'select',
      options: ['solid', 'dashed', 'dotted'],
      default: 'solid',
      description: 'Style variant',
    },
    textAlign: {
      type: 'select',
      options: ['left', 'center', 'right'],
      default: 'center',
      description: 'Text alignment when children present',
    },
    thickness: {
      type: 'number',
      default: 1,
      description: 'Thickness of the divider line',
    },
    spacing: {
      type: 'number',
      default: 4,
      description: 'Spacing around the divider',
    },
    color: {
      type: 'color',
      default: '#e5e7eb',
      description: 'Color of the divider',
    },
  },
  variants: [
    {
      name: 'Simple',
      props: {},
    },
    {
      name: 'With Text',
      props: { children: 'OR' },
    },
    {
      name: 'Dashed',
      props: { variant: 'dashed' },
    },
    {
      name: 'Dotted Pink',
      props: { variant: 'dotted', color: '#ec4899', thickness: 2 },
    },
    {
      name: 'Text Left',
      props: { children: 'Section', textAlign: 'left' },
    },
    {
      name: 'Thick',
      props: { thickness: 3 },
    },
  ],
});

