import type { ComparisonRow } from './ComparisonSection.types';

export const COMPARISON_FEATURE_COLUMN_WIDTH = 260;
export const COMPARISON_STATUS_COLUMN_WIDTH = 100;
export const COMPARISON_STATUS_ICON_SIZE = 18;

export const COMPARISON_DATA: ComparisonRow[] = [
  { id: 1, feature: 'Zero Config AeroCraft', bearUI: true, others: false },
  { id: 2, feature: 'Built-in Dark Mode', bearUI: true, others: 'partial' },
  { id: 3, feature: '100+ Components', bearUI: true, others: true },
  { id: 4, feature: 'TypeScript First', bearUI: true, others: 'partial' },
  { id: 5, feature: 'Custom Icon Library (550+)', bearUI: true, others: false },
  { id: 6, feature: 'bearStyled (styled-components)', bearUI: true, others: false },
  { id: 7, feature: 'Breakpoint Provider Override', bearUI: true, others: 'partial' },
  { id: 8, feature: 'Animation Hooks (6+)', bearUI: true, others: false },
  { id: 9, feature: 'Charts, Gauge, Sparkline', bearUI: true, others: 'partial' },
  { id: 10, feature: 'WYSIWYG Rich Editor', bearUI: true, others: false },
  { id: 11, feature: 'Signature Pad', bearUI: true, others: false },
  { id: 12, feature: 'Kanban Board', bearUI: true, others: false },
];

export const COMPARISON_GRID_TABLE_URL = 'https://www.npmjs.com/package/@forgedevstack/grid-table';
export const COMPARISON_GRID_TABLE_LABEL = '@forgedevstack/grid-table';

export const COMPARISON_STATUS_SOON_CLASSES = 'px-2 py-0.5 rounded text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
export const COMPARISON_STATUS_PARTIAL_CLASSES = 'text-xs text-gray-400';
export const COMPARISON_ICON_SUCCESS_CLASSES = 'text-green-500';
export const COMPARISON_ICON_FAILURE_CLASSES = 'text-gray-300 dark:text-gray-600';

export const COMPARISON_HEADER_BEAR_CLASSES = 'text-pink-500 font-bold';
