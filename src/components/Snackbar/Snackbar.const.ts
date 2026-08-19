import type { SnackbarSeverity } from './Snackbar.types';
import type { TypographyProps } from '../Typography/Typography.types';

export const SNACKBAR_ROOT_CLASS = 'Bear-Snackbar';

export const SNACKBAR_DEFAULT_AUTO_HIDE_MS = 6000;

export const SNACKBAR_DEFAULT_OFFSET_X = 24;

export const SNACKBAR_DEFAULT_OFFSET_Y = 24;

export const SNACKBAR_Z_INDEX = 1400;

export const SNACKBAR_BACKDROP_Z_INDEX = 1399;

export const SNACKBAR_ENTER_MS = 200;

export const SNACKBAR_EXIT_MS = 150;

export const SNACKBAR_SIZE_PADDING: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'bear-px-3 bear-py-2',
  md: 'bear-px-4 bear-py-3',
  lg: 'bear-px-5 bear-py-4',
};

export const SNACKBAR_PAPER_BACKGROUND = 'default';

export const SNACKBAR_SURFACE_CLASSES = 'bear-shadow-xl';

export const SNACKBAR_BORDER_CLASSES = 'bear-border';

export const SNACKBAR_SEVERITY_MODIFIER: Record<SnackbarSeverity, string> = {
  default: `${SNACKBAR_ROOT_CLASS}--default`,
  success: `${SNACKBAR_ROOT_CLASS}--success`,
  info: `${SNACKBAR_ROOT_CLASS}--info`,
  warning: `${SNACKBAR_ROOT_CLASS}--warning`,
  error: `${SNACKBAR_ROOT_CLASS}--error`,
};

export const SNACKBAR_DESCRIPTION_COLOR: NonNullable<TypographyProps['color']> = 'secondary';

export const SNACKBAR_COUNTDOWN_TICK_MS = 50;

export const SNACKBAR_PROGRESS_MAX = 100;

export const SNACKBAR_PROGRESS_MIN = 0;
