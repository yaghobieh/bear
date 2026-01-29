import { HTMLAttributes } from 'react';

export interface SparklineProps extends HTMLAttributes<HTMLDivElement> {
  /** Data points (array of numbers) */
  data: number[];
  /** Width of the sparkline */
  width?: number;
  /** Height of the sparkline */
  height?: number;
  /** Line color */
  color?: string;
  /** Fill area under the line */
  fill?: boolean;
  /** Line width */
  strokeWidth?: number;
  /** Show min/max indicators */
  showExtremes?: boolean;
  /** Animate on render */
  animated?: boolean;
}

