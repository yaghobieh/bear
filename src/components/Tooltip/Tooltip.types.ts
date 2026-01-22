import type { ReactNode } from 'react';

export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;
  /** Trigger element */
  children: ReactNode;
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Alias for position */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (ms) */
  delay?: number;
  /** Additional class names */
  className?: string;
  /** Whether tooltip is disabled */
  disabled?: boolean;
}

