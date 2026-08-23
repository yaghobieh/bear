export interface TopbarAlertItem {
  label: string;
  path: string;
  info: string;
  badge?: string;
}

export const NEW_COMPONENT_ALERTS: TopbarAlertItem[] = [
  { label: 'Select / Dropdown', path: '/components/select', info: 'Pick open and close motion independently', badge: 'New' },
  { label: 'DatePicker', path: '/components/date-picker', info: 'Calendar overlay stays put and animates out', badge: 'New' },
  { label: 'TimePicker', path: '/components/time-picker', info: 'Portaled dropdown with open and close effects', badge: 'New' },
  { label: 'Calendar', path: '/components/calendar', info: 'Controlled open with the same overlay effects', badge: 'New' },
];

export const VERSION_POPUP_FEATURES = [
  'Open and close overlay effects',
  'Select, Dropdown, DatePicker',
  'TimePicker and DateRangePicker',
  'Calendar controlled motion',
];

export const VERSION_POPUP_DESCRIPTION =
  'v1.3.1 — Overlay open and close effects on Select, DatePicker, Calendar, and other dropdowns.';
