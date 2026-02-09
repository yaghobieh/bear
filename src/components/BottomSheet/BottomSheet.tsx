import { FC, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import { XIcon } from '../Icon';
import type { BottomSheetProps } from './BottomSheet.types';

const ANIMATION_MS = 300;

const sizeClasses = {
  sm: 'bear-max-h-[40%]',
  md: 'bear-max-h-[60%]',
  lg: 'bear-max-h-[80%]',
  full: 'bear-max-h-[95%]',
};

export const BottomSheet: FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showHandle = true,
  className,
}) => {
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
      }, ANIMATION_MS);
      return () => clearTimeout(t);
    }
  }, [isOpen, isMounted]);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') onClose();
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isMounted) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMounted, handleEscape]);

  if (!isMounted) return null;

  const content = (
    <div className="bear-fixed bear-inset-0 bear-z-50 bear-flex bear-items-end bear-justify-center">
      <div
        className={cn(
          'bear-absolute bear-inset-0 bear-bg-black/60 bear-backdrop-blur-sm bear-transition-opacity',
          isClosing ? 'bear-opacity-0' : 'bear-opacity-100'
        )}
        style={{ transitionDuration: `${ANIMATION_MS}ms` }}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
        className={cn(
          'Bear-BottomSheet bear-relative bear-w-full bear-rounded-t-2xl bear-shadow-2xl bear-overflow-hidden bear-transition-transform bear-duration-300',
          'bear-bg-white dark:bear-bg-neutral-900 bear-border-t bear-border-neutral-200 dark:bear-border-neutral-700',
          sizeClasses[size],
          hasOpened && !isClosing ? 'bear-translate-y-0' : 'bear-translate-y-full',
          className
        )}
      >
        {showHandle && (
          <div className="bear-flex bear-justify-center bear-pt-2 bear-pb-1">
            <div className="bear-w-12 bear-h-1 bear-rounded-full bear-bg-neutral-300 dark:bear-bg-neutral-600" aria-hidden />
          </div>
        )}

        {(title || showCloseButton) && (
          <div className="bear-flex bear-items-center bear-justify-between bear-px-4 bear-py-3 bear-border-b bear-border-neutral-200 dark:bear-border-neutral-700">
            {title && (
              <h2
                id="bottom-sheet-title"
                className="bear-text-lg bear-font-semibold bear-text-neutral-900 dark:bear-text-white"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="bear-p-1 bear-rounded-lg bear-text-neutral-500 dark:bear-text-neutral-400 hover:bear-text-neutral-900 dark:hover:bear-text-white hover:bear-bg-neutral-100 dark:hover:bear-bg-neutral-700 bear-transition-colors"
                aria-label="Close"
              >
                <XIcon className="bear-w-5 bear-h-5" />
              </button>
            )}
          </div>
        )}

        <div className="bear-flex-1 bear-overflow-y-auto bear-p-4 bear-text-neutral-700 dark:bear-text-neutral-300">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
