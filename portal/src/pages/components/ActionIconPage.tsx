import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { CopyImport } from '@/components/CopyImport';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ActionIcon } from '@forgedevstack/bear';

const HeartSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const PenSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const TrashSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const ActionIconPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ActionIcon</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={95} />
        <CopyImport componentName="ActionIcon" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Icon-only square button for actions like edit, delete, or toggle. Five variants, five colors, five sizes with loading and disabled states.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { ActionIcon } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Live props"
        description="Change variant, color, size, and disabled below to see the ActionIcon update in real time."
        code={`<ActionIcon variant="filled" color="primary" size="md"><Icon /></ActionIcon>`}
        editableProps={{
          variant: {
            type: 'select',
            default: 'filled',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'filled', label: 'Filled' },
              { value: 'outline', label: 'Outline' },
              { value: 'subtle', label: 'Subtle' },
              { value: 'transparent', label: 'Transparent' },
            ],
          },
          color: {
            type: 'select',
            default: 'primary',
            options: [
              { value: 'primary', label: 'Primary' },
              { value: 'success', label: 'Success' },
              { value: 'warning', label: 'Warning' },
              { value: 'error', label: 'Error' },
            ],
          },
          size: {
            type: 'select',
            default: 'md',
            options: [
              { value: 'xs', label: 'XS' },
              { value: 'sm', label: 'SM' },
              { value: 'md', label: 'MD' },
              { value: 'lg', label: 'LG' },
              { value: 'xl', label: 'XL' },
            ],
          },
          disabled: { type: 'boolean', default: false },
        }}
        render={(props) => (
          <ActionIcon
            variant={props.variant as 'default' | 'filled' | 'outline' | 'subtle' | 'transparent'}
            color={props.color as 'primary' | 'success' | 'warning' | 'error'}
            size={props.size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
            disabled={props.disabled === true}
          >
            <HeartSvg />
          </ActionIcon>
        )}
      />

      <ComponentPreview
        title="Variants"
        description="default, filled, outline, subtle, transparent."
        code={`<ActionIcon variant="filled"><HeartIcon /></ActionIcon>
<ActionIcon variant="outline"><PenIcon /></ActionIcon>`}
      >
        <div className="flex gap-4 items-center">
          <ActionIcon variant="default"><HeartSvg /></ActionIcon>
          <ActionIcon variant="filled"><HeartSvg /></ActionIcon>
          <ActionIcon variant="outline"><PenSvg /></ActionIcon>
          <ActionIcon variant="subtle"><PenSvg /></ActionIcon>
          <ActionIcon variant="transparent"><TrashSvg /></ActionIcon>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Use color for context."
        code={`<ActionIcon color="primary"><Icon /></ActionIcon>
<ActionIcon color="error"><Icon /></ActionIcon>`}
      >
        <div className="flex gap-4 items-center">
          <ActionIcon variant="filled" color="primary"><HeartSvg /></ActionIcon>
          <ActionIcon variant="filled" color="success"><PenSvg /></ActionIcon>
          <ActionIcon variant="filled" color="warning"><PenSvg /></ActionIcon>
          <ActionIcon variant="filled" color="error"><TrashSvg /></ActionIcon>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="xs through xl."
        code={`<ActionIcon size="xs"><Icon /></ActionIcon>
<ActionIcon size="xl"><Icon /></ActionIcon>`}
      >
        <div className="flex gap-4 items-center">
          <ActionIcon size="xs"><HeartSvg /></ActionIcon>
          <ActionIcon size="sm"><HeartSvg /></ActionIcon>
          <ActionIcon size="md"><HeartSvg /></ActionIcon>
          <ActionIcon size="lg"><HeartSvg /></ActionIcon>
          <ActionIcon size="xl"><HeartSvg /></ActionIcon>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Loading & Disabled"
        description="Button states."
        code={`<ActionIcon loading><Icon /></ActionIcon>
<ActionIcon disabled><Icon /></ActionIcon>`}
      >
        <div className="flex gap-4 items-center">
          <ActionIcon loading variant="filled"><HeartSvg /></ActionIcon>
          <ActionIcon disabled variant="filled"><HeartSvg /></ActionIcon>
        </div>
      </ComponentPreview>

    </div>
  );
};

export default ActionIconPage;
