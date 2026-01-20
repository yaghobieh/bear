import type { SVGAttributes, ReactNode } from 'react';
import type { BearSize } from '../../types';

export interface IconProps extends SVGAttributes<SVGElement> {
  /** Icon size */
  size?: BearSize | number;
  /** Icon color (CSS color value) */
  color?: string;
  /** Stroke width for stroke-based icons */
  strokeWidth?: number;
  /** Whether icon should spin */
  spin?: boolean;
  /** Test ID */
  testId?: string;
  /** The SVG path or children */
  children: ReactNode;
}

