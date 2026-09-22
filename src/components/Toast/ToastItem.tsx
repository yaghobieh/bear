import { FC, useState, useEffect, useRef } from 'react';
import type { ToastProps } from './Toast.types';
import {
  T_O_A_S_T_ROOT_CLASS,
  TOAST_EXIT_MS,
  TOAST_ITEM_CLASSES,
  TOAST_SEVERITY_MODIFIER,
  TOAST_DEFAULT_DURATION,
  COMPONENT_NAME_TOAST,
} from './Toast.const';
import { ToastIcons, CloseIcon } from './Toast.icons';
import { cn, resolveBearId, useBearId, getBearLiveRegionProps } from '@utils';
import { ZERO } from '@constants';

export const ToastItem: FC<ToastProps & { onRemove: () => void }> = ({
  id,
  testId,
  message,
  title,
  severity = 'info',
  duration = TOAST_DEFAULT_DURATION,
  closable = true,
  icon,
  action,
  onClose,
  onRemove,
  className,
  autoScroll = false,
  pauseOnHover = false,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const remainingRef = useRef(duration);
  const startedAtRef = useRef(ZERO);
  const generatedId = useBearId(COMPONENT_NAME_TOAST);
  const domId = resolveBearId(id, generatedId);

  useEffect(() => {
    if (autoScroll && rootRef.current) {
      rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [autoScroll]);

  useEffect(() => {
    if (duration <= ZERO || isPaused) return;
    startedAtRef.current = Date.now();
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onRemove();
        onClose?.();
      }, TOAST_EXIT_MS);
    }, remainingRef.current);
    return () => {
      clearTimeout(timer);
      remainingRef.current = Math.max(ZERO, remainingRef.current - (Date.now() - startedAtRef.current));
    };
  }, [duration, isPaused, onRemove, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove();
      onClose?.();
    }, TOAST_EXIT_MS);
  };

  const renderIcon = () => {
    if (icon === false) return null;
    if (icon) return icon;
    return ToastIcons[severity];
  };

  const liveRegionProps = getBearLiveRegionProps(severity);

  return (
    <div
      ref={rootRef}
      id={domId}
      data-testid={testId}
      {...liveRegionProps}
      aria-atomic="true"
      onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
      className={cn(
        T_O_A_S_T_ROOT_CLASS,
        TOAST_ITEM_CLASSES,
        isExiting ? 'bear-opacity-0 bear-translate-x-2' : 'bear-opacity-100 bear-translate-x-0',
        TOAST_SEVERITY_MODIFIER[severity],
        className
      )}
    >
      {renderIcon() && (
        <span className="bear-flex-shrink-0 bear-mt-0.5">
          {renderIcon()}
        </span>
      )}
      
      <div className="bear-flex-1 bear-min-w-0">
        {title && (
          <div className="bear-font-semibold bear-mb-0.5">
            {title}
          </div>
        )}
        <div className="bear-text-sm bear-opacity-90">
          {message}
        </div>
      </div>

      {action && (
        <div className="bear-flex-shrink-0">
          {action}
        </div>
      )}

      {closable && (
        <button
          type="button"
          onClick={handleClose}
          className="bear-flex-shrink-0 bear-p-1 bear-rounded hover:bear-bg-black/10 dark:hover:bear-bg-white/20 bear-transition-colors bear-bg-transparent bear-border-none bear-cursor-pointer"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};
