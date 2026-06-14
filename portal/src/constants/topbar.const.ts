export interface TopbarAlertItem {
  label: string;
  path: string;
  info: string;
  badge?: string;
}

export const NEW_COMPONENT_ALERTS: TopbarAlertItem[] = [
  { label: 'ToggleButton', path: '/components/toggle-button', info: 'Exclusive & multi-select toggles', badge: 'New' },
  { label: 'FormControl', path: '/components/form-control', info: 'Label, error, helper propagation', badge: 'New' },
  { label: 'Snackbar', path: '/components/snackbar', info: 'Portal-based anchored messages', badge: 'New' },
  { label: 'CssBaseline', path: '/theming', info: 'Global box-sizing & body reset', badge: 'New' },
  { label: 'Skeleton variants', path: '/components/skeleton', info: 'Table, Form, Card skeletons', badge: 'New' },
  { label: 'Bear Skills', path: '/skills', info: 'Cursor AI skills for Bear development', badge: 'New' },
];

export const VERSION_POPUP_FEATURES = [
  'ToggleButton',
  'FormControl',
  'Snackbar',
  'Bear IDs',
  'RTL',
  'Density',
  'CssBaseline',
  'Skeletons',
];

export const VERSION_POPUP_DESCRIPTION =
  'v1.2.4 — ToggleButton, FormControl, Snackbar, Bear IDs, provider RTL/density, and Cursor skills for AI-assisted development.';
