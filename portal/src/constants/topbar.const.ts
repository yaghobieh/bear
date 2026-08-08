export interface TopbarAlertItem {
  label: string;
  path: string;
  info: string;
  badge?: string;
}

export const NEW_COMPONENT_ALERTS: TopbarAlertItem[] = [
  { label: 'AppShell', path: '/components/app-shell', info: 'Header, navbar, main, aside, footer layout', badge: 'New' },
  { label: 'Banner', path: '/components/banner', info: 'Announcement strip with severity and dismiss', badge: 'New' },
  { label: 'PageHeader', path: '/components/page-header', info: 'Title, description, and actions block', badge: 'New' },
  { label: 'useBreakpoint', path: '/hooks', info: 'Named breakpoint state from BearProvider', badge: 'New' },
  { label: 'Density compact', path: '/components/button', info: 'Button, Input, Chip, Tabs honor density', badge: 'New' },
  { label: 'Template kits', path: '/templates/dashboard', info: 'Dashboard, form, and auth kits', badge: 'New' },
];

export const VERSION_POPUP_FEATURES = [
  'AppShell',
  'Banner',
  'PageHeader',
  'useBreakpoint',
  'Provider density',
  'Template kits',
];

export const VERSION_POPUP_DESCRIPTION =
  'v1.2.8 — AppShell layout primitive, Banner announcement strip, portal pages, and release polish on top of 1.2.7 PageHeader / density / template kits.';
