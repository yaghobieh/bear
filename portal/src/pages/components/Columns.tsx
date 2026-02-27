import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { Columns, Column, Card } from '@forgedevstack/bear';

const ColumnsPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Columns</h1>
        <LinesOfCode lines={85} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        CSS columns layout component for newspaper-style content flow.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Columns, Column } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Multi-column layout with content flowing naturally between columns."
        code={`<Columns count={3} gap="md">
  <Column><Card>Card 1</Card></Column>
  <Column><Card>Card 2</Card></Column>
  <Column><Card>Card 3</Card></Column>
  <Column><Card>Card 4</Card></Column>
  <Column><Card>Card 5</Card></Column>
  <Column><Card>Card 6</Card></Column>
</Columns>`}
      >
        <Columns count={3} gap="md">
          <Column>
            <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white">Card 1</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">First column content</p>
            </Card>
          </Column>
          <Column>
            <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white">Card 2</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">This is a longer card with more content to show how columns work.</p>
            </Card>
          </Column>
          <Column>
            <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white">Card 3</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Third column</p>
            </Card>
          </Column>
          <Column>
            <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white">Card 4</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fourth item flows to next column</p>
            </Card>
          </Column>
          <Column>
            <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white">Card 5</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">More content here</p>
            </Card>
          </Column>
          <Column>
            <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white">Card 6</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Final item</p>
            </Card>
          </Column>
        </Columns>
      </ComponentPreview>

      <ComponentPreview
        title="Auto Width"
        description="Responsive columns with automatic sizing based on minimum width."
        code={`<Columns count="auto" minWidth={200} gap="lg">
  {items.map(item => (
    <Column key={item.id}>
      <Card>{item.content}</Card>
    </Column>
  ))}
</Columns>`}
      >
        <Columns count="auto" minWidth={200} gap="lg">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Column key={i}>
              <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-bold text-gray-900 dark:text-white">Item {i}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Auto-sizing column</p>
              </Card>
            </Column>
          ))}
        </Columns>
      </ComponentPreview>

      <ComponentPreview
        title="Two Columns"
        description="Simple two-column layout like a newspaper."
        code={`<Columns count={2} gap="xl">
  <Column><Card>Left</Card></Column>
  <Column><Card>Right</Card></Column>
  <Column><Card>More content</Card></Column>
</Columns>`}
      >
        <Columns count={2} gap="xl">
          <Column>
            <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white">Left</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Content flows naturally</p>
            </Card>
          </Column>
          <Column>
            <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white">Right</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Like a newspaper</p>
            </Card>
          </Column>
          <Column>
            <Card className="p-4 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white">Third</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">More items flow down</p>
            </Card>
          </Column>
        </Columns>
      </ComponentPreview>

      <ComponentPreview
        title="Gap Sizes"
        description="Different gap sizes between columns."
        code={`<Columns count={4} gap="xs" />
<Columns count={4} gap="md" />
<Columns count={4} gap="xl" />`}
      >
        <div className="space-y-8">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">gap="xs"</p>
            <Columns count={4} gap="xs">
              {[1, 2, 3, 4].map((i) => (
                <Column key={i}>
                  <Card className="p-2 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white">Item {i}</Card>
                </Column>
              ))}
            </Columns>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">gap="md"</p>
            <Columns count={4} gap="md">
              {[1, 2, 3, 4].map((i) => (
                <Column key={i}>
                  <Card className="p-2 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white">Item {i}</Card>
                </Column>
              ))}
            </Columns>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">gap="xl"</p>
            <Columns count={4} gap="xl">
              {[1, 2, 3, 4].map((i) => (
                <Column key={i}>
                  <Card className="p-2 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white">Item {i}</Card>
                </Column>
              ))}
            </Columns>
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
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">count</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>1-6 | "auto"</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Number of columns (default: auto)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">gap</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>"none" | "xs" | "sm" | "md" | "lg" | "xl"</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Gap between columns (default: md)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">fill</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Balance column heights</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">minWidth</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string | number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Minimum column width for auto mode</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Column Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">span</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>"avoid" | "auto"</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Column span behavior (avoid breaks)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ColumnsPage;

