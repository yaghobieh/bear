import type { RefObject, CSSProperties } from 'react';

export interface UseSpotlightOptions {
  /** Size of the spotlight in pixels */
  size?: number;
  /** Color of the spotlight (with alpha) */
  color?: string;
  /** Whether spotlight is enabled */
  enabled?: boolean;
}

export interface UseSpotlightReturn {
  /** Ref to attach to the element */
  ref: RefObject<HTMLElement | null>;
  /** Style object for the spotlight overlay */
  spotlightStyle: CSSProperties;
  /** Whether mouse is currently over the element */
  isHovered: boolean;
  /** Event handlers to attach */
  handlers: {
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}
