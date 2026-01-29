import { HTMLAttributes, ReactNode } from 'react';

export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right';
export type SpeedDialSize = 'sm' | 'md' | 'lg';

export interface SpeedDialAction {
  /** Action label (shown as tooltip) */
  label: string;
  /** Action icon */
  icon: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Custom color */
  color?: string;
  /** Tooltip position */
  tooltipPosition?: 'left' | 'right' | 'top' | 'bottom';
}

export interface SpeedDialProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Array of actions */
  actions: SpeedDialAction[];
  /** Main button icon (when closed) */
  icon?: ReactNode;
  /** Main button icon (when open) */
  openIcon?: ReactNode;
  /** Direction to expand */
  direction?: SpeedDialDirection;
  /** Size */
  size?: SpeedDialSize;
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Whether to use fixed positioning */
  fixed?: boolean;
  /** Open on hover */
  openOnHover?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Show labels next to actions */
  showLabels?: boolean;
  /** Hide main button label */
  ariaLabel?: string;
  /** Test ID */
  testId?: string;
}
