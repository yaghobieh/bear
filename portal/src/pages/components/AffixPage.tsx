import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';

const AffixPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Affix</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={65} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Sticky positioning wrapper — fixes an element to the viewport when scrolled past a threshold. Useful for sticky headers, navigation, or action buttons.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Affix } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Fixes element to the bottom-right when scrolling."
        code={`<Affix position="bottom" offset={20}>
  <Button>Scroll to top</Button>
</Affix>`}
      >
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Affix renders children with sticky behavior on scroll. Try it in your project!</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Top Position"
        description="Fix to top of viewport."
        code={`<Affix position="top" offset={80}>
  <div className="p-2 bg-pink-500 text-white rounded">
    Sticky header
  </div>
</Affix>`}
      >
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Sticks element to the top of the viewport after scrolling past offset.</p>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default AffixPage;
