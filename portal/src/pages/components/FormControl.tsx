import { FC } from 'react';
import { FormControl, Input, BearIcons } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';

const PROPS = [
  { name: 'label', type: 'ReactNode', description: 'Label text above the control' },
  { name: 'helperText', type: 'ReactNode', description: 'Helper or error text below the control' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Error state — styles helper text and propagates to children' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the field group' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows required mark on label' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch to container width' },
  { name: 'id', type: 'string', description: 'DOM id — auto-generated as Bear_form_control_* when omitted' },
  { name: 'testId', type: 'string', description: 'data-testid for testing' },
  { name: 'children', type: 'ReactNode', description: 'Input, Select, or other form control' },
  { name: 'className', type: 'string', description: 'Additional CSS classes' },
];

const FormControlPage: FC = () => (
  <DocPage
    title="FormControl"
    badge="New"
    icon={<BearIcons.FormControlIcon size={22} className="text-pink-500" />}
    description="Provides context such as filled/focused/error/required/disabled for form controls. Child inputs read state via useFormControl()."
    componentName="FormControl, Input"
  >
    <ComponentPreview
      title="Preview"
      description="Wrap any input to share label, helper, and validation state."
      code={`<FormControl label="Email" helperText="We never share your email" required>
  <Input placeholder="you@example.com" />
</FormControl>`}
      render={() => (
        <div className="w-full max-w-sm">
          <FormControl label="Email" helperText="We never share your email" required>
            <Input placeholder="you@example.com" />
          </FormControl>
        </div>
      )}
    />

    <ComponentPreview
      title="Error"
      code={`<FormControl label="Password" error helperText="Password is required">
  <Input type="password" />
</FormControl>`}
      render={() => (
        <div className="w-full max-w-sm">
          <FormControl label="Password" error helperText="Password is required">
            <Input type="password" />
          </FormControl>
        </div>
      )}
    />

    <PropsTable title="API Reference" rows={PROPS} />
  </DocPage>
);

export default FormControlPage;
