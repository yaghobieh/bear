/**
 * Navigation constants for Bear Portal
 */

export interface NavItem {
  path: string;
  label: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
  external?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const BEAR_VERSION = '1.1.2';

/** Main Bear UI repository */
export const GITHUB_URL = 'https://github.com/yaghobieh/bear';
export const NPM_URL = 'https://www.npmjs.com/package/@forgedevstack/bear';
export const CLI_NPM_URL = 'https://www.npmjs.com/package/@forgedevstack/forge-cli';
export const FORGESTACK_URL = 'https://forgedevstack.com';

/** CMS Admin */
export const ADMIN_URL = import.meta.env?.VITE_ADMIN_URL ?? '/admin';

export const NAVIGATION: NavGroup[] = [
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

  // Components
  {
    title: 'Components',
    items: [
      // Layout
      {
        path: '/components/flex',
        label: 'Layout',
        children: [
          { path: '/components/flex', label: 'Flex' },
          { path: '/components/grid', label: 'Grid' },
          { path: '/components/columns', label: 'Columns' },
          { path: '/components/masonry', label: 'Masonry', badge: 'New' },
          { path: '/components/container', label: 'Container' },
          { path: '/components/box', label: 'Box' },
          { path: '/components/paper', label: 'Paper' },
          { path: '/components/divider', label: 'Divider' },
          { path: '/components/scroll-area', label: 'ScrollArea' },
          { path: '/components/resizable-panel', label: 'ResizablePanel' },
          { path: '/components/aspect-ratio', label: 'AspectRatio', badge: 'New' },
        ],
      },
      // Page Layout
      {
        path: '/components/app-bar',
        label: 'Page Layout',
        children: [
          { path: '/components/app-bar', label: 'AppBar' },
          { path: '/components/sidebar', label: 'Sidebar' },
          { path: '/components/dock', label: 'Dock' },
        ],
      },
      // Button
      {
        path: '/components/button',
        label: 'Button',
        children: [
          { path: '/components/button', label: 'Button' },
          { path: '/components/button-group', label: 'ButtonGroup' },
          { path: '/components/fab', label: 'FAB' },
          { path: '/components/speed-dial', label: 'SpeedDial' },
          { path: '/components/copy-button', label: 'CopyButton' },
          { path: '/components/back-top', label: 'BackTop' },
        ],
      },
      // Input
      {
        path: '/components/input',
        label: 'Input',
        children: [
          { path: '/components/input', label: 'Input' },
          { path: '/components/form-field', label: 'FormField', badge: 'New' },
          { path: '/components/password-input', label: 'PasswordInput', badge: 'New' },
          { path: '/components/input-group', label: 'InputGroup', badge: 'New' },
          { path: '/components/resizable-textarea', label: 'ResizableTextarea' },
          { path: '/components/number-input', label: 'NumberInput' },
          { path: '/components/otp-input', label: 'OTPInput' },
          { path: '/components/phone-input', label: 'PhoneInput' },
          { path: '/components/credit-input', label: 'CreditInput' },
          { path: '/components/tags-input', label: 'TagsInput' },
          { path: '/components/mentions-input', label: 'MentionsInput' },
          { path: '/components/autocomplete', label: 'Autocomplete' },
        ],
      },
      // Select
      {
        path: '/components/select',
        label: 'Select',
        children: [
          { path: '/components/select', label: 'Select' },
          { path: '/components/multi-select', label: 'MultiSelect' },
          { path: '/components/navigable-select', label: 'NavigableSelect' },
          { path: '/components/cascader', label: 'Cascader' },
          { path: '/components/transfer-list', label: 'TransferList' },
        ],
      },
      // Form Controls
      {
        path: '/components/checkbox',
        label: 'Form Controls',
        children: [
          { path: '/components/checkbox', label: 'Checkbox' },
          { path: '/components/radio', label: 'Radio' },
          { path: '/components/switch', label: 'Switch' },
          { path: '/components/slider', label: 'Slider' },
          { path: '/components/slider-range', label: 'SliderRange' },
          { path: '/components/rating', label: 'Rating' },
          { path: '/components/segmented-control', label: 'SegmentedControl' },
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
          { path: '/components/emoji-picker', label: 'EmojiPicker' },
        ],
      },
      // Editors
      {
        path: '/components/rich-editor',
        label: 'Editors',
        children: [
          { path: '/components/rich-editor', label: 'RichEditor' },
          { path: '/components/editable', label: 'Editable' },
          { path: '/components/sign-pad', label: 'SignPad' },
        ],
      },
      { path: '/components/form', label: 'Form' },
      { path: '/components/file-upload', label: 'FileUpload' },
      // Card
      {
        path: '/components/card',
        label: 'Card',
        children: [
          { path: '/components/card', label: 'Card' },
          { path: '/components/hover-card', label: 'HoverCard' },
        ],
      },
      // Overlay
      {
        path: '/components/modal',
        label: 'Overlay',
        children: [
          { path: '/components/modal', label: 'Modal' },
          { path: '/components/alert-dialog', label: 'AlertDialog', badge: 'New' },
          { path: '/components/drawer', label: 'Drawer' },
          { path: '/components/bottom-sheet', label: 'BottomSheet' },
          { path: '/components/command-palette', label: 'CommandPalette' },
          { path: '/components/spotlight', label: 'Spotlight' },
        ],
      },
      // Tooltip
      {
        path: '/components/tooltip',
        label: 'Tooltip',
        children: [
          { path: '/components/tooltip', label: 'Tooltip' },
          { path: '/components/popover', label: 'Popover' },
        ],
      },
      // Feedback
      {
        path: '/components/alert',
        label: 'Feedback',
        children: [
          { path: '/components/alert', label: 'Alert' },
          { path: '/components/toast', label: 'Toast' },
          { path: '/components/notification-center', label: 'NotificationCenter' },
        ],
      },
      // Loading
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
      // Navigation
      {
        path: '/components/tabs',
        label: 'Navigation',
        children: [
          { path: '/components/tabs', label: 'Tabs' },
          { path: '/components/accordion', label: 'Accordion' },
          { path: '/components/collapsible', label: 'Collapsible' },
          { path: '/components/menu', label: 'Menu' },
          { path: '/components/dropdown', label: 'Dropdown' },
          { path: '/components/breadcrumbs', label: 'Breadcrumbs' },
          { path: '/components/stepper', label: 'Stepper' },
          { path: '/components/bottom-navigation', label: 'BottomNavigation' },
          { path: '/components/active-bar', label: 'ActiveBar' },
        ],
      },
      // Typography
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
          { path: '/components/gradient-text', label: 'GradientText' },
          { path: '/components/typewriter', label: 'Typewriter' },
        ],
      },
      // Avatar / Identity
      {
        path: '/components/avatar',
        label: 'Avatar & Identity',
        children: [
          { path: '/components/avatar', label: 'Avatar' },
          { path: '/components/badge', label: 'Badge' },
          { path: '/components/chip', label: 'Chip' },
        ],
      },
      // Data
      {
        path: '/components/data-table',
        label: 'Data Display',
        children: [
          { path: '/components/data-table', label: 'DataTable' },
          { path: '/components/list', label: 'List' },
          { path: '/components/tree-view', label: 'TreeView' },
          { path: '/components/file-tree', label: 'FileTree' },
          { path: '/components/virtual-list', label: 'VirtualList' },
          { path: '/components/kanban', label: 'Kanban' },
        ],
      },
      // Misc
      { path: '/components/calendar', label: 'Calendar' },
      { path: '/components/empty-state', label: 'EmptyState' },
      { path: '/components/pagination', label: 'Pagination' },
      { path: '/components/statistic', label: 'Statistic' },
      { path: '/components/timeline', label: 'Timeline' },
      { path: '/components/link', label: 'Link' },
      { path: '/components/image', label: 'Image' },
    ],
  },

  // Advanced
  {
    title: 'Advanced',
    items: [
      {
        path: '/components/map',
        label: 'Media',
        children: [
          { path: '/components/map', label: 'Map' },
          { path: '/components/code-editor', label: 'CodeEditor' },
          { path: '/components/cropper', label: 'Cropper' },
          { path: '/components/carousel', label: 'Carousel' },
        ],
      },
      {
        path: '/components/transition',
        label: 'Animation',
        children: [
          { path: '/components/transition', label: 'Transition' },
          { path: '/components/marquee', label: 'Marquee' },
          { path: '/components/confetti', label: 'Confetti' },
          { path: '/components/countdown-timer', label: 'CountdownTimer' },
        ],
      },
      {
        path: '/components/watermark',
        label: 'Utility',
        children: [
          { path: '/components/watermark', label: 'Watermark' },
          { path: '/components/qr-code', label: 'QRCode' },
          { path: '/components/tour', label: 'Tour' },
        ],
      },
      {
        path: '/components/json-viewer',
        label: 'Developer',
        children: [
          { path: '/components/json-viewer', label: 'JsonViewer' },
          { path: '/components/diff-viewer', label: 'DiffViewer' },
          { path: '/components/terminal', label: 'Terminal' },
        ],
      },
      {
        path: '/components/chat',
        label: 'Chat',
        children: [
          { path: '/components/chat', label: 'Chat' },
          { path: '/components/floating-chat', label: 'FloatingChat' },
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

  // Component API
  {
    title: 'Component API',
    items: [
      { path: '/api/overview', label: 'Overview' },
      {
        path: '/api/inputs',
        label: 'Inputs',
        children: [
          { path: '/api/input', label: 'Input API' },
          { path: '/api/form-field', label: 'FormField API', badge: 'New' },
          { path: '/api/password-input', label: 'PasswordInput API', badge: 'New' },
          { path: '/api/select', label: 'Select API' },
          { path: '/api/checkbox', label: 'Checkbox API' },
          { path: '/api/switch', label: 'Switch API' },
          { path: '/api/slider', label: 'Slider API' },
        ],
      },
      {
        path: '/api/display',
        label: 'Display',
        children: [
          { path: '/api/button', label: 'Button API' },
          { path: '/api/typography', label: 'Typography API' },
          { path: '/api/card', label: 'Card API' },
          { path: '/api/avatar', label: 'Avatar API' },
          { path: '/api/badge', label: 'Badge API' },
          { path: '/api/alert', label: 'Alert API' },
        ],
      },
      {
        path: '/api/layout',
        label: 'Layout',
        children: [
          { path: '/api/grid', label: 'Grid API' },
          { path: '/api/flex', label: 'Flex API' },
          { path: '/api/container', label: 'Container API' },
          { path: '/api/app-bar', label: 'AppBar API' },
          { path: '/api/sidebar', label: 'Sidebar API' },
        ],
      },
      {
        path: '/api/overlay',
        label: 'Overlay',
        children: [
          { path: '/api/modal', label: 'Modal API' },
          { path: '/api/drawer', label: 'Drawer API' },
          { path: '/api/tooltip', label: 'Tooltip API' },
          { path: '/api/alert-dialog', label: 'AlertDialog API', badge: 'New' },
        ],
      },
    ],
  },

  // Theming & Customization
  {
    title: 'Theming & Customization',
    items: [
      { path: '/customization/overview', label: 'Overview' },
      { path: '/customization/palette', label: 'Palette' },
      { path: '/customization/typography', label: 'Typography' },
      { path: '/customization/spacing', label: 'Spacing' },
      { path: '/customization/breakpoints', label: 'Breakpoints' },
      { path: '/customization/z-index', label: 'z-index' },
      { path: '/customization/dark-mode', label: 'Dark Mode' },
      { path: '/customization/css-variables', label: 'CSS Variables' },
      { path: '/customization/custom-components', label: 'Custom Components' },
    ],
  },

  // Guides
  {
    title: 'Guides',
    items: [
      { path: '/guides/responsive-ui', label: 'Responsive UI' },
      { path: '/guides/minimize-bundle', label: 'Minimize Bundle Size' },
      { path: '/guides/server-rendering', label: 'Server Rendering' },
      { path: '/guides/accessibility', label: 'Accessibility' },
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
      { path: '/hooks/use-drag-drop', label: 'useDragDrop' },
      { path: '/hooks/use-lazy-load', label: 'useLazyLoad' },
      { path: '/hooks/use-bounce', label: 'useBounce' },
      { path: '/hooks/use-float', label: 'useFloat' },
      { path: '/hooks/use-parallax', label: 'useParallax' },
      { path: '/hooks/use-pulse', label: 'usePulse' },
      { path: '/hooks/use-shake', label: 'useShake' },
      { path: '/hooks/use-slide', label: 'useSlide' },
      { path: '/hooks/use-online', label: 'useOnline' },
      { path: '/hooks/use-idle', label: 'useIdle' },
      { path: '/hooks/use-long-press', label: 'useLongPress' },
      { path: '/hooks/use-websocket', label: 'useWebSocket' },
      { path: '/hooks/use-page-visibility', label: 'usePageVisibility' },
    ],
  },

  // Store
  {
    title: 'Store',
    items: [
      { path: '/store', label: 'Templates & Themes' },
    ],
  },
];

export const VERSIONS = [
  { value: '1.1.2', label: 'v1.1.2 (current)' },
  { value: '1.1.1', label: 'v1.1.1' },
  { value: '1.0.9', label: 'v1.0.9' },
  { value: '1.0.8', label: 'v1.0.8' },
  { value: '1.0.7', label: 'v1.0.7' },
  { value: '1.0.6', label: 'v1.0.6' },
  { value: '1.0.5', label: 'v1.0.5' },
  { value: '1.0.4', label: 'v1.0.4' },
  { value: '1.0.3', label: 'v1.0.3' },
  { value: '1.0.2', label: 'v1.0.2' },
  { value: '1.0.0', label: 'v1.0.0' },
];

/** Editor + site-wide theme presets */
export interface ThemePreset {
  id: string;
  name: string;
  dark: boolean;
  primary: string;
  colors: {
    bg: string;
    text: string;
    keyword: string;
    string: string;
    comment: string;
    function: string;
    number: string;
    operator: string;
    lineNumber: string;
    selection: string;
  };
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'bear',
    name: 'Bear',
    dark: true,
    primary: '#cba6f7',
    colors: {
      bg: '#1e1e2e', text: '#cdd6f4', keyword: '#cba6f7', string: '#a6e3a1',
      comment: '#6c7086', function: '#89b4fa', number: '#fab387', operator: '#89dceb',
      lineNumber: '#585b70', selection: '#45475a',
    },
  },
  {
    id: 'bear-light',
    name: 'Bear Light',
    dark: false,
    primary: '#ec4899',
    colors: {
      bg: '#eff1f5', text: '#4c4f69', keyword: '#8839ef', string: '#40a02b',
      comment: '#9ca0b0', function: '#1e66f5', number: '#fe640b', operator: '#179299',
      lineNumber: '#9ca0b0', selection: '#ccd0da',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    dark: true,
    primary: '#ff79c6',
    colors: {
      bg: '#282a36', text: '#f8f8f2', keyword: '#ff79c6', string: '#f1fa8c',
      comment: '#6272a4', function: '#50fa7b', number: '#bd93f9', operator: '#ff79c6',
      lineNumber: '#6272a4', selection: '#44475a',
    },
  },
  {
    id: 'atom',
    name: 'Atom One Dark',
    dark: true,
    primary: '#61afef',
    colors: {
      bg: '#282c34', text: '#abb2bf', keyword: '#c678dd', string: '#98c379',
      comment: '#5c6370', function: '#61afef', number: '#d19a66', operator: '#56b6c2',
      lineNumber: '#4b5263', selection: '#3e4451',
    },
  },
  {
    id: 'sublime',
    name: 'Sublime',
    dark: true,
    primary: '#f92672',
    colors: {
      bg: '#272822', text: '#f8f8f2', keyword: '#f92672', string: '#e6db74',
      comment: '#75715e', function: '#a6e22e', number: '#ae81ff', operator: '#f92672',
      lineNumber: '#75715e', selection: '#49483e',
    },
  },
  {
    id: 'webstorm',
    name: 'WebStorm',
    dark: true,
    primary: '#cc7832',
    colors: {
      bg: '#2b2b2b', text: '#a9b7c6', keyword: '#cc7832', string: '#6a8759',
      comment: '#808080', function: '#ffc66d', number: '#6897bb', operator: '#cc7832',
      lineNumber: '#606366', selection: '#214283',
    },
  },
];
