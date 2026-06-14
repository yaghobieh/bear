import type { PropRow } from '@/components/PropsTable';
import type { TimelineItem } from '@forgedevstack/bear';

export const TIMELINE_DEMO_ITEMS: TimelineItem[] = [
  {
    time: '10:00 AM',
    date: 'June 14, 2026 — 10:00 AM',
    title: 'Project Started',
    description: 'Initial project setup and planning',
    detail: 'Kickoff meeting with design and engineering.',
    color: 'pink',
  },
  {
    time: '2:00 PM',
    date: 'June 14, 2026 — 2:00 PM',
    title: 'Design Review',
    description: 'Team reviewed UI/UX designs',
    detail: 'Approved Bear portal bento layout and docs IA.',
    color: 'blue',
    active: true,
  },
  {
    time: '4:30 PM',
    date: 'June 14, 2026 — 4:30 PM',
    title: 'Development',
    description: 'Started coding the main features',
    detail: 'Shipped SwitchGroup, Checkbox indicators, and theme perf fix.',
    color: 'green',
  },
];

export const TIMELINE_PROPS: PropRow[] = [
  { name: 'items', type: 'TimelineItem[]', description: 'Events to render in order' },
  { name: 'position', type: "'left' | 'right' | 'alternate'", default: 'left', description: 'Content placement relative to the line' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Dot and typography size' },
  { name: 'showLine', type: 'boolean', default: 'true', description: 'Show vertical connector line' },
  { name: 'pending', type: 'boolean | ReactNode', description: 'Append a loading/pending item' },
  { name: 'reverse', type: 'boolean', default: 'false', description: 'Reverse item order' },
  { name: 'lineColor', type: 'string', description: 'Custom line color' },
  { name: 'date', type: 'string', description: 'Per-item full date shown in dot HoverCard' },
  { name: 'detail', type: 'ReactNode', description: 'Per-item detail shown in dot HoverCard' },
  { name: 'onDotClick', type: '() => void', description: 'Per-item dot click handler' },
  { name: 'testId', type: 'string', description: 'data-testid on the root' },
];
