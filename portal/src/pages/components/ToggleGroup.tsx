import { FC, useState } from 'react';
import { ToggleGroup, ToggleGroupItem, Typography, BearIcons } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';

const GROUP_PROPS = [
  { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Determines whether a single or multiple items can be selected.' },
  { name: 'value', type: 'string | string[]', description: 'The controlled value of the selected item(s).' },
  { name: 'defaultValue', type: 'string | string[]', description: 'The initial uncontrolled value.' },
  { name: 'onChange / onValueChange', type: '(value: any) => void', description: 'Callback fired when the selection changes.' },
  { name: 'variant', type: "'subtle' | 'outline' | 'filled'", default: "'subtle'", description: 'Visual style variant of the toggle group.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of items in the group.' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientation of the group.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'When true, prevents user interaction across all items.' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches the group across the container.' },
  { name: 'className', type: 'string', description: 'Custom CSS class name.' },
];

const ITEM_PROPS = [
  { name: 'value', type: 'string', description: 'Unique value for this toggle item.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables this specific toggle item.' },
  { name: 'ariaLabel', type: 'string', description: 'Accessibility label (strongly recommended for icon-only items).' },
  { name: 'className', type: 'string', description: 'Custom CSS class name.' },
  { name: 'children', type: 'ReactNode', description: 'Content rendered inside the toggle item.' },
];

const ToggleGroupPage: FC = () => {
  const [alignment, setAlignment] = useState<string>('center');
  const [formatting, setFormatting] = useState<string[]>(['bold', 'italic']);
  const [viewMode, setViewMode] = useState<string>('list');

  return (
    <DocPage
      title="ToggleGroup"
      badge="New in 1.3.4"
      icon={<BearIcons.ToggleButtonIcon size={22} className="text-pink-500" />}
      description="A set of two-state buttons that can be toggled on or off, supporting single selection (radio-like) or multiple selection (checkbox-like) with full WAI-ARIA roving focus keyboard navigation."
      componentName="ToggleGroup, ToggleGroupItem"
    >
      <ComponentPreview
        title="Single Selection (Alignment)"
        description="ToggleGroup with type='single' acts like a segmented control. Use ArrowLeft and ArrowRight to navigate."
        code={`import { ToggleGroup, ToggleGroupItem, BearIcons } from '@forgedevstack/bear';

const [alignment, setAlignment] = useState('center');

<ToggleGroup
  type="single"
  value={alignment}
  onValueChange={(val) => val && setAlignment(val)}
  aria-label="Text alignment"
>
  <ToggleGroupItem value="left" ariaLabel="Left aligned">
    <BearIcons.ArrowLeftIcon size={16} />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" ariaLabel="Center aligned">
    Center
  </ToggleGroupItem>
  <ToggleGroupItem value="right" ariaLabel="Right aligned">
    <BearIcons.ArrowRightIcon size={16} />
  </ToggleGroupItem>
</ToggleGroup>`}
        render={() => (
          <div className="flex flex-col items-center gap-4 w-full max-w-full overflow-x-auto py-1">
            <ToggleGroup
              type="single"
              value={alignment}
              onValueChange={(val: string) => val && setAlignment(val)}
              aria-label="Text alignment"
            >
              <ToggleGroupItem value="left" ariaLabel="Left aligned">
                <span className="flex items-center gap-1.5 px-1 sm:px-2">
                  <BearIcons.ArrowLeftIcon size={16} />
                  <Typography variant="body2" component="span">Left</Typography>
                </span>
              </ToggleGroupItem>
              <ToggleGroupItem value="center" ariaLabel="Center aligned">
                <Typography variant="body2" component="span" className="px-1 sm:px-2 font-medium">Center</Typography>
              </ToggleGroupItem>
              <ToggleGroupItem value="right" ariaLabel="Right aligned">
                <span className="flex items-center gap-1.5 px-1 sm:px-2">
                  <Typography variant="body2" component="span">Right</Typography>
                  <BearIcons.ArrowRightIcon size={16} />
                </span>
              </ToggleGroupItem>
            </ToggleGroup>
            <Typography variant="caption" className="text-gray-500">
              Selected alignment: <strong>{alignment}</strong>
            </Typography>
          </div>
        )}
      />

      <ComponentPreview
        title="Multiple Selection (Toolbar Formatting)"
        description="ToggleGroup with type='multiple' allows selecting zero, one, or more items simultaneously."
        code={`<ToggleGroup
  type="multiple"
  value={formatting}
  onValueChange={setFormatting}
  variant="outline"
  aria-label="Text formatting"
>
  <ToggleGroupItem value="bold" ariaLabel="Bold">
    <strong>B</strong>
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" ariaLabel="Italic">
    <em>I</em>
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" ariaLabel="Underline">
    <u>U</u>
  </ToggleGroupItem>
</ToggleGroup>`}
        render={() => (
          <div className="flex flex-col items-center gap-4 w-full max-w-full overflow-x-auto py-1">
            <ToggleGroup
              type="multiple"
              value={formatting}
              onValueChange={(val: string[]) => setFormatting(val)}
              variant="outline"
              aria-label="Text formatting"
            >
              <ToggleGroupItem value="bold" ariaLabel="Bold">
                <span className="px-2 font-bold font-mono">B</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" ariaLabel="Italic">
                <span className="px-2 italic font-mono">I</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" ariaLabel="Underline">
                <span className="px-2 underline font-mono">U</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <Typography variant="caption" className="text-gray-500">
              Active formatting: [{formatting.join(', ')}]
            </Typography>
          </div>
        )}
      />

      <ComponentPreview
        title="Sizes (sm, md, lg)"
        description="Choose between sm, md, and lg sizes to fit compact toolbars or prominent callouts."
        code={`<ToggleGroup size="sm" defaultValue="grid">
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup size="md" defaultValue="grid">
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup size="lg" defaultValue="grid">
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>`}
        render={() => (
          <div className="flex flex-col items-center gap-4 w-full max-w-full overflow-x-auto py-1">
            <ToggleGroup size="sm" defaultValue="grid">
              <ToggleGroupItem value="list"><span className="px-1.5 sm:px-2 text-xs">Small List</span></ToggleGroupItem>
              <ToggleGroupItem value="grid"><span className="px-1.5 sm:px-2 text-xs">Small Grid</span></ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup size="md" defaultValue="grid">
              <ToggleGroupItem value="list"><span className="px-2 sm:px-3 text-sm">Medium List</span></ToggleGroupItem>
              <ToggleGroupItem value="grid"><span className="px-2 sm:px-3 text-sm">Medium Grid</span></ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup size="lg" defaultValue="grid">
              <ToggleGroupItem value="list"><span className="px-2 sm:px-4 text-sm sm:text-base">Large List</span></ToggleGroupItem>
              <ToggleGroupItem value="grid"><span className="px-2 sm:px-4 text-sm sm:text-base">Large Grid</span></ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      />

      <ComponentPreview
        title="Vertical Orientation"
        description="Set orientation='vertical' for sidebars, inspector panels, and vertical toolbars with ArrowUp and ArrowDown navigation."
        code={`<ToggleGroup orientation="vertical" type="single" defaultValue="1">
  <ToggleGroupItem value="1">Option 1</ToggleGroupItem>
  <ToggleGroupItem value="2">Option 2</ToggleGroupItem>
  <ToggleGroupItem value="3">Option 3</ToggleGroupItem>
</ToggleGroup>`}
        render={() => (
          <div className="flex justify-center">
            <ToggleGroup
              orientation="vertical"
              type="single"
              value={viewMode}
              onValueChange={(v: string) => v && setViewMode(v)}
              aria-label="View mode"
            >
              <ToggleGroupItem value="list">
                <span className="px-4 py-1 text-sm">List View</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="compact">
                <span className="px-4 py-1 text-sm">Compact View</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="grid">
                <span className="px-4 py-1 text-sm">Grid View</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      />

      <div className="mt-12">
        <PropsTable title="ToggleGroup Props" rows={GROUP_PROPS} />
      </div>

      <div className="mt-10">
        <PropsTable title="ToggleGroupItem Props" rows={ITEM_PROPS} />
      </div>
    </DocPage>
  );
};

export default ToggleGroupPage;
