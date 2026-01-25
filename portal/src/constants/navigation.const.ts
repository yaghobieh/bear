/**
 * Navigation constants for Bear Portal
 */

export interface NavItem {
  path: string;
  label: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const BEAR_VERSION = '1.0.2';

/** Main Bear UI repository */
export const GITHUB_URL = 'https://github.com/yaghobieh/bear';
export const NPM_URL = 'https://www.npmjs.com/package/@forgedevstack/bear';

export const NAVIGATION: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { path: '/', label: 'Introduction' },
      { path: '/installation', label: 'Installation' },
      { path: '/theming', label: 'Theming' },
      { path: '/typescript', label: 'TypeScript' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { path: '/components/container', label: 'Container' },
      { path: '/components/grid', label: 'Grid' },
      { path: '/components/flex', label: 'Flex' },
      { path: '/components/paper', label: 'Paper' },
      { path: '/components/divider', label: 'Divider' },
      { path: '/components/app-bar', label: 'AppBar', badge: 'New' },
      { path: '/components/scroll-area', label: 'ScrollArea', badge: 'New' },
    ],
  },
  {
    title: 'Inputs',
    items: [
      { path: '/components/button', label: 'Button' },
      { path: '/components/button-group', label: 'ButtonGroup' },
      { path: '/components/fab', label: 'Floating Action Button' },
      { path: '/components/input', label: 'Input' },
      { path: '/components/number-input', label: 'NumberInput', badge: 'New' },
      { path: '/components/otp-input', label: 'OTPInput', badge: 'New' },
      { path: '/components/select', label: 'Select' },
      { path: '/components/checkbox', label: 'Checkbox' },
      { path: '/components/radio', label: 'Radio' },
      { path: '/components/switch', label: 'Switch' },
      { path: '/components/slider', label: 'Slider' },
      { path: '/components/rating', label: 'Rating' },
      { path: '/components/calendar', label: 'Calendar', badge: 'New' },
      { path: '/components/date-picker', label: 'DatePicker', badge: 'New' },
      { path: '/components/date-time-picker', label: 'DateTimePicker', badge: 'New' },
      { path: '/components/time-picker', label: 'TimePicker', badge: 'New' },
      { path: '/components/color-picker', label: 'ColorPicker', badge: 'New' },
      { path: '/components/file-upload', label: 'FileUpload', badge: 'New' },
      { path: '/components/autocomplete', label: 'Autocomplete' },
      { path: '/components/multi-select', label: 'MultiSelect' },
      { path: '/components/transfer-list', label: 'Transfer List' },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { path: '/components/typography', label: 'Typography' },
      { path: '/components/avatar', label: 'Avatar' },
      { path: '/components/badge', label: 'Badge' },
      { path: '/components/chip', label: 'Chip', badge: 'New' },
      { path: '/components/card', label: 'Card' },
      { path: '/components/list', label: 'List' },
      { path: '/components/data-table', label: 'DataTable' },
      { path: '/components/tree-view', label: 'TreeView', badge: 'New' },
      { path: '/components/timeline', label: 'Timeline', badge: 'New' },
      { path: '/components/statistic', label: 'Statistic', badge: 'New' },
      { path: '/components/tooltip', label: 'Tooltip' },
      { path: '/components/popover', label: 'Popover', badge: 'New' },
      { path: '/components/carousel', label: 'Carousel' },
      { path: '/components/image', label: 'Image', badge: 'New' },
      { path: '/components/pagination', label: 'Pagination' },
      { path: '/components/empty-state', label: 'EmptyState', badge: 'New' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { path: '/components/alert', label: 'Alert' },
      { path: '/components/toast', label: 'Toast' },
      { path: '/components/skeleton', label: 'Skeleton' },
      { path: '/components/spinner', label: 'Spinner' },
      { path: '/components/progress', label: 'Progress' },
      { path: '/components/bear-loader', label: 'BearLoader' },
      { path: '/components/modal', label: 'Modal' },
      { path: '/components/drawer', label: 'Drawer' },
      { path: '/components/collapsible', label: 'Collapsible', badge: 'New' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { path: '/components/link', label: 'Link' },
      { path: '/components/breadcrumbs', label: 'Breadcrumbs', badge: 'New' },
      { path: '/components/stepper', label: 'Stepper', badge: 'New' },
      { path: '/components/tabs', label: 'Tabs' },
      { path: '/components/accordion', label: 'Accordion' },
      { path: '/components/menu', label: 'Menu' },
      { path: '/components/dropdown', label: 'Dropdown' },
      { path: '/components/speed-dial', label: 'Speed Dial' },
      { path: '/components/bottom-navigation', label: 'BottomNavigation', badge: 'New' },
    ],
  },
  {
    title: 'Utilities',
    items: [
      { path: '/icons', label: 'Icons', badge: '300+' },
      { path: '/hooks', label: 'Hooks' },
      { path: '/components/kbd', label: 'Kbd', badge: 'New' },
      { path: '/components/copy-button', label: 'CopyButton', badge: 'New' },
    ],
  },
];

export const VERSIONS = [
  { value: '1.0.2', label: 'v1.0.2 (latest)' },
  { value: '1.0.0', label: 'v1.0.0' },
  { value: '0.1.0', label: 'v0.1.0' },
];

