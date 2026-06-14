import type { PropRow } from '@/components/PropsTable';

export const SWITCH_THEME_ICON_SIZE_PX = 16;

export const SWITCH_PROPS: PropRow[] = [
  { name: 'checked', type: 'boolean', description: 'Controlled checked state' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial checked state' },
  { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Called when toggled' },
  { name: 'label', type: 'string', description: 'Label text beside or below the track' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Track and thumb size' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', description: 'Label placement relative to track' },
  { name: 'checkedIcon', type: 'ReactNode', description: 'Icon shown when checked' },
  { name: 'uncheckedIcon', type: 'ReactNode', description: 'Icon shown when unchecked' },
  { name: 'showIconsInThumb', type: 'boolean', default: 'false', description: 'Render icons inside the thumb' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
  { name: 'className', type: 'string', description: 'Additional root classes' },
  { name: 'testId', type: 'string', description: 'data-testid on the label' },
];

export const SWITCH_GROUP_PROPS: PropRow[] = [
  { name: 'value', type: 'string', description: 'Currently selected option value' },
  { name: 'options', type: 'SwitchGroupOption[]', description: 'Segment options with value, label, and optional disabled' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when selection changes' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', description: 'Layout direction' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the whole group' },
  { name: 'aria-label', type: 'string', default: 'Switch group', description: 'Accessible name for radiogroup' },
  { name: 'className', type: 'string', description: 'Additional root classes' },
  { name: 'testId', type: 'string', description: 'data-testid on the group' },
];

export const SWITCH_PLAN_OPTIONS = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
] as const;

export const SWITCH_VIEW_OPTIONS = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'board', label: 'Board' },
] as const;

export const CODE_SWITCH_THEME = `import { Switch, BearIcons } from '@forgedevstack/bear';

<Switch
  label="Theme"
  checkedIcon={<BearIcons.MoonIcon size={${SWITCH_THEME_ICON_SIZE_PX}} />}
  uncheckedIcon={<BearIcons.SunIcon size={${SWITCH_THEME_ICON_SIZE_PX}} />}
/>`;
