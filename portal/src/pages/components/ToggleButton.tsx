import { FC, useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Typography, BearIcons } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';

const TOGGLE_PROPS = [
  { name: 'value', type: 'string', description: 'Value identifier within the group' },
  { name: 'selected', type: 'boolean', description: 'Controlled selected state (standalone use)' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Button size' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Grow to fill group width' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable this button' },
  { name: 'id', type: 'string', description: 'DOM id — Bear_toggle_button_* when omitted' },
  { name: 'testId', type: 'string', description: 'data-testid' },
  { name: 'children', type: 'ReactNode', description: 'Button label' },
  { name: 'onClick', type: 'MouseEventHandler', description: 'Click handler' },
];

const GROUP_PROPS = [
  { name: 'value', type: 'string | string[]', description: 'Controlled selected value(s)' },
  { name: 'defaultValue', type: 'string | string[]', description: 'Uncontrolled initial value(s)' },
  { name: 'onChange', type: '(value: string | string[]) => void', description: 'Selection change callback' },
  { name: 'exclusive', type: 'boolean', default: 'true', description: 'Single selection when true' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size for all buttons' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch group to container' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable entire group' },
  { name: 'id', type: 'string', description: 'DOM id' },
  { name: 'testId', type: 'string', description: 'data-testid' },
];

const ToggleLabel: FC<{ children: string }> = ({ children }) => (
  <Typography variant="body2" component="span">
    {children}
  </Typography>
);

const ToggleButtonPage: FC = () => {
  const [align, setAlign] = useState('left');
  const [formats, setFormats] = useState<string[]>(['bold']);

  return (
    <DocPage
      title="ToggleButton"
      badge="New"
      icon={<BearIcons.ToggleButtonIcon size={22} className="text-pink-500" />}
      description="A two-state button that can be on or off. Compose with ToggleButtonGroup for exclusive or multi-select patterns."
      componentName="ToggleButton, ToggleButtonGroup"
    >
      <ComponentPreview
        title="Preview"
        description="Click to toggle selection. Uses Typography labels and theme tokens in light and dark mode."
        code={`<ToggleButtonGroup value={value} onChange={setValue} exclusive>
  <ToggleButton value="left"><Typography variant="body2">Left</Typography></ToggleButton>
  <ToggleButton value="center"><Typography variant="body2">Center</Typography></ToggleButton>
  <ToggleButton value="right"><Typography variant="body2">Right</Typography></ToggleButton>
</ToggleButtonGroup>`}
        render={() => (
          <ToggleButtonGroup value={align} onChange={(v) => setAlign(v as string)} exclusive>
            <ToggleButton value="left"><ToggleLabel>Left</ToggleLabel></ToggleButton>
            <ToggleButton value="center"><ToggleLabel>Center</ToggleLabel></ToggleButton>
            <ToggleButton value="right"><ToggleLabel>Right</ToggleLabel></ToggleButton>
          </ToggleButtonGroup>
        )}
      />

      <ComponentPreview
        title="Multi-select"
        code={`<ToggleButtonGroup value={formats} onChange={setFormats} exclusive={false}>
  <ToggleButton value="bold"><Typography variant="body2">Bold</Typography></ToggleButton>
  <ToggleButton value="italic"><Typography variant="body2">Italic</Typography></ToggleButton>
  <ToggleButton value="underline"><Typography variant="body2">Underline</Typography></ToggleButton>
</ToggleButtonGroup>`}
        render={() => (
          <ToggleButtonGroup value={formats} onChange={(v) => setFormats(v as string[])} exclusive={false}>
            <ToggleButton value="bold"><ToggleLabel>Bold</ToggleLabel></ToggleButton>
            <ToggleButton value="italic"><ToggleLabel>Italic</ToggleLabel></ToggleButton>
            <ToggleButton value="underline"><ToggleLabel>Underline</ToggleLabel></ToggleButton>
          </ToggleButtonGroup>
        )}
      />

      <PropsTable title="API Reference" rows={TOGGLE_PROPS} />
      <PropsTable title="ToggleButtonGroup" rows={GROUP_PROPS} />
    </DocPage>
  );
};

export default ToggleButtonPage;
