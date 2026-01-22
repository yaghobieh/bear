/**
 * SpeedDial Component Types
 */
import type { HTMLAttributes, ReactNode } from 'react';
import type { BearSize, BearVariant } from '../../types';

export interface SpeedDialAction {
  /** Unique key for the action */
  key: string;
  /** Action icon */
  icon: ReactNode;
  /** Action tooltip/label */
  label: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether action is disabled */
  disabled?: boolean;
}

export interface SpeedDialProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Array of actions to display */
  actions: SpeedDialAction[];
  /** Main FAB icon (when closed) */
  icon?: ReactNode;
  /** Main FAB icon when open */
  openIcon?: ReactNode;
  /** Whether SpeedDial is open */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Direction to expand actions */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** FAB variant */
  variant?: BearVariant;
  /** FAB size */
  size?: BearSize;
  /** Whether to show tooltips */
  showTooltips?: boolean;
  /** Tooltip placement relative to direction */
  tooltipPlacement?: 'left' | 'right' | 'top' | 'bottom' | 'auto';
  /** Whether to hide on click action */
  closeOnAction?: boolean;
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Fixed position */
  fixed?: boolean;
  /** ARIA label */
  ariaLabel?: string;
  /** Open/close handler */
  onOpenChange?: (open: boolean) => void;
  /** Test ID */
  testId?: string;
}

