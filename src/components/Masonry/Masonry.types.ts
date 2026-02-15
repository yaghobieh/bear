import type { ReactNode } from 'react';

export interface MasonryProps {
  /** Items to render in masonry layout */
  children: ReactNode;
  /** Number of columns */
  columns?: number | { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
  /** Gap between items in pixels */
  gap?: number;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Test ID */
  testId?: string;
}
