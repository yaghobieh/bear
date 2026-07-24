export interface TopbarAlertItem {
  label: string;
  path: string;
  info: string;
  badge?: string;
}

export const NEW_COMPONENT_ALERTS: TopbarAlertItem[] = [
  { label: 'AppBar dense', path: '/components/app-bar', info: 'dense, disableGutters, enableColorOnDark', badge: 'New' },
  { label: 'Backdrop', path: '/components/backdrop', info: 'Scrim overlay for modals and loaders', badge: 'New' },
  { label: 'ChipGroup', path: '/components/chip-group', info: 'Grouped chips with overflow count', badge: 'New' },
  { label: 'Select native', path: '/components/select', info: 'native, displayEmpty, renderValue', badge: 'New' },
  { label: 'MessageList', path: '/components/message-list', info: 'Virtualized long conversations', badge: 'New' },
  { label: 'Toast a11y', path: '/components/toast', info: 'aria-live polite/assertive regions', badge: 'New' },
  { label: 'RTL wiring', path: '/theming', info: 'Provider direction in layout/forms', badge: 'New' },
];

export const VERSION_POPUP_FEATURES = [
  'AppBar dense / gutters',
  'Backdrop',
  'ChipGroup',
  'Select native',
  'MessageList virtualization',
  'Toast aria-live',
  'RTL layout',
  'Progress buffer',
  'ListItem secondaryAction',
];

export const VERSION_POPUP_DESCRIPTION =
  'v1.2.6 — AppBar dense/gutters, Backdrop, ChipGroup, Select native/renderValue, MessageList virtualization, Toast a11y, RTL wiring, and theme fixes.';
