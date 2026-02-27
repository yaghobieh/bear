import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { HoverCard, Button, Avatar } from '@forgedevstack/bear';

const HoverCardPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HoverCard</h1>
        <LinesOfCode lines={95} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Display additional content when hovering over an element. Great for user profiles, previews, and contextual information.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { HoverCard } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple hover card with text content."
        code={`<HoverCard cardContent={<p>This is the hover card content!</p>}>
  <Button variant="secondary">Hover me</Button>
</HoverCard>`}
      >
        <HoverCard cardContent={<p className="text-gray-900 dark:text-white">This is the hover card content!</p>}>
          <Button variant="secondary">Hover me</Button>
        </HoverCard>
      </ComponentPreview>

      <ComponentPreview
        title="User Profile Card"
        description="Common use case for displaying user information."
        code={`<HoverCard
  cardContent={
    <div className="flex gap-3">
      <Avatar src="..." />
      <div>
        <p className="font-bold">John Doe</p>
        <p className="text-sm text-gray-500">Frontend Developer</p>
      </div>
    </div>
  }
>
  <span className="text-pink-500 cursor-pointer">@johndoe</span>
</HoverCard>`}
      >
        <HoverCard
          cardContent={
            <div className="flex gap-3">
              <Avatar size="md" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Frontend Developer</p>
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">Building cool stuff with React 🚀</p>
              </div>
            </div>
          }
        >
          <span className="text-pink-500 cursor-pointer font-medium">@johndoe</span>
        </HoverCard>
      </ComponentPreview>

      <ComponentPreview
        title="Sides"
        description="Control where the hover card appears."
        code={`<HoverCard cardContent={...} side="top">...</HoverCard>
<HoverCard cardContent={...} side="bottom">...</HoverCard>
<HoverCard cardContent={...} side="left">...</HoverCard>
<HoverCard cardContent={...} side="right">...</HoverCard>`}
      >
        <div className="flex flex-wrap gap-4 justify-center py-12">
          <HoverCard
            cardContent={<p className="text-gray-900 dark:text-white">Appears on top</p>}
            side="top"
          >
            <Button size="sm">Top</Button>
          </HoverCard>
          <HoverCard
            cardContent={<p className="text-gray-900 dark:text-white">Appears on bottom</p>}
            side="bottom"
          >
            <Button size="sm">Bottom</Button>
          </HoverCard>
          <HoverCard
            cardContent={<p className="text-gray-900 dark:text-white">Appears on left</p>}
            side="left"
          >
            <Button size="sm">Left</Button>
          </HoverCard>
          <HoverCard
            cardContent={<p className="text-gray-900 dark:text-white">Appears on right</p>}
            side="right"
          >
            <Button size="sm">Right</Button>
          </HoverCard>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Element that triggers the hover card</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">cardContent</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Content to display in the card</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">side</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>'top' | 'bottom' | 'left' | 'right'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'bottom'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Side of the card</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">align</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>'start' | 'center' | 'end'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'center'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Alignment of the card</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">openDelay</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">200</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Delay before opening (ms)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">closeDelay</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">300</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Delay before closing (ms)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">arrow</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show arrow pointing to trigger</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HoverCardPage;
