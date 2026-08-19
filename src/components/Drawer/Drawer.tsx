import { FC, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBearDirectionOptional } from '@context/BearProvider';
import { cn, resolveBearId, useBearId } from '@utils';
import { XIcon } from '../Icon';
import { Backdrop } from '../Backdrop';
import type { DrawerProps } from './Drawer.types';
import {
  DRAWER_ANIMATION_MS,
  DRAWER_BACKDROP_Z_INDEX,
  DRAWER_ROOT_CLASSES,
  DRAWER_PANEL_Z_CLASS,
  SIZE_CLASSES,
  POSITION_CLASSES,
  TRANSFORM_OPEN,
  TRANSFORM_CLOSED,
  BORDER_SIDE_MAP,
} from './Drawer.const';
import { lockBodyScroll } from './Drawer.utils';

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  anchor,
  variant: _variant = 'temporary',
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className,
  container,
  id,
  testId,
}) => {
  const generatedId = useBearId('Drawer');
  const domId = resolveBearId(id, generatedId);
  const { direction } = useBearDirectionOptional();
  const rawSide = anchor ?? side;
  const resolvedSide =
    direction === 'rtl' && (rawSide === 'left' || rawSide === 'right')
      ? rawSide === 'left'
        ? 'right'
        : 'left'
      : rawSide;

  const [isMounted, setIsMounted] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
      const t = requestAnimationFrame(() => setHasOpened(true));
      return () => cancelAnimationFrame(t);
    }
    if (isMounted) {
      setHasOpened(false);
      setIsClosing(true);
      const t = setTimeout(() => {
        setIsMounted(false);
        setIsClosing(false);
      }, DRAWER_ANIMATION_MS);
      return () => clearTimeout(t);
    }
  }, [isOpen, isMounted]);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isMounted) {
      document.addEventListener('keydown', handleEscape);
      const unlock = lockBodyScroll();
      return () => {
        document.removeEventListener('keydown', handleEscape);
        unlock();
      };
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMounted, handleEscape]);

  if (!isMounted) return null;

  const drawerContent = (
    <div id={domId} data-testid={testId} className={DRAWER_ROOT_CLASSES}>
      <Backdrop
        open={hasOpened && !isClosing}
        keepMounted
        blur
        zIndex={DRAWER_BACKDROP_Z_INDEX}
        transitionDuration={DRAWER_ANIMATION_MS}
        className="Bear-Drawer__backdrop"
        onClick={closeOnBackdrop ? () => onClose() : undefined}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `${domId}-title` : undefined}
        className={cn(
          'Bear-Drawer__panel',
          DRAWER_PANEL_Z_CLASS,
          'bear-absolute bear-bg-white dark:bear-bg-neutral-900 bear-shadow-2xl',
          'bear-border-neutral-200 dark:bear-border-neutral-700',
          'bear-flex bear-flex-col bear-overflow-hidden',
          'bear-transform bear-transition-transform',
          BORDER_SIDE_MAP[resolvedSide],
          POSITION_CLASSES[resolvedSide],
          SIZE_CLASSES[resolvedSide][size],
          hasOpened && !isClosing ? TRANSFORM_OPEN[resolvedSide] : TRANSFORM_CLOSED[resolvedSide],
          className
        )}
        style={{ transitionDuration: `${DRAWER_ANIMATION_MS}ms` }}
      >
        {(title || showCloseButton) && (
          <div className="bear-flex bear-items-center bear-justify-between bear-px-4 bear-py-3 bear-border-b bear-border-neutral-200 dark:bear-border-neutral-700 bear-shrink-0" dir={direction}>
            {title && (
              <h2
                id={`${domId}-title`}
                className="bear-text-lg bear-font-semibold bear-text-neutral-900 dark:bear-text-white"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="bear-p-1 bear-rounded-lg bear-text-neutral-500 dark:bear-text-neutral-400 hover:bear-text-neutral-900 dark:hover:bear-text-white hover:bear-bg-neutral-100 dark:hover:bear-bg-neutral-700 bear-transition-colors"
                aria-label="Close drawer"
              >
                <XIcon className="bear-w-5 bear-h-5" />
              </button>
            )}
          </div>
        )}

        <div className="bear-flex-1 bear-min-h-0 bear-overflow-y-auto bear-overscroll-contain bear-p-4 bear-text-neutral-700 dark:bear-text-neutral-300">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, container ?? document.body);
};
