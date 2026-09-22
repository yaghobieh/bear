import type { ReactNode } from 'react';
import type { OverlayMotionEffect, OverlayEffectConfig } from '@hooks/useFixedAnchorPosition';

export interface TooltipProps {
  testId?: string;
  id?: string;
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
  /** Transition effect when opening */
  openEffect?: OverlayMotionEffect;
  /** Transition effect when closing */
  closeEffect?: OverlayMotionEffect;
  /** Config for open and close transition effects */
  effect?: OverlayEffectConfig;
}
