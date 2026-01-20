import { defineStories } from '@forgedevstack/kiln';
import { Button } from './Button';

export default defineStories({
  title: 'Button',
  component: Button,
  description: 'Versatile button component with multiple variants, sizes, and states.',
  stories: [
    {
      name: 'Default',
      component: () => <Button>Click me</Button>,
      code: `<Button>Click me</Button>`,
      description: 'Default primary button',
    },
    {
      name: 'Variants',
      component: () => (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="error">Error</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
        </div>
      ),
      code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>`,
      description: 'All available button variants',
    },
    {
      name: 'Sizes',
      component: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      ),
      code: `<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`,
      description: 'Different button sizes',
    },
    {
      name: 'Loading State',
      component: () => (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button loading>Loading</Button>
          <Button variant="secondary" loading>Processing</Button>
        </div>
      ),
      code: `<Button loading>Loading</Button>
<Button variant="secondary" loading>Processing</Button>`,
      description: 'Button with loading spinner',
    },
    {
      name: 'Disabled',
      component: () => (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      ),
      code: `<Button disabled>Disabled</Button>`,
      description: 'Disabled button state',
    },
    {
      name: 'Full Width',
      component: () => (
        <div style={{ width: '300px' }}>
          <Button fullWidth>Full Width Button</Button>
        </div>
      ),
      code: `<Button fullWidth>Full Width Button</Button>`,
      description: 'Button that spans full container width',
    },
  ],
});

