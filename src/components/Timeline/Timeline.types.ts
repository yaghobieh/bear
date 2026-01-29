import { HTMLAttributes, ReactNode } from 'react';

export type TimelinePosition = 'left' | 'right' | 'alternate';
export type TimelineSize = 'sm' | 'md' | 'lg';

export interface TimelineItem {
  /** Item title */
  title: string;
  /** Item description/content */
  description?: ReactNode;
  /** Time/date label */
  time?: string;
  /** Custom icon */
  icon?: ReactNode;
  /** Dot color */
  color?: 'pink' | 'green' | 'blue' | 'amber' | 'red' | 'gray';
  /** Is active/current item */
  active?: boolean;
  /** Extra content below description */
  extra?: ReactNode;
}

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of timeline items */
  items: TimelineItem[];
  /** Position of content relative to line */
  position?: TimelinePosition;
  /** Size */
  size?: TimelineSize;
  /** Show connecting line */
  showLine?: boolean;
  /** Pending/loading state for last item */
  pending?: boolean | ReactNode;
  /** Reverse order */
  reverse?: boolean;
  /** Custom line color */
  lineColor?: string;
  /** Test ID */
  testId?: string;
}
