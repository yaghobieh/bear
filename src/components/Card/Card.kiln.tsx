import { defineStories } from '@forgedevstack/kiln';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button';

export default defineStories({
  title: 'Card',
  component: Card,
  description: 'Flexible container component for grouping related content.',
  stories: [
    {
      name: 'Default',
      component: () => (
        <Card>
          <CardBody>
            <p>This is a basic card with some content inside.</p>
          </CardBody>
        </Card>
      ),
      code: `<Card>
  <CardBody>
    <p>This is a basic card with some content inside.</p>
  </CardBody>
</Card>`,
      description: 'Simple card with body content',
    },
    {
      name: 'With Header',
      component: () => (
        <Card>
          <CardHeader title="Card Title" subtitle="Optional subtitle" />
          <CardBody>
            <p>Card content goes here with all the important information.</p>
          </CardBody>
        </Card>
      ),
      code: `<Card>
  <CardHeader title="Card Title" subtitle="Optional subtitle" />
  <CardBody>
    <p>Card content goes here.</p>
  </CardBody>
</Card>`,
      description: 'Card with header containing title and subtitle',
    },
    {
      name: 'Full Card',
      component: () => (
        <Card>
          <CardHeader title="Complete Card" subtitle="With all sections" />
          <CardBody>
            <p>This card demonstrates the full structure with header, body, and footer sections.</p>
          </CardBody>
          <CardFooter>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button size="sm">Save</Button>
          </CardFooter>
        </Card>
      ),
      code: `<Card>
  <CardHeader title="Complete Card" subtitle="With all sections" />
  <CardBody>
    <p>This card demonstrates the full structure.</p>
  </CardBody>
  <CardFooter>
    <Button variant="ghost" size="sm">Cancel</Button>
    <Button size="sm">Save</Button>
  </CardFooter>
</Card>`,
      description: 'Card with header, body, and footer',
    },
    {
      name: 'Variants',
      component: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Card variant="elevated" style={{ width: '200px' }}>
            <CardBody>Elevated</CardBody>
          </Card>
          <Card variant="outlined" style={{ width: '200px' }}>
            <CardBody>Outlined</CardBody>
          </Card>
          <Card variant="filled" style={{ width: '200px' }}>
            <CardBody>Filled</CardBody>
          </Card>
        </div>
      ),
      code: `<Card variant="elevated">Elevated</Card>
<Card variant="outlined">Outlined</Card>
<Card variant="filled">Filled</Card>`,
      description: 'Different card visual styles',
    },
    {
      name: 'Hoverable',
      component: () => (
        <Card hoverable style={{ width: '300px' }}>
          <CardBody>
            <p>Hover over this card to see the effect.</p>
          </CardBody>
        </Card>
      ),
      code: `<Card hoverable>
  <CardBody>Hover over this card</CardBody>
</Card>`,
      description: 'Card with hover effect',
    },
  ],
});

