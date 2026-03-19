import type { SVGAttributes } from 'react';

export interface BearLogoProps extends SVGAttributes<SVGElement> {
  /** Logo size in pixels */
  size?: number;
  /** Whether to show animated sparkle */
  animated?: boolean;
}

export interface EmberLogoProps {
  /** Logo size in pixels */
  size?: number;
  /** Additional class names */
  className?: string;
  /** Whether to animate the logo */
  animated?: boolean;
}
