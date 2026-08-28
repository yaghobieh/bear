export interface ChangelogEntry {
  version: string;
  date: string;
  tag: 'major' | 'minor' | 'patch';
  sections: {
    title: string;
    items: string[];
  }[];
}

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: '1.3.2',
    date: 'August 28, 2026',
    tag: 'patch',
    sections: [
      {
        title: 'Fixed',
        items: [
          'Right-side Drawer stays on the right and slides out to the right; close control on the inner edge',
        ],
      },
      {
        title: 'Added',
        items: [
          '@forgedevstack/bear-icons — default Bear install includes icons; skip with --omit=optional, or install the icon package alone',
          'Drawer openEffect, closeEffect, and effect={{ open, close }} (same motion set as Select)',
          'Chart type radar, funnel, and stacked; pieView "half" | "rose"; explodeIndex; line stepped',
          'Gauge variant linear | ring',
          'Sparkline variant bars and showLastPoint',
          'Heatmap cellShape circle',
          'TimelineChart variant points',
          'RingProgress variant half',
        ],
      },
    ],
  },
  {
    version: '1.3.1',
    date: 'August 23, 2026',
    tag: 'patch',
    sections: [
      {
        title: 'Added',
        items: [
          'openEffect, closeEffect, and effect={{ open, close }} on Select, Dropdown, DatePicker, DateRangePicker, TimePicker, and Calendar',
          'OverlayPortal stays mounted through the close animation',
        ],
      },
      {
        title: 'Fixed',
        items: [
          'DatePicker calendar stays on the input while the page or drawer scrolls',
          'TimePicker dropdown portals above cards and drawers',
          'Select and Dropdown no longer flash from the top-left before the first layout',
          'GradientText WebKit clip so short strings stay readable',
          'SegmentedControl selected chip is visible in light and dark',
          'RichEditor heading and color menus sit above the textarea, with toolbar tooltips and SignPad insert',
          'SignPad X mark and baseline sit above the canvas',
        ],
      },
      {
        title: 'Changed',
        items: [
          'Code review pass on Rating, Resizable, Result, RingProgress, ScrollArea, SegmentedControl, RichEditor, TreeSelect, TreeView, and Typography',
        ],
      },
    ],
  },
  {
    version: '1.3.0',
    date: 'August 19, 2026',
    tag: 'minor',
    sections: [
      {
        title: 'Added',
        items: [
          'ModalsProvider — imperative open, confirm, close, and closeAll (FORGE-9)',
        ],
      },
      {
        title: 'Fixed',
        items: [
          'Modal and Drawer sit above backdrop blur (FORGE-84, FORGE-85)',
          'SignPad captures mouse and touch signatures again (FORGE-87)',
          'Toast and Snackbar surfaces and description contrast in dark and light (FORGE-86)',
        ],
      },
    ],
  },
  {
    version: '1.2.9',
    date: 'August 14, 2026',
    tag: 'patch',
    sections: [
      {
        title: 'Fixed',
        items: [
          'StatCard bear-* prefixes so dashboard kit works in light mode',
          'Stepper active/pending contrast in light mode',
        ],
      },
      {
        title: 'Portal',
        items: [
          'Kit PropsTables; clickable form Stepper',
          'RichEditor banner → Ink',
          'Calendar banner → Forge Calendar',
        ],
      },
    ],
  },
  {
    version: '1.2.8',
    date: 'August 8, 2026',
    tag: 'patch',
    sections: [
      {
        title: 'Added',
        items: [
          'AppShell — header, navbar, main, aside, footer layout',
          'Banner — severity announcement strip with dismiss + sticky',
          'Portal docs for AppShell and Banner',
        ],
      },
    ],
  },
  {
    version: '1.2.7',
    date: 'August 1, 2026',
    tag: 'patch',
    sections: [
      {
        title: 'Added',
        items: [
          'PageHeader + useBreakpoint',
          'Bear-{Component}-{alphanumeric} DOM ids',
          'Shared Toast/Snackbar live-region utilities',
          'Backdrop transitions; Modal/Drawer compose Backdrop',
          'MessageList overscan + prepend scroll anchoring',
          'ChipGroup size presets + overflow menu / delete-all',
          'Portal dashboard / form / auth template kits (EN+ES)',
          'CI smoke: RTL dir + Toast aria-live',
        ],
      },
      {
        title: 'Changed',
        items: [
          'Density compact honored by Button, Input, Chip, Tabs',
          'Select native FormControl parity',
          'Autocomplete/EmptyState dual-mode overlay tokens',
        ],
      },
    ],
  },
  {
    version: '1.2.6',
    date: 'July 24, 2026',
    tag: 'patch',
    sections: [
      {
        title: 'Added',
        items: [
          'AppBar — dense, disableGutters, enableColorOnDark',
          'Backdrop — scrim overlay with blur/invisible modes',
          'ChipGroup — avatar/tag groups with +N overflow',
          'Select native, displayEmpty, renderValue implementation',
          'MessageList virtualization for long conversations',
          'Progress bufferValue + label; ListItem secondaryAction',
          'Portal category landings and Phase 6 docs completion',
        ],
      },
      {
        title: 'Changed',
        items: [
          'Toast aria-live announcements by severity',
          'RTL wired into Drawer, Input, Stepper, Breadcrumbs',
          'BottomNavigation and Chip dual-mode theme tokens',
          'Portal top banner / version popup for 1.2.6',
        ],
      },
    ],
  },
  {
    version: '1.2.4',
    date: 'June 14, 2026',
    tag: 'minor',
    sections: [
      {
        title: 'Added',
        items: [
          'ToggleButton & ToggleButtonGroup — exclusive or multi-select toggles',
          'FormControl — label, error, helper, disabled propagation via context',
          'Snackbar — createPortal with custom container support',
          'TableSkeleton, FormSkeleton, CardSkeleton loading placeholders',
          'CssBaseline — global box-sizing and body reset',
          'Bear IDs — useBearId generates Bear_component_123456 format',
          'BearProvider direction (RTL), density, defaultProps, controlled mode',
          'Input multiline — rows, minRows, maxRows, readOnly, inputRef',
        ],
      },
      {
        title: 'Changed',
        items: [
          'Button — disableRipple, href, component polymorphism',
          'Modal & Drawer — MUI-parity props',
          'FormField integrates FormControl context',
          '72 new *.const.ts root-class files across components',
        ],
      },
    ],
  },
  {
    version: '1.2.3',
    date: 'April 13, 2026',
    tag: 'minor',
    sections: [
      {
        title: 'Changed',
        items: [
          'Migrated from Tailwind CSS to AeroCraft (@forgedevstack/aerocraft)',
          'PostCSS bear-variants plugin for dark:, hover:, focus: utilities',
          'Drawer refactored — constants and utils extracted',
        ],
      },
    ],
  },
  {
    version: '1.2.2',
    date: 'March 24, 2026',
    tag: 'minor',
    sections: [
      {
        title: 'Added',
        items: [
          'AnimatedCounter, GlowCard, MediaPlayer, Heatmap, TagCloud',
          'CurrencyInput, TimelineChart, ImageAnnotation',
        ],
      },
    ],
  },
];
