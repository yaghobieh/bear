import type { ReactNode, RefObject } from 'react';
import type { BearSize } from '../../types';

export type SnackbarAnchorOriginVertical = 'top' | 'bottom';

export type SnackbarAnchorOriginHorizontal = 'left' | 'center' | 'right';

export type SnackbarProgressPosition = 'top' | 'bottom';

export type SnackbarSize = Extract<BearSize, 'sm' | 'md' | 'lg'>;

export type SnackbarProgressColor = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface SnackbarProps {
  open: boolean;
  message?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  autoHideDuration?: number | null;
  onClose?: () => void;
  anchorOrigin?: {
    vertical: SnackbarAnchorOriginVertical;
    horizontal: SnackbarAnchorOriginHorizontal;
  };
  offsetX?: number;
  offsetY?: number;
  size?: SnackbarSize;
  progress?: number | null;
  progressPosition?: SnackbarProgressPosition;
  progressColor?: SnackbarProgressColor;
  countdownProgress?: boolean;
  showCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  container?: Element | DocumentFragment | null;
  className?: string;
  id?: string;
  testId?: string;
}

export interface UseSnackbarOptions {
  open: boolean;
  autoHideDuration: number | null;
  onClose?: () => void;
  countdownProgress?: boolean;
  staticProgress?: number | null;
  closeOnClickOutside?: boolean;
}

export interface UseSnackbarResult {
  surfaceRef: RefObject<HTMLDivElement>;
  progressValue: number | null;
}
