import { FC, useState } from 'react';
import { Flex, Checkbox } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';

const CHECKBOX_PROPS = [
  { name: 'checked', type: 'boolean', description: 'Controlled checked state' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial checked state' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Partial selection state' },
  { name: 'indicator', type: "'check' | 'x' | 'minus'", default: 'check', description: 'Icon style when checked' },
  { name: 'label', type: 'ReactNode', description: 'Label text' },
  { name: 'size', type: 'BearSize', default: 'md', description: 'Checkbox size' },
  { name: 'variant', type: 'BearVariant', default: 'primary', description: 'Theme color variant' },
  { name: 'color', type: 'string', description: 'Custom accent color override' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Error state styling' },
  { name: 'helperText', type: 'string', description: 'Helper text below the control' },
  { name: 'onChange', type: '(event) => void', description: 'Native change handler' },
  { name: 'id', type: 'string', description: 'Bear_checkbox_* when omitted' },
  { name: 'testId', type: 'string', description: 'data-testid on the input' },
];

const CheckboxPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [items, setItems] = useState([true, false, true]);

  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean) && !allChecked;

  return (
    <DocPage title="Checkbox" description={t.checkboxDesc} componentName="Checkbox">
      <ComponentPreview
        title={t.basic}
        description="Simple checkbox with label."
        code={`<Checkbox label="Accept terms" />
<Checkbox label="Subscribe to newsletter" defaultChecked />`}
      >
        <Flex direction="column" gap={3} align="start" className="mx-auto max-w-xs">
          <Checkbox label="Accept terms and conditions" checked={checked1} onChange={(e) => setChecked1(e.target.checked)} />
          <Checkbox label="Subscribe to newsletter" checked={checked2} onChange={(e) => setChecked2(e.target.checked)} />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title="Indeterminate"
        description="Parent checkbox with partially selected children."
        code={`<Checkbox label="Select all" indeterminate={someChecked} checked={allChecked} />`}
      >
        <Flex direction="column" gap={3} align="start" className="mx-auto max-w-xs">
          <Checkbox
            label="Select all items"
            indeterminate={someChecked}
            checked={allChecked}
            onChange={() => {
              if (allChecked || someChecked) {
                setItems([false, false, false]);
              } else {
                setItems([true, true, true]);
              }
            }}
          />
          <Flex direction="column" gap={2} className="ml-6">
            {['Item 1', 'Item 2', 'Item 3'].map((label, i) => (
              <Checkbox
                key={label}
                label={label}
                checked={items[i]}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[i] = e.target.checked;
                  setItems(newItems);
                }}
              />
            ))}
          </Flex>
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.sizes}
        description="Different checkbox sizes."
        code={`<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />`}
      >
        <Flex direction="column" gap={3} align="start" className="mx-auto max-w-xs">
          <Checkbox size="sm" label="Small checkbox" defaultChecked />
          <Checkbox size="md" label="Medium checkbox" defaultChecked />
          <Checkbox size="lg" label="Large checkbox" defaultChecked />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.disabled}
        description="Disabled checkbox states."
        code={`<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled checked />`}
      >
        <Flex direction="column" gap={3} align="start" className="mx-auto max-w-xs">
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Disabled checked" disabled defaultChecked />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.indicatorStyles}
        description="Use check, x, or minus instead of the default checkmark."
        code={`<Checkbox label="Check" indicator="check" defaultChecked />
<Checkbox label="X mark" indicator="x" defaultChecked />
<Checkbox label="Minus" indicator="minus" defaultChecked />`}
      >
        <Flex direction="column" gap={3} align="start" className="mx-auto max-w-xs">
          <Checkbox label="Check style" indicator="check" defaultChecked />
          <Checkbox label="X style" indicator="x" defaultChecked />
          <Checkbox label="Minus style" indicator="minus" defaultChecked />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Custom checkbox colors."
        code={`<Checkbox color="primary" label="Primary" />
<Checkbox color="success" label="Success" />
<Checkbox color="danger" label="Danger" />`}
      >
        <Flex direction="column" gap={3} align="start" className="mx-auto max-w-xs">
          <Checkbox color="primary" label="Primary" defaultChecked />
          <Checkbox color="success" label="Success" defaultChecked />
          <Checkbox color="danger" label="Danger" defaultChecked />
        </Flex>
      </ComponentPreview>

      <PropsTable title={t.props} rows={CHECKBOX_PROPS} />
    </DocPage>
  );
};

export default CheckboxPage;
