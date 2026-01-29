import { HTMLAttributes, ReactNode } from 'react';

export interface GaugeProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value (0-100 or within min/max) */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Size of the gauge */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Primary color */
  color?: string;
  /** Track color */
  trackColor?: string;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label */
  label?: ReactNode;
  /** Animate on render */
  animated?: boolean;
  /** Arc angle (180 for half, 270 for 3/4, 360 for full) */
  arcAngle?: number;
  /** Gradient colors [start, end] */
  gradient?: [string, string];
}

