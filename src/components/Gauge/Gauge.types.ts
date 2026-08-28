import { HTMLAttributes, ReactNode } from 'react';

export interface GaugeProps extends HTMLAttributes<HTMLDivElement> {
  testId?: string;
  id?: string;
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
  /** Fill transition duration in ms when animated */
  fillDurationMs?: number;
  arcAngle?: number;
  variant?: 'arc' | 'linear' | 'ring';
  gradient?: [string, string];
}

export interface GaugeLinearBarProps {
  percentage: number;
  color: string;
  trackColor?: string;
  gradient?: [string, string];
  animated: boolean;
  fillDurationMs: number;
  showLabel: boolean;
  label?: ReactNode;
}

