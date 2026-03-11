import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { CheckboxCard, CheckboxCardGroup } from '@forgedevstack/bear';

const CheckboxCardPage: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CheckboxCard</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={180} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Checkbox rendered as a selectable card — perfect for multi-selection in grid layouts. Supports icons, descriptions, and group management.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { CheckboxCard, CheckboxCardGroup } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Single Cards"
        description="Click to toggle selection."
        code={`<CheckboxCard label="Option A" description="First option" />`}
      >
        <div className="flex gap-4">
          <CheckboxCard label="Email" description="Get notified by email" />
          <CheckboxCard label="SMS" description="Text message alerts" />
          <CheckboxCard label="Push" description="Mobile notifications" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Group"
        description="Manage multiple selections with CheckboxCardGroup."
        code={`<CheckboxCardGroup value={selected} onChange={setSelected} columns={3}>
  <CheckboxCard value="react" label="React" />
  <CheckboxCard value="vue" label="Vue" />
  <CheckboxCard value="angular" label="Angular" />
</CheckboxCardGroup>`}
      >
        <div>
          <CheckboxCardGroup value={selected} onChange={setSelected} columns={3}>
            <CheckboxCard value="react" label="React" description="Component-based UI" />
            <CheckboxCard value="vue" label="Vue" description="Progressive framework" />
            <CheckboxCard value="angular" label="Angular" description="Full platform" />
            <CheckboxCard value="svelte" label="Svelte" description="Compiled framework" />
            <CheckboxCard value="solid" label="Solid" description="Fine-grained reactivity" />
            <CheckboxCard value="preact" label="Preact" description="Lightweight alternative" />
          </CheckboxCardGroup>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">Selected: {selected.join(', ') || 'none'}</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Three sizes: sm, md, lg."
        code={`<CheckboxCard label="Small" size="sm" />
<CheckboxCard label="Medium" size="md" />
<CheckboxCard label="Large" size="lg" />`}
      >
        <div className="flex gap-4 items-start">
          <CheckboxCard label="Small" description="Compact" size="sm" />
          <CheckboxCard label="Medium" description="Default" size="md" />
          <CheckboxCard label="Large" description="Spacious" size="lg" />
        </div>
      </ComponentPreview>

    </div>
  );
};

export default CheckboxCardPage;
