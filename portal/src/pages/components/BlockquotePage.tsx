import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { CopyImport } from '@/components/CopyImport';
import { LinesOfCode } from '@/components/LinesOfCode';
import { Blockquote } from '@forgedevstack/bear';

const BlockquotePage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blockquote</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={70} />
        <CopyImport componentName="Blockquote" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Styled quotation block with a colored left border, optional icon, and citation. Five color variants for different contexts.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Blockquote } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Live props"
        description="Change color and citation below to see the Blockquote update in real time."
        code={`<Blockquote color="primary" cite="— Author">Quote text.</Blockquote>`}
        editableProps={{
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
          cite: { type: 'string', default: '— Albert Einstein', placeholder: 'Citation' },
          quote: { type: 'string', default: 'Imagination is more important than knowledge.', placeholder: 'Quote text' },
        }}
        render={(props) => (
          <Blockquote
            color={props.color as 'primary' | 'success' | 'warning' | 'error'}
            cite={String(props.cite ?? '')}
          >
            {String(props.quote ?? '')}
          </Blockquote>
        )}
      />

      <ComponentPreview
        title="Basic"
        description="Default blockquote with citation."
        code={`<Blockquote cite="— Albert Einstein">
  Imagination is more important than knowledge.
</Blockquote>`}
      >
        <Blockquote cite="— Albert Einstein">
          Imagination is more important than knowledge.
        </Blockquote>
      </ComponentPreview>

      <ComponentPreview
        title="Color Variants"
        description="Match the blockquote to your context."
        code={`<Blockquote color="success">All tests passed.</Blockquote>
<Blockquote color="error">Build failed.</Blockquote>`}
      >
        <div className="flex flex-col gap-4">
          <Blockquote color="primary" cite="— Documentation">Use the primary variant for tips and highlights.</Blockquote>
          <Blockquote color="success" cite="— CI Pipeline">All 142 tests passed successfully.</Blockquote>
          <Blockquote color="warning" cite="— Deprecation Notice">This API will be removed in v2.0.</Blockquote>
          <Blockquote color="error" cite="— Error Log">Build failed: missing dependency.</Blockquote>
        </div>
      </ComponentPreview>

    </div>
  );
};

export default BlockquotePage;
