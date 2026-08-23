import type { CSSProperties, ReactNode, Ref } from 'react';
import type { OverlayEffectProps } from '@hooks/useFixedAnchorPosition';

export interface OverlayPortalProps extends OverlayEffectProps {
  open: boolean;
  ready: boolean;
  style: CSSProperties;
  zIndex: number;
  className?: string;
  testId?: string;
  attributes?: Record<string, string>;
  panelRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}
