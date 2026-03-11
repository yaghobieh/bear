import { FC } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import { Spinner } from '../Spinner';
import type { LoadingOverlayProps } from './LoadingOverlay.types';
import {
  DEFAULT_OVERLAY_OPACITY,
  DEFAULT_OVERLAY_BLUR,
  DEFAULT_Z_INDEX,
  ROOT_CLASS,
  OVERLAY_CLASS,
  LABEL_CLASS,
} from './LoadingOverlay.const';

const SPINNER_SIZE_MAP = { sm: 'sm' as const, md: 'md' as const, lg: 'lg' as const };

export const LoadingOverlay: FC<LoadingOverlayProps> = ({
  visible,
  loader,
  overlayOpacity = DEFAULT_OVERLAY_OPACITY,
  overlayBlur = DEFAULT_OVERLAY_BLUR,
  zIndex = DEFAULT_Z_INDEX,
  loaderSize = 'md',
  label,
  children,
  className,
  testId,
  ...rest
}) => {
  return (
    <div className={cn(ROOT_CLASS, className)} data-testid={testId} {...rest}>
      {children}
      {visible && (
        <div
          className={OVERLAY_CLASS}
          style={{
            opacity: overlayOpacity,
            backdropFilter: `blur(${overlayBlur}px)`,
            WebkitBackdropFilter: `blur(${overlayBlur}px)`,
            zIndex,
          }}
          aria-busy
          aria-live="polite"
        >
          {loader ?? (
            <Spinner size={SPINNER_SIZE_MAP[loaderSize]} className="bear-text-pink-500 dark:bear-text-pink-400" />
          )}
          {label && (
            <Typography variant="body2" color="secondary" className={LABEL_CLASS}>
              {label}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default LoadingOverlay;
