import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { KilnLink } from '@/components/KilnLink';
import { LinesOfCode } from '@/components/LinesOfCode';
import { Mark, Typography } from '@forgedevstack/bear';

const MarkPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mark</h1>
        <KilnLink path="/mark" />
        <LinesOfCode lines={28} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Semantic mark element for indicating relevance or importance of text.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Mark } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Default mark styling."
        code={`<p>
  Search results for: <Mark>react hooks</Mark>
</p>`}
      >
        <p className="text-gray-900 dark:text-white">
          Search results for: <Mark>react hooks</Mark>
        </p>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Use different colors for marking."
        code={`<Mark color="default">Default</Mark>
<Mark color="pink">Pink</Mark>
<Mark color="blue">Blue</Mark>
<Mark color="green">Green</Mark>
<Mark color="red">Red</Mark>`}
      >
        <div className="flex flex-wrap gap-4 text-gray-900 dark:text-white">
          <Mark color="default">Default</Mark>
          <Mark color="pink">Pink</Mark>
          <Mark color="blue">Blue</Mark>
          <Mark color="green">Green</Mark>
          <Mark color="red">Red</Mark>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Search Highlighting"
        description="Common use case for search result highlighting."
        code={`<Typography>
  The <Mark>Bear UI</Mark> library provides <Mark>React</Mark> 
  components that are fully <Mark>accessible</Mark> and customizable.
</Typography>`}
      >
        <Typography className="text-gray-900 dark:text-white">
          The <Mark>Bear UI</Mark> library provides <Mark>React</Mark> 
          components that are fully <Mark>accessible</Mark> and customizable.
        </Typography>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>'default' | 'pink' | 'blue' | 'green' | 'red'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'default'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Highlight color</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text to mark</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MarkPage;
