import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { CloseButton, Card } from '@forgedevstack/bear';

const CloseButtonPage: FC = () => (
  <div className="fade-in">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">CloseButton</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-8">
      A pre-styled dismiss/close button with consistent sizing and accessibility. Drop it into modals, alerts, toasts, or cards.
    </p>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
      <CodeBlock code={`import { CloseButton } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
    </section>

    <ComponentPreview
      title="Sizes"
      description="Available from xs to xl."
      code={`<CloseButton size="xs" />
<CloseButton size="sm" />
<CloseButton size="md" />
<CloseButton size="lg" />
<CloseButton size="xl" />`}
    >
      <div className="flex items-center gap-4 justify-center">
        <CloseButton size="xs" />
        <CloseButton size="sm" />
        <CloseButton size="md" />
        <CloseButton size="lg" />
        <CloseButton size="xl" />
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="Disabled"
      description="Visually muted and non-interactive when disabled."
      code={`<CloseButton disabled />`}
    >
      <div className="flex items-center gap-4 justify-center">
        <CloseButton />
        <CloseButton disabled />
      </div>
    </ComponentPreview>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
      <Card className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-3 font-medium">Prop</th>
              <th className="text-left p-3 font-medium">Type</th>
              <th className="text-left p-3 font-medium">Default</th>
              <th className="text-left p-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-400">
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-3 font-mono text-pink-500">onClick</td>
              <td className="p-3 font-mono">() =&gt; void</td>
              <td className="p-3">—</td>
              <td className="p-3">Click handler</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-3 font-mono text-pink-500">size</td>
              <td className="p-3 font-mono">BearSize</td>
              <td className="p-3">"md"</td>
              <td className="p-3">Button dimensions</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-3 font-mono text-pink-500">disabled</td>
              <td className="p-3 font-mono">boolean</td>
              <td className="p-3">false</td>
              <td className="p-3">Disable interaction</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-pink-500">aria-label</td>
              <td className="p-3 font-mono">string</td>
              <td className="p-3">"Close"</td>
              <td className="p-3">Accessible label</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </section>
  </div>
);

export default CloseButtonPage;
