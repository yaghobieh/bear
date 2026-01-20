import { defineStories } from '@forgedevstack/kiln';
import { Badge } from './Badge';

export default defineStories({
  title: 'Badge',
  component: Badge,
  description: 'Small status indicators and labels for highlighting information.',
  stories: [
    {
      name: 'Default',
      component: () => <Badge>Badge</Badge>,
      code: `<Badge>Badge</Badge>`,
      description: 'Default badge appearance',
    },
    {
      name: 'Variants',
      component: () => (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      ),
      code: `<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="neutral">Neutral</Badge>`,
      description: 'All badge color variants',
    },
    {
      name: 'Sizes',
      component: () => (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Badge size="xs">XS</Badge>
          <Badge size="sm">SM</Badge>
          <Badge size="md">MD</Badge>
          <Badge size="lg">LG</Badge>
        </div>
      ),
      code: `<Badge size="xs">XS</Badge>
<Badge size="sm">SM</Badge>
<Badge size="md">MD</Badge>
<Badge size="lg">LG</Badge>`,
      description: 'Available badge sizes',
    },
    {
      name: 'Pill Shape',
      component: () => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Badge pill>Pill Badge</Badge>
          <Badge pill variant="success">Active</Badge>
          <Badge pill variant="error">Offline</Badge>
        </div>
      ),
      code: `<Badge pill>Pill Badge</Badge>
<Badge pill variant="success">Active</Badge>
<Badge pill variant="error">Offline</Badge>`,
      description: 'Rounded pill-shaped badges',
    },
    {
      name: 'With Dot',
      component: () => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Badge dot variant="success">Online</Badge>
          <Badge dot variant="warning">Away</Badge>
          <Badge dot variant="error">Busy</Badge>
        </div>
      ),
      code: `<Badge dot variant="success">Online</Badge>
<Badge dot variant="warning">Away</Badge>
<Badge dot variant="error">Busy</Badge>`,
      description: 'Badges with status dot indicator',
    },
  ],
});

