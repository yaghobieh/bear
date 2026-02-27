import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { Highlight, Typography } from '@forgedevstack/bear';

const HighlightPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Highlight</h1>
        <LinesOfCode lines={30} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Highlight text with a colored background to draw attention to specific content.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Highlight } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Default yellow highlight."
        code={`<p>
  This is <Highlight>highlighted</Highlight> text.
</p>`}
      >
        <p className="text-gray-900 dark:text-white">
          This is <Highlight>highlighted</Highlight> text.
        </p>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Use different colors for highlighting."
        code={`<Highlight color="yellow">Yellow</Highlight>
<Highlight color="pink">Pink</Highlight>
<Highlight color="blue">Blue</Highlight>
<Highlight color="green">Green</Highlight>
<Highlight color="purple">Purple</Highlight>
<Highlight color="orange">Orange</Highlight>`}
      >
        <div className="flex flex-wrap gap-4 text-gray-900 dark:text-white">
          <Highlight color="yellow">Yellow</Highlight>
          <Highlight color="pink">Pink</Highlight>
          <Highlight color="blue">Blue</Highlight>
          <Highlight color="green">Green</Highlight>
          <Highlight color="purple">Purple</Highlight>
          <Highlight color="orange">Orange</Highlight>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="In Context"
        description="Use highlights within text blocks."
        code={`<Typography>
  When using Bear UI, the <Highlight>most important</Highlight> thing 
  is to wrap your app with the <Highlight color="blue">BearProvider</Highlight>.
</Typography>`}
      >
        <Typography className="text-gray-900 dark:text-white">
          When using Bear UI, the <Highlight>most important</Highlight> thing 
          is to wrap your app with the <Highlight color="blue">BearProvider</Highlight>.
        </Typography>
      </ComponentPreview>

      <ComponentPreview
        title="Animated"
        description="Add a subtle pulse animation."
        code={`<Highlight animated>Animated highlight</Highlight>`}
      >
        <p className="text-gray-900 dark:text-white">
          This is an <Highlight animated>animated highlight</Highlight> effect.
        </p>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>'yellow' | 'pink' | 'blue' | 'green' | 'purple' | 'orange'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'yellow'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Highlight color</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">animated</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Add pulse animation</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text to highlight</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HighlightPage;
