import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { CopyImport } from '@/components/CopyImport';
import { LinesOfCode } from '@/components/LinesOfCode';
import { Indicator, Avatar, Button } from '@forgedevstack/bear';

const IndicatorPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Indicator</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={110} />
        <CopyImport componentName="Indicator" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Small colored dot or badge positioned on any element. Use for online status, notification counts, or attention indicators. Supports 9 positions, pulsing animation, and custom labels.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Indicator } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Live props"
        description="Change position, label, and processing below to see the Indicator update in real time."
        code={`<Indicator position="top-end" label="3" processing={false}><Avatar initials="JD" /></Indicator>`}
        editableProps={{
          position: {
            type: 'select',
            default: 'top-end',
            options: [
              { value: 'top-start', label: 'Top start' },
              { value: 'top-end', label: 'Top end' },
              { value: 'bottom-start', label: 'Bottom start' },
              { value: 'bottom-end', label: 'Bottom end' },
              { value: 'middle-start', label: 'Middle start' },
              { value: 'middle-end', label: 'Middle end' },
            ],
          },
          label: { type: 'string', default: '3', placeholder: 'Label (e.g. count)' },
          processing: { type: 'boolean', default: false },
        }}
        render={(props) => (
          <Indicator
            position={props.position as 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'middle-start' | 'middle-end'}
            label={String(props.label || '').trim() || undefined}
            processing={props.processing === true}
          >
            <Avatar initials="JD" />
          </Indicator>
        )}
      />

      <ComponentPreview
        title="Basic"
        description="Small dot on an avatar."
        code={`<Indicator>
  <Avatar initials="JD" />
</Indicator>`}
      >
        <div className="flex gap-8 items-center">
          <Indicator>
            <Avatar initials="JD" />
          </Indicator>
          <Indicator color="#22c55e">
            <Avatar initials="JA" />
          </Indicator>
          <Indicator color="#f59e0b" processing>
            <Avatar initials="BO" />
          </Indicator>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Show a count or text inside the indicator."
        code={`<Indicator label="3" color="#ef4444" size={18}>
  <Button>Inbox</Button>
</Indicator>`}
      >
        <div className="flex gap-8 items-center">
          <Indicator label="3" color="#ef4444" size={18}>
            <Button variant="outline">Inbox</Button>
          </Indicator>
          <Indicator label="99+" color="#8b5cf6" size={22}>
            <Button variant="outline">Notifications</Button>
          </Indicator>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Positions"
        description="Place the indicator at different corners."
        code={`<Indicator position="bottom-end" color="#3b82f6">
  <Avatar initials="AL" />
</Indicator>`}
      >
        <div className="flex gap-8 items-center">
          <Indicator position="top-start" color="#ec4899">
            <Avatar initials="A" />
          </Indicator>
          <Indicator position="top-end" color="#22c55e">
            <Avatar initials="B" />
          </Indicator>
          <Indicator position="bottom-start" color="#f59e0b">
            <Avatar initials="C" />
          </Indicator>
          <Indicator position="bottom-end" color="#3b82f6">
            <Avatar initials="D" />
          </Indicator>
        </div>
      </ComponentPreview>

    </div>
  );
};

export default IndicatorPage;
