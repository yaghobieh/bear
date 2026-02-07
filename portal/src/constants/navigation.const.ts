/**
 * Navigation constants for Bear Portal
 */

export interface NavItem {
  path: string;
  label: string;
  icon?: string;
  badge?: string;
  kilnPath?: string;
  children?: NavItem[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const BEAR_VERSION = '1.0.7';
export const KILN_BASE_URL = 'http://localhost:6006';

/** Main Bear UI repository */
export const GITHUB_URL = 'https://github.com/yaghobieh/bear';
export const NPM_URL = 'https://www.npmjs.com/package/@forgedevstack/bear';

/** CMS Admin (Pages, Users). In dev set VITE_ADMIN_URL=http://localhost:3001/admin when admin runs on port 3001. */
export const ADMIN_URL = import.meta.env?.VITE_ADMIN_URL ?? '/admin';

export const NAVIGATION: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { path: '/', label: 'Introduction' },
      { path: '/installation', label: 'Installation' },
      { path: '/theming', label: 'Theming' },
      { path: '/typescript', label: 'TypeScript' },
      { path: '/roadmap', label: 'Roadmap' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { path: '/components/container', label: 'Container', kilnPath: '/container' },
      { path: '/components/box', label: 'Box', kilnPath: '/box' },
      { path: '/components/grid', label: 'Grid', kilnPath: '/grid' },
      { path: '/components/flex', label: 'Flex', kilnPath: '/flex' },
      { path: '/components/paper', label: 'Paper', kilnPath: '/paper' },
      { path: '/components/divider', label: 'Divider', kilnPath: '/divider' },
      { path: '/components/app-bar', label: 'AppBar', badge: 'Hot', kilnPath: '/app-bar' },
      { path: '/components/scroll-area', label: 'ScrollArea', kilnPath: '/scroll-area' },
      { path: '/components/sidebar', label: 'Sidebar', kilnPath: '/sidebar' },
      { path: '/components/columns', label: 'Columns', kilnPath: '/columns' },
    ],
  },
  {
    title: 'Inputs',
    items: [
      { path: '/components/button', label: 'Button', kilnPath: '/button' },
      { path: '/components/button-group', label: 'ButtonGroup', kilnPath: '/button-group' },
      { path: '/components/fab', label: 'Floating Action Button', kilnPath: '/fab' },
      { path: '/components/input', label: 'Input', kilnPath: '/input' },
      { path: '/components/number-input', label: 'NumberInput', kilnPath: '/number-input' },
      { path: '/components/otp-input', label: 'OTPInput', kilnPath: '/otp-input' },
      { path: '/components/select', label: 'Select', kilnPath: '/select' },
      { path: '/components/checkbox', label: 'Checkbox', kilnPath: '/checkbox' },
      { path: '/components/radio', label: 'Radio', kilnPath: '/radio' },
      { path: '/components/switch', label: 'Switch', kilnPath: '/switch' },
      { path: '/components/slider', label: 'Slider', kilnPath: '/slider' },
      { path: '/components/slider-range', label: 'SliderRange', badge: 'New', kilnPath: '/slider-range' },
      { path: '/components/segmented-control', label: 'SegmentedControl', badge: 'New', kilnPath: '/segmented-control' },
      { path: '/components/tags-input', label: 'TagsInput', badge: 'New', kilnPath: '/tags-input' },
      { path: '/components/mentions-input', label: 'MentionsInput', badge: 'New', kilnPath: '/mentions-input' },
      { path: '/components/rating', label: 'Rating', kilnPath: '/rating' },
      { path: '/components/date-picker', label: 'DatePicker', kilnPath: '/date-picker' },
      { path: '/components/time-picker', label: 'TimePicker', kilnPath: '/time-picker' },
      { path: '/components/phone-input', label: 'PhoneInput', kilnPath: '/phone-input' },
      { path: '/components/credit-input', label: 'CreditInput', kilnPath: '/credit-input' },
      { path: '/components/cascader', label: 'Cascader', kilnPath: '/cascader' },
      { path: '/components/form', label: 'Form', kilnPath: '/form' },
      { path: '/components/color-picker', label: 'ColorPicker', kilnPath: '/color-picker' },
      { path: '/components/file-upload', label: 'FileUpload', kilnPath: '/file-upload' },
      { path: '/components/autocomplete', label: 'Autocomplete', kilnPath: '/autocomplete' },
      { path: '/components/multi-select', label: 'MultiSelect', kilnPath: '/multi-select' },
      { path: '/components/transfer-list', label: 'Transfer List', kilnPath: '/transfer-list' },
      { path: '/components/editable', label: 'Editable', kilnPath: '/editable' },
      { path: '/components/rich-editor', label: 'RichEditor', badge: 'Hot', kilnPath: '/rich-editor' },
      { path: '/components/sign-pad', label: 'SignPad', kilnPath: '/sign-pad' },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { path: '/components/calendar', label: 'Calendar', kilnPath: '/calendar' },
      { path: '/components/typography', label: 'Typography', kilnPath: '/typography' },
      { path: '/components/em', label: 'Em', kilnPath: '/em' },
      { path: '/components/highlight', label: 'Highlight', kilnPath: '/highlight' },
      { path: '/components/mark', label: 'Mark', kilnPath: '/mark' },
      { path: '/components/code-block', label: 'CodeBlock', kilnPath: '/code-block' },
      { path: '/components/avatar', label: 'Avatar', kilnPath: '/avatar' },
      { path: '/components/badge', label: 'Badge', kilnPath: '/badge' },
      { path: '/components/chip', label: 'Chip', kilnPath: '/chip' },
      { path: '/components/card', label: 'Card', kilnPath: '/card' },
      { path: '/components/hover-card', label: 'HoverCard', kilnPath: '/hover-card' },
      { path: '/components/list', label: 'List', kilnPath: '/list' },
      { path: '/components/data-table', label: 'DataTable', kilnPath: '/data-table' },
      { path: '/components/tree-view', label: 'TreeView', kilnPath: '/tree-view' },
      { path: '/components/timeline', label: 'Timeline', kilnPath: '/timeline' },
      { path: '/components/statistic', label: 'Statistic', kilnPath: '/statistic' },
      { path: '/components/tooltip', label: 'Tooltip', kilnPath: '/tooltip' },
      { path: '/components/popover', label: 'Popover', kilnPath: '/popover' },
      { path: '/components/carousel', label: 'Carousel', kilnPath: '/carousel' },
      { path: '/components/image', label: 'Image', kilnPath: '/image' },
      { path: '/components/pagination', label: 'Pagination', kilnPath: '/pagination' },
      { path: '/components/empty-state', label: 'EmptyState', kilnPath: '/empty-state' },
      { path: '/components/kanban', label: 'Kanban', badge: 'Hot', kilnPath: '/kanban' },
      { path: '/components/virtual-list', label: 'VirtualList', badge: 'New', kilnPath: '/virtual-list' },
      { path: '/components/emoji-picker', label: 'EmojiPicker', badge: 'New', kilnPath: '/emoji-picker' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { path: '/components/alert', label: 'Alert', kilnPath: '/alert' },
      { path: '/components/toast', label: 'Toast', kilnPath: '/toast' },
      { path: '/components/skeleton', label: 'Skeleton', kilnPath: '/skeleton' },
      { path: '/components/spinner', label: 'Spinner', kilnPath: '/spinner' },
      { path: '/components/progress', label: 'Progress', kilnPath: '/progress' },
      { path: '/components/bear-loader', label: 'BearLoader', kilnPath: '/bear-loader' },
      { path: '/components/modal', label: 'Modal', kilnPath: '/modal' },
      { path: '/components/drawer', label: 'Drawer', kilnPath: '/drawer' },
      { path: '/components/collapsible', label: 'Collapsible', kilnPath: '/collapsible' },
      { path: '/components/notification-center', label: 'NotificationCenter', kilnPath: '/notification-center' },
      { path: '/components/command-palette', label: 'CommandPalette', kilnPath: '/command-palette' },
      { path: '/components/bottom-sheet', label: 'BottomSheet', badge: 'New', kilnPath: '/bottom-sheet' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { path: '/components/link', label: 'Link', kilnPath: '/link' },
      { path: '/components/breadcrumbs', label: 'Breadcrumbs', kilnPath: '/breadcrumbs' },
      { path: '/components/stepper', label: 'Stepper', kilnPath: '/stepper' },
      { path: '/components/tabs', label: 'Tabs', kilnPath: '/tabs' },
      { path: '/components/accordion', label: 'Accordion', kilnPath: '/accordion' },
      { path: '/components/menu', label: 'Menu', kilnPath: '/menu' },
      { path: '/components/dropdown', label: 'Dropdown', kilnPath: '/dropdown' },
      { path: '/components/speed-dial', label: 'Speed Dial', kilnPath: '/speed-dial' },
      { path: '/components/bottom-navigation', label: 'BottomNavigation', kilnPath: '/bottom-navigation' },
      { path: '/components/active-bar', label: 'ActiveBar', kilnPath: '/active-bar' },
    ],
  },
  {
    title: 'Charts & Graphs',
    items: [
      { path: '/components/chart', label: 'Chart', kilnPath: '/chart' },
      { path: '/components/bar-chart', label: 'BarChart', kilnPath: '/bar-chart' },
      { path: '/components/line-chart', label: 'LineChart', kilnPath: '/line-chart' },
      { path: '/components/pie-chart', label: 'PieChart', kilnPath: '/pie-chart' },
      { path: '/components/sparkline', label: 'Sparkline', kilnPath: '/sparkline' },
      { path: '/components/gauge', label: 'Gauge', kilnPath: '/gauge' },
    ],
  },
  {
    title: 'Effects & Animation',
    items: [
      { path: '/hooks/use-slide', label: 'useSlide' },
      { path: '/hooks/use-parallax', label: 'useParallax' },
      { path: '/hooks/use-bounce', label: 'useBounce' },
      { path: '/hooks/use-float', label: 'useFloat' },
      { path: '/hooks/use-pulse', label: 'usePulse' },
      { path: '/hooks/use-shake', label: 'useShake' },
    ],
  },
  {
    title: 'Hooks',
    items: [
      { path: '/hooks/use-clipboard', label: 'useClipboard' },
      { path: '/hooks/use-debounce', label: 'useDebounce' },
      { path: '/hooks/use-throttle', label: 'useThrottle' },
      { path: '/hooks/use-local-storage', label: 'useLocalStorage' },
      { path: '/hooks/use-key-press', label: 'useKeyPress' },
      { path: '/hooks/use-intersection-observer', label: 'useIntersectionObserver' },
      { path: '/hooks/use-drag-drop', label: 'useDragDrop', badge: 'New' },
      { path: '/hooks/use-lazy-load', label: 'useLazyLoad', badge: 'New' },
    ],
  },
  {
    title: 'Utilities',
    items: [
      { path: '/icons', label: 'Icons', badge: '300+' },
      { path: '/hooks', label: 'All Hooks' },
      { path: '/templates', label: 'Templates', badge: 'Soon' },
      { path: '/components/kbd', label: 'Kbd', kilnPath: '/kbd' },
      { path: '/components/copy-button', label: 'CopyButton', kilnPath: '/copy-button' },
    ],
  },
];

export const VERSIONS = [
  { value: '1.0.7', label: 'v1.0.7 (current)' },
  { value: '1.0.6', label: 'v1.0.6' },
  { value: '1.0.5', label: 'v1.0.5' },
  { value: '1.0.4', label: 'v1.0.4' },
  { value: '1.0.3', label: 'v1.0.3' },
  { value: '1.0.2', label: 'v1.0.2' },
  { value: '1.0.0', label: 'v1.0.0' },
];
