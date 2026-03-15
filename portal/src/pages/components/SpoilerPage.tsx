import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { CopyImport } from '@/components/CopyImport';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Spoiler } from '@forgedevstack/bear';

const LONG_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.';

const SpoilerPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Spoiler</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={85} />
        <CopyImport componentName="Spoiler" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Truncates content to a max height with a "Show more / Show less" toggle. Smooth CSS transition for expand/collapse.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Spoiler } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Live props"
        description="Change max height and button labels below to see the Spoiler update in real time."
        code={`<Spoiler maxHeight={80} showLabel="Show" hideLabel="Hide">...</Spoiler>`}
        editableProps={{
          maxHeight: { type: 'number', default: 80, min: 40, max: 200 },
          showLabel: { type: 'string', default: 'Show more', placeholder: 'Show label' },
          hideLabel: { type: 'string', default: 'Show less', placeholder: 'Hide label' },
        }}
        render={(props) => (
          <Spoiler
            maxHeight={Number(props.maxHeight) || 80}
            showLabel={String(props.showLabel ?? 'Show more')}
            hideLabel={String(props.hideLabel ?? 'Show less')}
          >
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{LONG_TEXT}</p>
          </Spoiler>
        )}
      />

      <ComponentPreview
        title="Basic"
        description="Truncate long text content."
        code={`<Spoiler maxHeight={80}>
  <p>Long text content here...</p>
</Spoiler>`}
      >
        <Spoiler maxHeight={80}>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{LONG_TEXT}</p>
        </Spoiler>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Labels"
        description="Customize the show/hide button text."
        code={`<Spoiler maxHeight={60} showLabel="Read more ↓" hideLabel="Collapse ↑">
  <p>Content...</p>
</Spoiler>`}
      >
        <Spoiler maxHeight={60} showLabel="Read more ↓" hideLabel="Collapse ↑">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{LONG_TEXT}</p>
        </Spoiler>
      </ComponentPreview>
    </div>
  );
};

export default SpoilerPage;
