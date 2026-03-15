import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { CopyImport } from '@/components/CopyImport';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';

const AnchorPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Anchor</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={140} />
        <CopyImport componentName="Anchor" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Scroll-spy sidebar navigation that highlights the active section as users scroll. Supports nested links, smooth scrolling, and affix mode.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Anchor } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Vertical link list with scroll-spy. Active link gets a left indicator."
        code={`<Anchor links={[
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'api', label: 'API Reference', children: [
    { id: 'props', label: 'Props' },
    { id: 'events', label: 'Events' },
  ]},
]} />`}
      >
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 max-w-xs">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-3 space-y-2">
            <div className="border-l-2 border-pink-500 -ml-[2px] pl-3 text-pink-500 dark:text-pink-400 text-sm font-medium">Overview</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">Usage</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">API Reference</div>
            <div className="pl-3 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">Props</div>
            <div className="pl-3 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">Events</div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default AnchorPage;
