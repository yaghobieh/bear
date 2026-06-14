import type { LiveProps } from '@/components/PropsControls/PropsControls.types';

export type SnackbarAnchorVertical = 'top' | 'bottom';

export type SnackbarAnchorHorizontal = 'left' | 'center' | 'right';

export type SnackbarPlaygroundSize = 'sm' | 'md' | 'lg';

export type SnackbarPlaygroundProgressPosition = 'top' | 'bottom';

export type SnackbarPlaygroundProgressColor = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface SnackbarPlaygroundProps {
  props: LiveProps;
}

export interface SnackbarPlaygroundResolvedProps {
  message: string;
  description: string;
  size: SnackbarPlaygroundSize;
  anchorOrigin: {
    vertical: SnackbarAnchorVertical;
    horizontal: SnackbarAnchorHorizontal;
  };
  offsetX: number;
  offsetY: number;
  progress: number | null;
  countdownProgress: boolean;
  progressPosition: SnackbarPlaygroundProgressPosition;
  progressColor: SnackbarPlaygroundProgressColor;
  autoHideDuration: number;
  closeOnClickOutside: boolean;
  showCloseButton: boolean;
}
