import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { RadioCard, RadioCardGroup } from '@forgedevstack/bear';

const RadioCardPage: FC = () => {
  const [plan, setPlan] = useState('pro');

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">RadioCard</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={175} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Radio rendered as a selectable card — only one can be selected per group. Ideal for plan selection, size picking, or any single-choice UI.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { RadioCard, RadioCardGroup } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Plan Selection"
        description="Select a pricing plan."
        code={`<RadioCardGroup value={plan} onChange={setPlan} columns={3}>
  <RadioCard value="free" label="Free" description="$0/mo" />
  <RadioCard value="pro" label="Pro" description="$19/mo" />
  <RadioCard value="enterprise" label="Enterprise" description="Custom" />
</RadioCardGroup>`}
      >
        <div>
          <RadioCardGroup value={plan} onChange={setPlan} columns={3}>
            <RadioCard value="free" label="Free" description="$0/month — 1 project" />
            <RadioCard value="pro" label="Pro" description="$19/month — unlimited" />
            <RadioCard value="enterprise" label="Enterprise" description="Custom pricing" />
          </RadioCardGroup>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">Selected: {plan}</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes & Variants"
        description="Different visual styles."
        code={`<RadioCard value="a" label="Default" variant="default" />
<RadioCard value="b" label="Outline" variant="outline" />
<RadioCard value="c" label="Filled" variant="filled" />`}
      >
        <div className="flex gap-4">
          <RadioCard value="a" label="Default" description="Standard card" variant="default" />
          <RadioCard value="b" label="Outline" description="Dashed border" variant="outline" />
          <RadioCard value="c" label="Filled" description="Filled background" variant="filled" />
        </div>
      </ComponentPreview>

    </div>
  );
};

export default RadioCardPage;
