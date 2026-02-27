import { FC, useState } from 'react';
import {
  Typography,
  Card,
  CardBody,
  CodeBlock,
  FormField,
  BearIcons,
} from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';

const FormFieldPage: FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="fade-in">
      <Typography variant="h3" className="mb-4 font-bold text-gray-900 dark:text-white">
        FormField
      </Typography>
      <Typography variant="body1" className="mb-8 text-gray-600 dark:text-gray-400">
        MUI TextField-style input with floating label. Supports sizes, variants, addons, and validation states.
      </Typography>

      <section className="mb-8">
        <Typography variant="h5" className="mb-4 font-semibold">Import</Typography>
        <CodeBlock code="import { FormField } from '@forgedevstack/bear';" language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic with floating label"
        description="Label floats up on focus or when value is present."
        code={`<FormField label="Email" placeholder="you@example.com" />`}
      >
        <div className="max-w-xs mx-auto">
          <FormField label="Email" placeholder="you@example.com" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With value (label floated up)"
        description="Label stays floated when field has a value."
        code={`<FormField label="Name" value={value} onChange={(e) => setValue(e.target.value)} />`}
      >
        <div className="max-w-xs mx-auto">
          <FormField label="Name" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Your name" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes (sm, md, lg)"
        description="Different field heights."
        code={`<FormField size="sm" label="Small" />
<FormField size="md" label="Medium" />
<FormField size="lg" label="Large" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <FormField size="sm" label="Small" placeholder="Small" />
          <FormField size="md" label="Medium" placeholder="Medium" />
          <FormField size="lg" label="Large" placeholder="Large" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants (outlined, filled, standard)"
        description="Outlined has full border with floating notch, filled has container background, standard has bottom line only."
        code={`<FormField variant="outlined" label="Outlined" />
<FormField variant="filled" label="Filled" />
<FormField variant="standard" label="Standard" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <FormField variant="outlined" label="Outlined" placeholder="Outlined" />
          <FormField variant="filled" label="Filled" placeholder="Filled" />
          <FormField variant="standard" label="Standard" placeholder="Standard" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With error and success"
        description="Error and success states with messages."
        code={`<FormField label="Email" error="Invalid email address" />
<FormField label="Username" success="Username available" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <FormField label="Email" error="Invalid email address" placeholder="email" />
          <FormField label="Username" success="Username available" placeholder="user" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With left/right addons"
        description="Icons or content inside the field."
        code={`<FormField leftAddon={<BearIcons.SearchIcon size={18} />} label="Search" />
<FormField rightAddon={<BearIcons.CalendarIcon size={18} />} label="Date" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <FormField leftAddon={<BearIcons.SearchIcon size={18} />} label="Search" placeholder="Search..." />
          <FormField rightAddon={<BearIcons.CalendarIcon size={18} />} label="Date" placeholder="Select date" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Required field"
        description="Shows asterisk in label."
        code={`<FormField label="Password" required placeholder="••••••" />`}
      >
        <div className="max-w-xs mx-auto">
          <FormField label="Password" required placeholder="••••••" type="password" />
        </div>
      </ComponentPreview>

      <Card variant="outlined" className="mt-8">
        <CardBody>
          <Typography variant="h5" className="mb-4 font-semibold">Props</Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 font-medium">Prop</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td>string</td><td>-</td><td>Floating label text</td></tr>
                <tr><td className="px-4 py-3 font-mono text-bear-600">helperText</td><td>string</td><td>-</td><td>Helper text below field</td></tr>
                <tr><td className="px-4 py-3 font-mono text-bear-600">error</td><td>string</td><td>-</td><td>Error message (red border)</td></tr>
                <tr><td className="px-4 py-3 font-mono text-bear-600">success</td><td>string</td><td>-</td><td>Success message (green border)</td></tr>
                <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td>sm \| md \| lg</td><td>md</td><td>Field size</td></tr>
                <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td>outlined \| filled \| standard</td><td>outlined</td><td>Visual variant</td></tr>
                <tr><td className="px-4 py-3 font-mono text-bear-600">leftAddon</td><td>ReactNode</td><td>-</td><td>Left icon/addon</td></tr>
                <tr><td className="px-4 py-3 font-mono text-bear-600">rightAddon</td><td>ReactNode</td><td>-</td><td>Right icon/addon</td></tr>
                <tr><td className="px-4 py-3 font-mono text-bear-600">required</td><td>boolean</td><td>false</td><td>Shows asterisk in label</td></tr>
                <tr><td className="px-4 py-3 font-mono text-bear-600">fullWidth</td><td>boolean</td><td>false</td><td>Full width mode</td></tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <section className="mt-8">
        <Typography variant="h5" className="mb-4 font-semibold">Theme via BearProvider</Typography>
        <CodeBlock
          language="tsx"
          showLineNumbers={false}
          code={`<BearProvider
  components={{
    FormField: {
      root: { maxWidth: 360 },
      input: { borderColor: '#ec4899', fontSize: '15px' },
      label: { color: '#ec4899' },
      helper: { fontSize: '12px' },
      outlined: { borderColor: '#f472b6' },
      filled: { backgroundColor: 'rgba(244,114,182,0.08)' },
      standard: { borderBottomColor: '#f472b6' },
    },
  }}
>
  <FormField label="Email" variant="outlined" />
</BearProvider>`}
        />
      </section>
    </div>
  );
};

export default FormFieldPage;
