import { createPortal } from 'react-dom';
import { cn, resolveBearId, useBearId } from '@utils';
import { Paper } from '../Paper';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { Progress } from '../Progress';
import { CloseButton } from '../CloseButton';
import type { SnackbarProps } from './Snackbar.types';
import {
  SNACKBAR_BACKDROP_Z_INDEX,
  SNACKBAR_DEFAULT_AUTO_HIDE_MS,
  SNACKBAR_DEFAULT_OFFSET_X,
  SNACKBAR_DEFAULT_OFFSET_Y,
  SNACKBAR_ROOT_CLASS,
  SNACKBAR_SIZE_PADDING,
  SNACKBAR_SURFACE_CLASSES,
  SNACKBAR_Z_INDEX,
} from './Snackbar.const';
import { useSnackbar } from './hooks/useSnackbar';

const getAnchorStyle = (
  vertical: 'top' | 'bottom',
  horizontal: 'left' | 'center' | 'right',
  offsetX: number,
  offsetY: number
): React.CSSProperties => {
  const style: React.CSSProperties = { zIndex: SNACKBAR_Z_INDEX };

  if (vertical === 'top') {
    style.top = offsetY;
  } else {
    style.bottom = offsetY;
  }

  if (horizontal === 'left') {
    style.left = offsetX;
    style.right = 'auto';
  } else if (horizontal === 'right') {
    style.right = offsetX;
    style.left = 'auto';
  } else {
    style.left = '50%';
    style.right = 'auto';
    style.transform = 'translateX(-50%)';
  }

  return style;
};

export const Snackbar = (props: SnackbarProps) => {
  const {
    open,
    message,
    description,
    action,
    autoHideDuration = SNACKBAR_DEFAULT_AUTO_HIDE_MS,
    onClose,
    anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
    offsetX = SNACKBAR_DEFAULT_OFFSET_X,
    offsetY = SNACKBAR_DEFAULT_OFFSET_Y,
    size = 'md',
    progress = null,
    progressPosition = 'bottom',
    progressColor = 'default',
    countdownProgress = false,
    showCloseButton,
    closeOnClickOutside,
    container,
    id,
    testId,
    className,
  } = props;

  const generatedId = useBearId('Snackbar');
  const domId = resolveBearId(id, generatedId);
  const mountNode = container ?? (typeof document !== 'undefined' ? document.body : null);

  const canDismiss = Boolean(onClose);
  const shouldShowClose = showCloseButton ?? canDismiss;
  const shouldCloseOnOutside = closeOnClickOutside ?? canDismiss;

  const { surfaceRef, progressValue } = useSnackbar({
    open,
    autoHideDuration,
    onClose,
    countdownProgress,
    staticProgress: progress,
    closeOnClickOutside: shouldCloseOnOutside,
  });

  if (!open || !mountNode) {
    return null;
  }

  const showProgress = typeof progressValue === 'number';
  const progressBar = showProgress ? (
    <Progress
      value={progressValue}
      size="sm"
      color={progressColor}
      className="Bear-Snackbar__progress"
    />
  ) : null;

  const content = (
    <>
      {shouldCloseOnOutside && canDismiss && (
        <div
          className="Bear-Snackbar__backdrop bear-fixed bear-inset-0"
          style={{ zIndex: SNACKBAR_BACKDROP_Z_INDEX }}
          aria-hidden
        />
      )}
      <Paper
        ref={surfaceRef}
        id={domId}
        data-testid={testId}
        role="status"
        aria-live="polite"
        elevation={4}
        rounded="lg"
        padding="none"
        background="transparent"
        className={cn(
          SNACKBAR_ROOT_CLASS,
          SNACKBAR_SURFACE_CLASSES,
          'bear-fixed bear-flex bear-flex-col bear-overflow-hidden',
          'bear-border bear-border-[var(--bear-border-default)]',
          SNACKBAR_SIZE_PADDING[size],
          className
        )}
        style={getAnchorStyle(anchorOrigin.vertical, anchorOrigin.horizontal, offsetX, offsetY)}
      >
        {showProgress && progressPosition === 'top' && progressBar}
        <Flex className="Bear-Snackbar__content bear-w-full" align="center" gap={3}>
          <Flex direction="column" className="Bear-Snackbar__text bear-flex-1 bear-min-w-0" gap={1}>
            {message && (
              <Typography variant="body2" className="Bear-Snackbar__message">
                {message}
              </Typography>
            )}
            {description && (
              <Typography variant="caption" color="muted" className="Bear-Snackbar__description">
                {description}
              </Typography>
            )}
          </Flex>
          {action && (
            <Flex className="Bear-Snackbar__action bear-shrink-0" align="center">
              {action}
            </Flex>
          )}
          {shouldShowClose && canDismiss && (
            <CloseButton
              size="sm"
              onClick={onClose}
              aria-label="Dismiss notification"
              className="Bear-Snackbar__close bear-shrink-0"
            />
          )}
        </Flex>
        {showProgress && progressPosition === 'bottom' && progressBar}
      </Paper>
    </>
  );

  return createPortal(content, mountNode);
};
