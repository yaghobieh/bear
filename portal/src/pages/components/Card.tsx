import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const CardPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Card</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Container for related content and actions.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Card } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Card"
        description="Simple card with content."
        code={`<Card>
  <Card.Body>
    <p>Simple card content</p>
  </Card.Body>
</Card>`}
      >
        <div className="max-w-sm mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <p className="text-gray-600 dark:text-gray-400">This is a simple card with just content. Cards are flexible containers for any type of content.</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Header & Footer"
        description="Card with header, body, and footer sections."
        code={`<Card>
  <Card.Header>Card Title</Card.Header>
  <Card.Body>Card content...</Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>`}
      >
        <div className="max-w-sm mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Card Title</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-600 dark:text-gray-400">This is the card body content. You can put any content here.</p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <button className="px-4 py-2 bg-bear-500 text-white rounded-lg hover:bg-bear-600 transition-colors">
                Action
              </button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Image"
        description="Card with media content."
        code={`<Card>
  <Card.Image src="/image.jpg" alt="Cover" />
  <Card.Body>
    <Card.Title>Image Card</Card.Title>
    <p>Card with image content.</p>
  </Card.Body>
</Card>`}
      >
        <div className="max-w-sm mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-bear-400 to-purple-500" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Image Card</h3>
              <p className="text-gray-600 dark:text-gray-400">Card with a beautiful gradient image at the top.</p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Interactive Card"
        description="Hoverable card for clickable items."
        code={`<Card hoverable onClick={() => {}}>
  <Card.Body>Click me!</Card.Body>
</Card>`}
      >
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {[1, 2].map(i => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-bear-100 dark:bg-bear-900/30 text-bear-600 dark:text-bear-400 flex items-center justify-center mb-3">
                {i === 1 ? '📦' : '🚀'}
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {i === 1 ? 'Feature One' : 'Feature Two'}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Hover to see the interactive effect
              </p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Outlined"
        description="Card with border instead of shadow."
        code={`<Card variant="outlined">
  <Card.Body>Outlined card</Card.Body>
</Card>`}
      >
        <div className="max-w-sm mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
            <p className="text-gray-600 dark:text-gray-400">This card uses a border instead of a shadow for a flatter appearance.</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Horizontal Layout"
        description="Card with horizontal content arrangement."
        code={`<Card direction="horizontal">
  <Card.Image src="/image.jpg" width={200} />
  <Card.Body>
    <Card.Title>Horizontal Card</Card.Title>
    <p>Content beside the image.</p>
  </Card.Body>
</Card>`}
      >
        <div className="max-w-lg mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 flex-shrink-0" />
            <div className="p-4 flex flex-col justify-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Horizontal Card</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Content arranged horizontally next to the image.</p>
            </div>
          </div>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>elevated | outlined | flat</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">elevated</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Card style variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">hoverable</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable hover effect</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">direction</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>vertical | horizontal</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">vertical</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Content direction</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">padding</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>none | sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Content padding</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CardPage;
