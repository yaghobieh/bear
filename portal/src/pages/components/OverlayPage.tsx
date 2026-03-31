import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Overlay, Button, Card } from '@forgedevstack/bear';

const OverlayPage: FC = () => {
  const [show, setShow] = useState(false);
  const [showBlur, setShowBlur] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Overlay</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A standalone overlay / backdrop component. Use it to dim content behind modals, drawers, or custom floating UI.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Overlay } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Covers its positioned parent with a semi-transparent backdrop."
        code={`<div className="relative h-40">
  <Overlay visible={show} onClick={() => setShow(false)} />
  <p>Content underneath</p>
</div>`}
      >
        <div className="relative h-40 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center">
          <Overlay visible={show} onClick={() => setShow(false)} />
          <Button onClick={() => setShow(!show)}>{show ? 'Click overlay to dismiss' : 'Show Overlay'}</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Blur"
        description="Add a blur effect to the backdrop."
        code={`<Overlay visible blur={4} />`}
      >
        <div className="relative h-40 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center">
          <Overlay visible={showBlur} blur={4} opacity={0.4} onClick={() => setShowBlur(false)} />
          <Button onClick={() => setShowBlur(!showBlur)}>{showBlur ? 'Click to dismiss' : 'Show Blur Overlay'}</Button>
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
                <td className="p-3 font-mono text-pink-500">visible</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3">Controls visibility</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">opacity</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3">0.6</td>
                <td className="p-3">Background opacity (0-1)</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">blur</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3">—</td>
                <td className="p-3">Backdrop blur in px</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">fixed</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3">Use fixed positioning (viewport)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-pink-500">onClick</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3">—</td>
                <td className="p-3">Click handler</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
};

export default OverlayPage;
