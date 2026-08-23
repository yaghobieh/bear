import type { CSSProperties, RefObject } from 'react';

export type OverlayOpenEffect = 'none' | 'fade' | 'slide-down' | 'scale';

export type OverlayPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'bottom'
  | 'top-start'
  | 'top-end'
  | 'top';

export interface OverlayCoords {
  top: number;
  left: number;
  width?: number;
  minWidth?: number;
}

export interface UseFixedAnchorPositionOptions {
  anchorRef: RefObject<HTMLElement | null>;
  open: boolean;
  offsetPx?: number;
  edgePadPx?: number;
  estimatedHeightPx?: number;
  placement?: OverlayPlacement;
  matchWidth?: boolean;
  minWidthPx?: number;
}

export interface UseFixedAnchorPositionReturn {
  coords: OverlayCoords;
  ready: boolean;
  style: CSSProperties;
}
