import type { ReactNode } from 'react';

export interface ResizablePanelProps {
  /** First pane content */
  first: ReactNode;
  /** Second pane content */
  second: ReactNode;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Default size of first pane (0–100, percentage) */
  defaultSize?: number;
  /** Minimum size of first pane (percentage) */
  minSize?: number;
  /** Maximum size of first pane (percentage) */
  maxSize?: number;
  /** Called when resize ends with new size (0–100) */
  onResize?: (size: number) => void;
  /** Class name for the root container */
  className?: string;
  /** Test ID */
  testId?: string;
}
