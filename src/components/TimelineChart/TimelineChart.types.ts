import type { HTMLAttributes, ReactNode } from 'react';

export interface TimelineChartItem {
  label: string;
  start: number;
  end: number;
  color?: string;
  tooltip?: string;
  icon?: ReactNode;
}

export interface TimelineChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Items to display on the timeline */
  items: TimelineChartItem[];
  /** Minimum value of the axis */
  min?: number;
  /** Maximum value of the axis */
  max?: number;
  /** Height of each bar in px */
  barHeight?: number;
  /** Gap between bars in px */
  barGap?: number;
  /** Show axis labels */
  showAxis?: boolean;
  /** Number of axis ticks */
  axisTicks?: number;
  /** Format axis tick value */
  formatTick?: (value: number) => string;
  /** Callback when an item bar is clicked */
  onItemClick?: (item: TimelineChartItem, index: number) => void;
  /** Test ID */
  testId?: string;
}
