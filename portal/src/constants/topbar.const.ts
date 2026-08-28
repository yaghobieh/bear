export interface TopbarAlertItem {
  label: string;
  path: string;
  info: string;
  badge?: string;
}

export const NEW_COMPONENT_ALERTS: TopbarAlertItem[] = [
  { label: 'Drawer', path: '/components/drawer', info: 'Independent open and close effects, like Select', badge: 'New' },
  { label: 'Icons', path: '/icons', info: 'Install with Bear or as @forgedevstack/bear-icons', badge: 'New' },
  { label: 'Chart', path: '/components/chart', info: 'Radar, funnel, stacked, half pie, and rose views', badge: 'New' },
  { label: 'Select / Dropdown', path: '/components/select', info: 'Pick open and close motion independently', badge: 'New' },
];

export const VERSION_POPUP_FEATURES = [
  'Drawer open and close effects',
  '@forgedevstack/bear-icons',
  'Chart radar, funnel, stacked, cake views',
  'Right-side Drawer stays on the right',
];

export const VERSION_POPUP_DESCRIPTION =
  'Drawer close effects, a standalone icon package, and new chart views.';
