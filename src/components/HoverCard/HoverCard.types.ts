import { HTMLAttributes, ReactNode } from 'react';
import type { OverlayMotionEffect, OverlayEffectConfig } from '@hooks/useFixedAnchorPosition';

export interface HoverCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  testId?: string;
  id?: string;
  children: ReactNode;
  cardContent: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  openDelay?: number;
  closeDelay?: number;
  arrow?: boolean;
  /** Transition effect when opening */
  openEffect?: OverlayMotionEffect;
  /** Transition effect when closing */
  closeEffect?: OverlayMotionEffect;
  /** Config for open and close transition effects */
  effect?: OverlayEffectConfig;
}

export interface HoverCardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
