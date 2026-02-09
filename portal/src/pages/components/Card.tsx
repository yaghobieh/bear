import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Card, CardHeader, CardBody, CardFooter, Button, Avatar } from '@forgedevstack/bear';

const CardPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Card</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Container for related content and actions.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Card, CardHeader, CardBody, CardFooter } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Card"
        description="Simple card with content."
        code={`<Card>
  <CardBody>
    <p>Simple card content</p>
  </CardBody>
</Card>`}
      >
        <div className="max-w-sm mx-auto">
          <Card>
            <CardBody>
              <p>This is a simple card with just content. Cards are flexible containers for any type of content.</p>
            </CardBody>
          </Card>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Header and Footer"
        description="Card with header and footer sections."
        code={`<Card>
  <CardHeader title="Card Title" subtitle="Subtitle text" />
  <CardBody>
    <p>Card content goes here...</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
      >
        <div className="max-w-sm mx-auto">
          <Card>
            <CardHeader title="Card Title" subtitle="A helpful subtitle" />
            <CardBody>
              <p>This card has a header, body, and footer sections. Use them to organize your content.</p>
            </CardBody>
            <CardFooter>
              <Button size="sm">Learn More</Button>
            </CardFooter>
          </Card>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Different card styles."
        code={`<Card variant="elevated">Elevated</Card>
<Card variant="outlined">Outlined</Card>
<Card variant="filled">Filled</Card>
<Card variant="ghost">Ghost</Card>`}
      >
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          <Card variant="elevated">
            <CardBody>
              <p className="font-medium">Elevated</p>
              <p className="text-sm text-gray-500">With shadow</p>
            </CardBody>
          </Card>
          <Card variant="outlined">
            <CardBody>
              <p className="font-medium">Outlined</p>
              <p className="text-sm text-gray-500">With border</p>
            </CardBody>
          </Card>
          <Card variant="filled">
            <CardBody>
              <p className="font-medium">Filled</p>
              <p className="text-sm text-gray-500">Solid background</p>
            </CardBody>
          </Card>
          <Card variant="ghost">
            <CardBody>
              <p className="font-medium">Ghost</p>
              <p className="text-sm text-gray-500">Minimal style</p>
            </CardBody>
          </Card>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Interactive Card"
        description="Cards with hover effects."
        code={`<Card interactive onClick={() => {}}>
  <CardBody>
    <h3>Click me!</h3>
  </CardBody>
</Card>`}
      >
        <div className="max-w-sm mx-auto">
          <Card interactive onClick={() => alert('Card clicked!')}>
            <CardBody>
              <h3 className="font-semibold text-lg mb-2">Interactive Card</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Click this card to trigger an action. Great for navigation.
              </p>
            </CardBody>
          </Card>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Profile Card"
        description="Card styled for user profiles."
        code={`<Card>
  <CardBody className="text-center">
    <Avatar src="..." size="xl" />
    <h3>John Doe</h3>
    <p>Software Engineer</p>
  </CardBody>
</Card>`}
      >
        <div className="max-w-xs mx-auto">
          <Card>
            <CardBody className="text-center">
              <Avatar src="https://i.pravatar.cc/100?img=3" size="xl" className="mx-auto mb-4" />
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-gray-500 text-sm">Software Engineer</p>
              <div className="mt-4 flex justify-center gap-2">
                <Button size="sm" variant="outline">Follow</Button>
                <Button size="sm">Message</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Card with Action in Header"
        description="Header with action button."
        code={`<Card>
  <CardHeader 
    title="Settings" 
    action={<Button size="sm" variant="ghost">Edit</Button>} 
  />
  <CardBody>...</CardBody>
</Card>`}
      >
        <div className="max-w-sm mx-auto">
          <Card>
            <CardHeader 
              title="Settings" 
              subtitle="Manage your preferences"
              action={<Button size="sm" variant="ghost">Edit</Button>} 
            />
            <CardBody>
              <p className="text-gray-600 dark:text-gray-400">
                Configure your application settings here.
              </p>
            </CardBody>
          </Card>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>elevated | outlined | filled | ghost</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">elevated</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">padding</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>xs | sm | md | lg | xl | none</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Card padding</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">radius</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg | xl | 2xl | none</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">lg</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Border radius</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">interactive</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Hover effects</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CardPage;
