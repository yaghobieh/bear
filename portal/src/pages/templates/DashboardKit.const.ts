import type { PropRow } from '@/components/PropsTable';

export const DASHBOARD_KIT_STAT_CARD_PROPS: PropRow[] = [
  { name: 'title', type: 'string', description: 'Stat label above the value' },
  { name: 'value', type: 'string | number', description: 'Primary metric value' },
  { name: 'color', type: 'string', default: "'#6366f1'", description: 'Hex color for the gradient surface' },
  { name: 'icon', type: 'ReactNode', description: 'Optional icon inside the action button' },
  { name: 'onClick', type: '() => void', description: 'Makes the card interactive and shows View All' },
  { name: 'id', type: 'string', description: 'DOM id — Bear-StatCard-* when omitted' },
  { name: 'testId', type: 'string', description: 'data-testid for tests' },
  { name: 'className', type: 'string', description: 'Additional classes on the root' },
];

export const DASHBOARD_STAT_COLORS = {
  users: '#6366f1',
  revenue: '#059669',
  latency: '#d97706',
} as const;
