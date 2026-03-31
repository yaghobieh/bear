import type { BearSize } from '../../types';

export interface CloseButtonProps {
  /** Click handler */
  onClick?: () => void;
  /** Button size */
  size?: BearSize;
  /** Disabled state */
  disabled?: boolean;
  /** Accessible label */
  'aria-label'?: string;
  /** Additional class name */
  className?: string;
  /** Test ID */
  testId?: string;
}
