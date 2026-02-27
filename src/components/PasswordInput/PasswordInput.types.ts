import type { ReactNode } from 'react';
import type { InputProps } from '../Input/Input.types';

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightAddon'> {
  /** Whether password is currently visible */
  visible?: boolean;
  /** Controlled visibility toggle */
  onVisibilityChange?: (visible: boolean) => void;
  /** Hide the toggle button entirely */
  hideToggle?: boolean;
  /** Aria label for the toggle button */
  toggleAriaLabel?: string;
  /** Show Caps Lock / Shift indicator when active */
  showShiftIndicator?: boolean;
  /** Custom icon for "visible" state (replaces default VisibilityOffIcon) */
  visibleIcon?: ReactNode;
  /** Custom icon for "hidden" state (replaces default VisibilityIcon) */
  hiddenIcon?: ReactNode;
}
