import type { EmberSize } from '../../types';

export interface SpinnerProps {
  /** Spinner size */
  size?: EmberSize;
  /** Additional class names */
  className?: string;
  /** Spinner color (CSS color value) */
  color?: string;
  /** Label for accessibility */
  label?: string;
}

