import type { HTMLAttributes, ReactNode } from 'react';

export type ChartType = 'bar' | 'line' | 'area' | 'pie' | 'donut' | 'radar' | 'funnel' | 'stacked';

export type PieView = 'full' | 'half' | 'rose';

export type ChartLegendPosition = 'right' | 'bottom' | 'none';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  stacks?: number[];
}

export interface ChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  testId?: string;
  type: ChartType;
  data: ChartDataPoint[];
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
  animated?: boolean;
  color?: string;
  showGrid?: boolean;
  pieView?: PieView;
  explodeIndex?: number;
  legendPosition?: ChartLegendPosition;
  stepped?: boolean;
  stacked?: boolean;
}

export interface BarChartProps extends Omit<ChartProps, 'type'> {
  orientation?: 'vertical' | 'horizontal';
  barRadius?: number;
  barGap?: number;
}

export interface LineChartProps extends Omit<ChartProps, 'type'> {
  fill?: boolean;
  strokeWidth?: number;
  showDots?: boolean;
  smooth?: boolean;
}

export interface PieChartProps extends Omit<ChartProps, 'type'> {
  innerRadius?: number;
  startAngle?: number;
  padAngle?: number;
  onSliceClick?: (item: ChartDataPoint, index: number) => void;
  onSliceHover?: (item: ChartDataPoint | null, index: number | null) => void;
  showSliceTooltip?: boolean;
  sliceTooltipTitle?: (item: ChartDataPoint, index: number) => ReactNode;
  sliceTooltipDescription?: (item: ChartDataPoint, index: number) => ReactNode;
  sliceTooltipContent?: (item: ChartDataPoint, index: number) => ReactNode;
}

export type RadarChartProps = Omit<ChartProps, 'type'>;

export type FunnelChartProps = Omit<ChartProps, 'type'>;
