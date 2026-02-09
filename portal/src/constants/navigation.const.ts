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

export const BEAR_VERSION = '1.0.8';
export const KILN_BASE_URL = 'http://localhost:6006';

/** Main Bear UI repository */
export const GITHUB_URL = 'https://github.com/yaghobieh/bear';
export const NPM_URL = 'https://www.npmjs.com/package/@forgedevstack/bear';

/** CMS Admin (Pages, Users). In dev set VITE_ADMIN_URL=http://localhost:3001/admin when admin runs on port 3001. */
export const ADMIN_URL = import.meta.env?.VITE_ADMIN_URL ?? '/admin';

export const NAVIGATION: NavGroup[] = [
  // Getting Started - always visible
  {
    title: 'Getting Started',
    items: [
      { path: '/', label: 'Introduction' },
      { path: '/installation', label: 'Installation' },
      { path: '/theming', label: 'Theming' },
      { path: '/typescript', label: 'TypeScript' },
      { path: '/icons', label: 'Icons', badge: '300+' },
      { path: '/roadmap', label: 'Roadmap' },
    ],
  },

  // Components - nested structure
  {
    title: 'Components',
    items: [
      // Button family
      { 
        path: '/components/button', 
        label: 'Button', 
        children: [
          { path: '/components/button', label: 'Button' },
          { path: '/components/button-group', label: 'ButtonGroup' },
          { path: '/components/fab', label: 'FAB' },
          { path: '/components/speed-dial', label: 'SpeedDial' },
          { path: '/components/copy-button', label: 'CopyButton' },
          { path: '/components/back-top', label: 'BackTop', badge: 'New' },
        ],
      },
      // Input family
      {
        path: '/components/input',
        label: 'Input',
        children: [
          { path: '/components/input', label: 'Input' },
          { path: '/components/number-input', label: 'NumberInput' },
          { path: '/components/otp-input', label: 'OTPInput' },
          { path: '/components/phone-input', label: 'PhoneInput' },
          { path: '/components/credit-input', label: 'CreditInput' },
          { path: '/components/tags-input', label: 'TagsInput', badge: 'New' },
          { path: '/components/mentions-input', label: 'MentionsInput', badge: 'New' },
          { path: '/components/autocomplete', label: 'Autocomplete' },
        ],
      },
      // Select family
      {
        path: '/components/select',
        label: 'Select',
        children: [
          { path: '/components/select', label: 'Select' },
          { path: '/components/multi-select', label: 'MultiSelect' },
          { path: '/components/cascader', label: 'Cascader' },
          { path: '/components/transfer-list', label: 'TransferList' },
        ],
      },
      // Form controls
      {
        path: '/components/checkbox',
        label: 'Form Controls',
        children: [
          { path: '/components/checkbox', label: 'Checkbox' },
          { path: '/components/radio', label: 'Radio' },
          { path: '/components/switch', label: 'Switch' },
          { path: '/components/slider', label: 'Slider' },
          { path: '/components/slider-range', label: 'SliderRange', badge: 'New' },
          { path: '/components/rating', label: 'Rating' },
          { path: '/components/segmented-control', label: 'SegmentedControl', badge: 'New' },
        ],
      },
      // Pickers
      {
        path: '/components/date-picker',
        label: 'Pickers',
        children: [
          { path: '/components/date-picker', label: 'DatePicker' },
          { path: '/components/time-picker', label: 'TimePicker' },
          { path: '/components/color-picker', label: 'ColorPicker' },
          { path: '/components/emoji-picker', label: 'EmojiPicker', badge: 'New' },
        ],
      },
      // Rich editors
      {
        path: '/components/rich-editor',
        label: 'Editors',
        badge: 'Hot',
        children: [
          { path: '/components/rich-editor', label: 'RichEditor', badge: 'Hot' },
          { path: '/components/editable', label: 'Editable' },
          { path: '/components/sign-pad', label: 'SignPad' },
        ],
      },
      // Form
      { path: '/components/form', label: 'Form' },
      { path: '/components/file-upload', label: 'FileUpload' },
      // Card family
      {
        path: '/components/card',
        label: 'Card',
        children: [
          { path: '/components/card', label: 'Card' },
          { path: '/components/hover-card', label: 'HoverCard' },
        ],
      },
      // Modal family
      {
        path: '/components/modal',
        label: 'Modal',
        children: [
          { path: '/components/modal', label: 'Modal' },
          { path: '/components/drawer', label: 'Drawer' },
          { path: '/components/bottom-sheet', label: 'BottomSheet', badge: 'New' },
          { path: '/components/command-palette', label: 'CommandPalette' },
        ],
      },
      // Popover family
      {
        path: '/components/tooltip',
        label: 'Tooltip',
        children: [
          { path: '/components/tooltip', label: 'Tooltip' },
          { path: '/components/popover', label: 'Popover' },
        ],
      },
      // Alert family
      {
        path: '/components/alert',
        label: 'Alert',
        children: [
          { path: '/components/alert', label: 'Alert' },
          { path: '/components/toast', label: 'Toast' },
          { path: '/components/notification-center', label: 'NotificationCenter' },
        ],
      },
      // Loading family
      {
        path: '/components/spinner',
        label: 'Loading',
        children: [
          { path: '/components/spinner', label: 'Spinner' },
          { path: '/components/progress', label: 'Progress' },
          { path: '/components/skeleton', label: 'Skeleton' },
          { path: '/components/bear-loader', label: 'BearLoader' },
        ],
      },
      // Navigation family
      {
        path: '/components/tabs',
        label: 'Tabs',
        children: [
          { path: '/components/tabs', label: 'Tabs' },
          { path: '/components/accordion', label: 'Accordion' },
          { path: '/components/collapsible', label: 'Collapsible' },
        ],
      },
      {
        path: '/components/menu',
        label: 'Menu',
        children: [
          { path: '/components/menu', label: 'Menu' },
          { path: '/components/dropdown', label: 'Dropdown' },
          { path: '/components/breadcrumbs', label: 'Breadcrumbs' },
          { path: '/components/stepper', label: 'Stepper' },
          { path: '/components/bottom-navigation', label: 'BottomNavigation' },
          { path: '/components/active-bar', label: 'ActiveBar' },
        ],
      },
      // Layout family
      {
        path: '/components/app-bar',
        label: 'Layout',
        badge: 'Hot',
        children: [
          { path: '/components/app-bar', label: 'AppBar', badge: 'Hot' },
          { path: '/components/sidebar', label: 'Sidebar' },
          { path: '/components/container', label: 'Container' },
          { path: '/components/box', label: 'Box' },
          { path: '/components/grid', label: 'Grid' },
          { path: '/components/flex', label: 'Flex' },
          { path: '/components/columns', label: 'Columns' },
          { path: '/components/paper', label: 'Paper' },
          { path: '/components/divider', label: 'Divider' },
          { path: '/components/scroll-area', label: 'ScrollArea' },
        ],
      },
      // Typography family
      {
        path: '/components/typography',
        label: 'Typography',
        children: [
          { path: '/components/typography', label: 'Typography' },
          { path: '/components/code-block', label: 'CodeBlock' },
          { path: '/components/kbd', label: 'Kbd' },
          { path: '/components/em', label: 'Em' },
          { path: '/components/highlight', label: 'Highlight' },
          { path: '/components/mark', label: 'Mark' },
        ],
      },
      // Avatar family
      {
        path: '/components/avatar',
        label: 'Avatar',
        children: [
          { path: '/components/avatar', label: 'Avatar' },
          { path: '/components/badge', label: 'Badge' },
          { path: '/components/chip', label: 'Chip' },
        ],
      },
      // Data display
      {
        path: '/components/data-table',
        label: 'Table',
        children: [
          { path: '/components/data-table', label: 'DataTable' },
          { path: '/components/list', label: 'List' },
          { path: '/components/tree-view', label: 'TreeView' },
          { path: '/components/virtual-list', label: 'VirtualList', badge: 'New' },
          { path: '/components/kanban', label: 'Kanban', badge: 'Hot' },
        ],
      },
      // Other display
      { path: '/components/calendar', label: 'Calendar' },
      { path: '/components/carousel', label: 'Carousel' },
      { path: '/components/image', label: 'Image' },
      { path: '/components/empty-state', label: 'EmptyState' },
      { path: '/components/pagination', label: 'Pagination' },
      { path: '/components/statistic', label: 'Statistic' },
      { path: '/components/timeline', label: 'Timeline' },
      { path: '/components/link', label: 'Link' },
      // Special
      { path: '/components/qr-code', label: 'QRCode', badge: 'New' },
      { path: '/components/confetti', label: 'Confetti', badge: 'New' },
      { path: '/components/tour', label: 'Tour', badge: 'New' },
      // Developer Tools
      {
        path: '/components/json-viewer',
        label: 'Developer',
        badge: 'New',
        children: [
          { path: '/components/json-viewer', label: 'JsonViewer', badge: 'New' },
          { path: '/components/diff-viewer', label: 'DiffViewer', badge: 'New' },
          { path: '/components/terminal', label: 'Terminal', badge: 'New' },
        ],
      },
      // Chat
      {
        path: '/components/chat',
        label: 'Chat',
        badge: 'New',
        children: [
          { path: '/components/chat', label: 'Chat', badge: 'New' },
          { path: '/components/floating-chat', label: 'FloatingChat', badge: 'New' },
        ],
      },
    ],
  },

  // Charts
  {
    title: 'Charts',
    items: [
      { path: '/components/chart', label: 'Chart' },
      { path: '/components/bar-chart', label: 'BarChart' },
      { path: '/components/line-chart', label: 'LineChart' },
      { path: '/components/pie-chart', label: 'PieChart' },
      { path: '/components/sparkline', label: 'Sparkline' },
      { path: '/components/gauge', label: 'Gauge' },
    ],
  },

  // Hooks
  {
    title: 'Hooks',
    items: [
      { path: '/hooks', label: 'Overview' },
      { path: '/hooks/use-clipboard', label: 'useClipboard' },
      { path: '/hooks/use-debounce', label: 'useDebounce' },
      { path: '/hooks/use-throttle', label: 'useThrottle' },
      { path: '/hooks/use-local-storage', label: 'useLocalStorage' },
      { path: '/hooks/use-key-press', label: 'useKeyPress' },
      { path: '/hooks/use-intersection-observer', label: 'useIntersectionObserver' },
      { path: '/hooks/use-drag-drop', label: 'useDragDrop', badge: 'New' },
      { path: '/hooks/use-lazy-load', label: 'useLazyLoad', badge: 'New' },
      { path: '/hooks/use-bounce', label: 'useBounce' },
      { path: '/hooks/use-float', label: 'useFloat' },
      { path: '/hooks/use-parallax', label: 'useParallax' },
      { path: '/hooks/use-pulse', label: 'usePulse' },
      { path: '/hooks/use-shake', label: 'useShake' },
      { path: '/hooks/use-slide', label: 'useSlide' },
      { path: '/hooks/use-online', label: 'useOnline', badge: 'New' },
      { path: '/hooks/use-idle', label: 'useIdle', badge: 'New' },
      { path: '/hooks/use-long-press', label: 'useLongPress', badge: 'New' },
      { path: '/hooks/use-websocket', label: 'useWebSocket', badge: 'New' },
      { path: '/hooks/use-page-visibility', label: 'usePageVisibility', badge: 'New' },
    ],
  },

  // Resources
  {
    title: 'Resources',
    items: [
      { path: '/templates', label: 'Templates', badge: 'Soon' },
    ],
  },
];

export const VERSIONS = [
  { value: '1.0.9', label: 'v1.0.9 (current)' },
  { value: '1.0.8', label: 'v1.0.8' },
  { value: '1.0.7', label: 'v1.0.7' },
  { value: '1.0.6', label: 'v1.0.6' },
  { value: '1.0.5', label: 'v1.0.5' },
  { value: '1.0.4', label: 'v1.0.4' },
  { value: '1.0.3', label: 'v1.0.3' },
  { value: '1.0.2', label: 'v1.0.2' },
  { value: '1.0.0', label: 'v1.0.0' },
];
