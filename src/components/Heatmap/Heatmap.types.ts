import type { HTMLAttributes, ReactNode } from 'react';

export interface HeatmapCell {
  date: string;
  value: number;
  label?: string;
}

export interface HeatmapProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Data points with date strings (YYYY-MM-DD) and values */
  data: HeatmapCell[];
  /** Start date (defaults to 1 year ago) */
  startDate?: string;
  /** End date (defaults to today) */
  endDate?: string;
  /** Color scale: array of colors from low to high */
  colorScale?: string[];
  /** Cell size in px */
  cellSize?: number;
  /** Gap between cells in px */
  cellGap?: number;
  /** Show day-of-week labels */
  showDayLabels?: boolean;
  /** Show month labels */
  showMonthLabels?: boolean;
  /** Empty cell color */
  emptyColor?: string;
  /** Tooltip formatter */
  tooltipFormat?: (cell: HeatmapCell) => string;
  /** Callback when a cell is clicked */
  onCellClick?: (cell: HeatmapCell) => void;
  /** Render custom hover content per cell */
  renderTooltip?: (cell: HeatmapCell) => ReactNode;
  /** Test ID */
  testId?: string;
}
