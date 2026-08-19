export interface TopbarAlertItem {
  label: string;
  path: string;
  info: string;
  badge?: string;
}

export const NEW_COMPONENT_ALERTS: TopbarAlertItem[] = [
  { label: 'ModalsProvider', path: '/components/modals-provider', info: 'Imperative open and confirm without local modal state', badge: 'New' },
  { label: 'Modal / Drawer', path: '/components/modal', info: 'Dialogs sit above backdrop blur', badge: 'Fix' },
  { label: 'SignPad', path: '/components/sign-pad', info: 'Mouse and touch drawing restored', badge: 'Fix' },
  { label: 'Toast / Snackbar', path: '/components/toast', info: 'Readable surfaces in dark and light', badge: 'Fix' },
];

export const VERSION_POPUP_FEATURES = [
  'ModalsProvider',
  'Modal and Drawer above blur',
  'SignPad drawing',
  'Toast and Snackbar surfaces',
];

export const VERSION_POPUP_DESCRIPTION =
  'v1.3.0 — ModalsProvider, overlay stacking, SignPad capture, Toast/Snackbar contrast.';
