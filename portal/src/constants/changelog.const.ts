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
