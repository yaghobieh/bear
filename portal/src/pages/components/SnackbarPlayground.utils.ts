import type { LiveProps } from '@/components/PropsControls/PropsControls.types';
import type {
  SnackbarAnchorHorizontal,
  SnackbarAnchorVertical,
  SnackbarPlaygroundProgressColor,
  SnackbarPlaygroundProgressPosition,
  SnackbarPlaygroundResolvedProps,
  SnackbarPlaygroundSize,
} from './SnackbarPlayground.types';

const SNACKBAR_SIZES: SnackbarPlaygroundSize[] = ['sm', 'md', 'lg'];
const SNACKBAR_VERTICALS: SnackbarAnchorVertical[] = ['top', 'bottom'];
const SNACKBAR_HORIZONTALS: SnackbarAnchorHorizontal[] = ['left', 'center', 'right'];
const SNACKBAR_PROGRESS_POSITIONS: SnackbarPlaygroundProgressPosition[] = ['top', 'bottom'];
const SNACKBAR_PROGRESS_COLORS: SnackbarPlaygroundProgressColor[] = [
  'default',
  'success',
  'warning',
  'danger',
  'info',
];

const pickEnum = <T extends string>(value: LiveProps[string], allowed: readonly T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback;

const toNumber = (value: LiveProps[string], fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toBoolean = (value: LiveProps[string], fallback = false): boolean =>
  value === true || value === 'true';

export const resolveSnackbarPlaygroundProps = (props: LiveProps): SnackbarPlaygroundResolvedProps => {
  const showProgress = toBoolean(props.showProgress);
  const countdownProgress = toBoolean(props.countdownProgress);

  return {
    message: String(props.message ?? 'Changes saved'),
    description: String(props.description ?? ''),
    size: pickEnum(props.size, SNACKBAR_SIZES, 'md'),
    anchorOrigin: {
      vertical: pickEnum(props.vertical, SNACKBAR_VERTICALS, 'bottom'),
      horizontal: pickEnum(props.horizontal, SNACKBAR_HORIZONTALS, 'center'),
    },
    offsetX: toNumber(props.offsetX, 24),
    offsetY: toNumber(props.offsetY, 24),
    progress: showProgress && !countdownProgress ? toNumber(props.progress, 65) : null,
    countdownProgress: showProgress && countdownProgress,
    progressPosition: pickEnum(props.progressPosition, SNACKBAR_PROGRESS_POSITIONS, 'bottom'),
    progressColor: pickEnum(props.progressColor, SNACKBAR_PROGRESS_COLORS, 'default'),
    autoHideDuration: toNumber(props.autoHideDuration, 6000),
    closeOnClickOutside: props.closeOnClickOutside === true || props.closeOnClickOutside === 'true',
    showCloseButton: props.showCloseButton !== false && props.showCloseButton !== 'false',
  };
};
