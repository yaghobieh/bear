import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { KilnLink } from '@/components/KilnLink';
import { LinesOfCode } from '@/components/LinesOfCode';
import { Em, Typography } from '@forgedevstack/bear';

const EmPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Em</h1>
        <KilnLink path="/em" />
        <LinesOfCode lines={25} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Emphasized text component for highlighting important content with italic styling.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Em } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple emphasized text."
        code={`<p>
  This is <Em>emphasized</Em> text.
</p>`}
      >
        <p className="text-gray-900 dark:text-white">
          This is <Em>emphasized</Em> text.
        </p>
      </ComponentPreview>

      <ComponentPreview
        title="In Context"
        description="Em works great within Typography or paragraphs."
        code={`<Typography>
  Bear UI is <Em>the best</Em> component library for React.
  It provides <Em>beautiful</Em> and <Em>accessible</Em> components.
</Typography>`}
      >
        <Typography className="text-gray-900 dark:text-white">
          Bear UI is <Em>the best</Em> component library for React.
          It provides <Em>beautiful</Em> and <Em>accessible</Em> components.
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
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text content to emphasize</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">className</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Additional CSS classes</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default EmPage;

