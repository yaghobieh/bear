export interface TopbarAlertItem {
  label: string;
  path: string;
  info: string;
  badge?: string;
}

export const NEW_COMPONENT_ALERTS: TopbarAlertItem[] = [
  { label: 'PageHeader', path: '/components/page-header', info: 'Title, description, and actions block', badge: 'New' },
  { label: 'useBreakpoint', path: '/hooks', info: 'Named breakpoint state from BearProvider', badge: 'New' },
  { label: 'Density compact', path: '/components/button', info: 'Button, Input, Chip, Tabs honor density', badge: 'New' },
  { label: 'ChipGroup overflow', path: '/components/chip-group', info: 'Size presets, overflow menu, delete-all', badge: 'New' },
  { label: 'Backdrop transitions', path: '/components/backdrop', info: 'transitionDuration + Modal/Drawer compose', badge: 'New' },
  { label: 'Toast live regions', path: '/components/toast', info: 'Shared aria-live utilities with Snackbar', badge: 'New' },
  { label: 'Template kits', path: '/templates/dashboard', info: 'Dashboard, form, and auth kits', badge: 'New' },
];

export const VERSION_POPUP_FEATURES = [
  'PageHeader',
  'useBreakpoint',
  'Bear-* DOM ids',
  'Provider density',
  'MessageList overscan',
  'Select FormControl',
  'Backdrop transitions',
  'ChipGroup overflow',
  'Template kits',
];

export const VERSION_POPUP_DESCRIPTION =
  'v1.2.7 — PageHeader, useBreakpoint, hyphen PascalCase Bear DOM ids, provider density, MessageList overscan, Select FormControl parity, Backdrop transitions, ChipGroup overflow, Autocomplete light overlays, and portal template kits.';
