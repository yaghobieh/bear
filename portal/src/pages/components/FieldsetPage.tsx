import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { CopyImport } from '@/components/CopyImport';
import { LinesOfCode } from '@/components/LinesOfCode';
import { Fieldset, Input, Select } from '@forgedevstack/bear';

const FieldsetPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fieldset</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={65} />
        <CopyImport componentName="Fieldset" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Form grouping with a legend border — semantic fieldset element for logically grouping related form fields. Supports variants, descriptions, and disabled state.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Fieldset } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Live props"
        description="Change legend and variant below to see the Fieldset update in real time."
        code={`<Fieldset legend="Personal Info" variant="default"><Input label="Name" /></Fieldset>`}
        editableProps={{
          legend: { type: 'string', default: 'Personal Info', placeholder: 'Legend text' },
          variant: {
            type: 'select',
            default: 'default',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'filled', label: 'Filled' },
              { value: 'unstyled', label: 'Unstyled' },
            ],
          },
        }}
        render={(props) => (
          <Fieldset
            legend={String(props.legend ?? 'Personal Info')}
            variant={props.variant as 'default' | 'filled' | 'unstyled'}
          >
            <Input label="Name" placeholder="Enter name" />
          </Fieldset>
        )}
      />

      <ComponentPreview
        title="Basic"
        description="Group form fields under a legend."
        code={`<Fieldset legend="Personal Info">
  <Input label="Name" placeholder="Enter name" />
  <Input label="Email" placeholder="Enter email" />
</Fieldset>`}
      >
        <Fieldset legend="Personal Information">
          <div className="flex flex-col gap-4">
            <Input label="Full Name" placeholder="John Doe" />
            <Input label="Email" placeholder="john@example.com" />
          </div>
        </Fieldset>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="default (border), filled (background), unstyled."
        code={`<Fieldset legend="Settings" variant="filled">
  <Input label="API Key" />
</Fieldset>`}
      >
        <div className="flex flex-col gap-4">
          <Fieldset legend="Default Variant" variant="default">
            <Input placeholder="Standard bordered fieldset" />
          </Fieldset>
          <Fieldset legend="Filled Variant" variant="filled">
            <Input placeholder="Background filled fieldset" />
          </Fieldset>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disables all fields inside the fieldset."
        code={`<Fieldset legend="Locked" disabled>
  <Input label="Name" value="John" />
</Fieldset>`}
      >
        <Fieldset legend="Account (Locked)" disabled description="Contact admin to unlock.">
          <div className="flex flex-col gap-4">
            <Input label="Username" value="johndoe" />
            <Input label="Role" value="Admin" />
          </div>
        </Fieldset>
      </ComponentPreview>

    </div>
  );
};

export default FieldsetPage;
