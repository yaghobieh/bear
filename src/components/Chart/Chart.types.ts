import { HTMLAttributes } from 'react';

export type ChartType = 'bar' | 'line' | 'area' | 'pie' | 'donut';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Chart type */
  type: ChartType;
  /** Data points */
  data: ChartDataPoint[];
  /** Chart height */
  height?: number;
  /** Show labels */
  showLabels?: boolean;
  /** Show values */
  showValues?: boolean;
  /** Animate on render */
  animated?: boolean;
  /** Primary color (used for single-color charts) */
  color?: string;
  /** Show grid lines */
  showGrid?: boolean;
}

export interface BarChartProps extends Omit<ChartProps, 'type'> {
  /** Bar orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Bar border radius */
  barRadius?: number;
  /** Gap between bars (0-1) */
  barGap?: number;
}

export interface LineChartProps extends Omit<ChartProps, 'type'> {
  /** Show area fill */
  fill?: boolean;
  /** Line width */
  strokeWidth?: number;
  /** Show dots at data points */
  showDots?: boolean;
  /** Smooth curve */
  smooth?: boolean;
}

export interface PieChartProps extends Omit<ChartProps, 'type'> {
  /** Inner radius for donut chart (0-1) */
  innerRadius?: number;
  /** Start angle in degrees */
  startAngle?: number;
  /** Padding between slices */
  padAngle?: number;
}

