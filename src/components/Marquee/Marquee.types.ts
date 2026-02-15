import type { ReactNode } from 'react';

export type MarqueeDirection = 'left' | 'right' | 'up' | 'down';

export interface MarqueeProps {
  /** Content to scroll */
  children: ReactNode;
  /** Scroll direction */
  direction?: MarqueeDirection;
  /** Speed in pixels per second */
  speed?: number;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Pause on click */
  pauseOnClick?: boolean;
  /** Whether the marquee is playing */
  play?: boolean;
  /** Number of times to loop (0 = infinite) */
  loop?: number;
  /** Gradient fade on edges */
  gradient?: boolean;
  /** Gradient color (auto-detects dark/light) */
  gradientColor?: string;
  /** Gradient width in pixels */
  gradientWidth?: number;
  /** Gap between repeated items */
  gap?: number;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Test ID */
  testId?: string;
}
