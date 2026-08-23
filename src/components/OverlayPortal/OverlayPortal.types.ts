import type { CSSProperties, ReactNode, Ref } from 'react';
import type { OverlayOpenEffect } from '../../hooks/useFixedAnchorPosition';

export interface OverlayPortalProps {
  open: boolean;
  ready: boolean;
  style: CSSProperties;
  zIndex: number;
  openEffect?: OverlayOpenEffect;
  className?: string;
  testId?: string;
  attributes?: Record<string, string>;
  panelRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}
