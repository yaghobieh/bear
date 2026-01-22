import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const TooltipPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tooltip</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Informative popup that appears on hover or focus.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Tooltip } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple tooltip on hover."
        code={`<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`}
      >
        <div className="flex justify-center py-8">
          <div className="relative group">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
              Hover me
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              This is a tooltip
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Positions"
        description="Tooltip can appear in different positions."
        code={`<Tooltip content="Top" position="top" />
<Tooltip content="Right" position="right" />
<Tooltip content="Bottom" position="bottom" />
<Tooltip content="Left" position="left" />`}
      >
        <div className="flex flex-wrap justify-center gap-4 py-4">
          {[
            { position: 'top', classes: 'bottom-full mb-2' },
            { position: 'right', classes: 'left-full ml-2 top-1/2 -translate-y-1/2' },
            { position: 'bottom', classes: 'top-full mt-2' },
            { position: 'left', classes: 'right-full mr-2 top-1/2 -translate-y-1/2' },
          ].map(({ position, classes }) => (
            <div key={position} className="relative group">
              <button className="px-4 py-2 bg-bear-500 text-white rounded-lg">
                {position}
              </button>
              <div className={`absolute ${classes} left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                {position} tooltip
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Arrow"
        description="Tooltip with pointer arrow."
        code={`<Tooltip content="With arrow" arrow>
  <Button>Hover</Button>
</Tooltip>`}
      >
        <div className="flex justify-center py-8">
          <div className="relative group">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
              Hover me
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Tooltip with arrow
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Rich Content"
        description="Tooltip with formatted content."
        code={`<Tooltip
  content={
    <div>
      <strong>Title</strong>
      <p>Description text</p>
    </div>
  }
>
  <Button>Rich tooltip</Button>
</Tooltip>`}
      >
        <div className="flex justify-center py-8">
          <div className="relative group">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
              Hover me
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity w-48">
              <div className="font-semibold mb-1">Rich Tooltip</div>
              <p className="text-gray-300 text-xs">This tooltip contains formatted content with a title and description.</p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Delay"
        description="Tooltip with show/hide delay."
        code={`<Tooltip content="Delayed" delay={500}>
  <Button>500ms delay</Button>
</Tooltip>`}
      >
        <div className="flex justify-center gap-4 py-4">
          <div className="text-center">
            <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 mb-2">
              No delay
            </div>
            <span className="text-xs text-gray-500">0ms</span>
          </div>
          <div className="text-center">
            <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 mb-2">
              Short delay
            </div>
            <span className="text-xs text-gray-500">300ms</span>
          </div>
          <div className="text-center">
            <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 mb-2">
              Long delay
            </div>
            <span className="text-xs text-gray-500">1000ms</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Different tooltip colors."
        code={`<Tooltip content="Default" />
<Tooltip content="Light" variant="light" />
<Tooltip content="Primary" color="primary" />`}
      >
        <div className="flex justify-center gap-8 py-4">
          <div className="text-center">
            <div className="px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md mb-2">Dark</div>
            <span className="text-xs text-gray-500">default</span>
          </div>
          <div className="text-center">
            <div className="px-3 py-1.5 bg-white dark:bg-gray-200 text-gray-900 text-sm rounded-md shadow-lg mb-2">Light</div>
            <span className="text-xs text-gray-500">light</span>
          </div>
          <div className="text-center">
            <div className="px-3 py-1.5 bg-bear-500 text-white text-sm rounded-md mb-2">Primary</div>
            <span className="text-xs text-gray-500">primary</span>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">content</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Tooltip content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">position</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>top | right | bottom | left</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">top</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Tooltip position</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">delay</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">0</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show delay (ms)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">arrow</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show arrow</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>dark | light | primary</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">dark</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color variant</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TooltipPage;
