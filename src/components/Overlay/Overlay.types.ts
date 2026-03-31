import type { ReactNode } from 'react';

export interface OverlayProps {
  /** Whether the overlay is visible */
  visible?: boolean;
  /** Overlay opacity (0–1) */
  opacity?: number;
  /** Background color */
  color?: string;
  /** Apply backdrop blur */
  blur?: number;
  /** z-index value */
  zIndex?: number;
  /** Fixed positioning (covers viewport) */
  fixed?: boolean;
  /** Content to render on top of the overlay */
  children?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Test ID */
  testId?: string;
}
