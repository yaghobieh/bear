import { FC, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import { XIcon } from '../Icon';
import type { DrawerProps } from './Drawer.types';

const DRAWER_ANIMATION_MS = 300;

const sizeClasses = {
  left: {
    sm: 'bear-w-64',
    md: 'bear-w-80',
    lg: 'bear-w-96',
    xl: 'bear-w-[32rem]',
  },
  right: {
    sm: 'bear-w-64',
    md: 'bear-w-80',
    lg: 'bear-w-96',
    xl: 'bear-w-[32rem]',
  },
  top: {
    sm: 'bear-h-32',
    md: 'bear-h-48',
    lg: 'bear-h-64',
    xl: 'bear-h-96',
  },
  bottom: {
    sm: 'bear-h-32',
    md: 'bear-h-48',
    lg: 'bear-h-64',
    xl: 'bear-h-96',
  },
};

const positionClasses = {
  left: 'bear-left-0 bear-top-0 bear-h-full',
  right: 'bear-right-0 bear-top-0 bear-h-full',
  top: 'bear-top-0 bear-left-0 bear-w-full',
  bottom: 'bear-bottom-0 bear-left-0 bear-w-full',
};

const transformOpen = {
  left: 'bear-translate-x-0',
  right: 'bear-translate-x-0',
  top: 'bear-translate-y-0',
  bottom: 'bear-translate-y-0',
};

const transformClosed = {
  left: '-bear-translate-x-full',
  right: 'bear-translate-x-full',
  top: '-bear-translate-y-full',
  bottom: 'bear-translate-y-full',
};

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
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
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMounted, handleEscape]);

  if (!isMounted) return null;

  const drawerContent = (
    <div className="bear-fixed bear-inset-0 bear-z-50">
      <div
        className={cn(
          'bear-absolute bear-inset-0 bear-bg-black/60 bear-backdrop-blur-sm bear-transition-opacity',
          isClosing ? 'bear-opacity-0' : 'bear-opacity-100'
        )}
        style={{ transitionDuration: `${DRAWER_ANIMATION_MS}ms` }}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        className={cn(
          'bear-absolute bear-bg-gray-900 bear-shadow-2xl',
          'bear-border-gray-700 bear-overflow-hidden',
          'bear-transform bear-transition-transform',
          side === 'left' && 'bear-border-r',
          side === 'right' && 'bear-border-l',
          side === 'top' && 'bear-border-b',
          side === 'bottom' && 'bear-border-t',
          positionClasses[side],
          sizeClasses[side][size],
          hasOpened && !isClosing ? transformOpen[side] : transformClosed[side],
          className
        )}
        style={{ transitionDuration: `${DRAWER_ANIMATION_MS}ms` }}
      >
        {(title || showCloseButton) && (
          <div className="bear-flex bear-items-center bear-justify-between bear-px-4 bear-py-3 bear-border-b bear-border-gray-700">
            {title && (
              <h2
                id="drawer-title"
                className="bear-text-lg bear-font-semibold bear-text-white"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="bear-p-1 bear-rounded-lg bear-text-gray-400 hover:bear-text-white hover:bear-bg-gray-700 bear-transition-colors"
                aria-label="Close drawer"
              >
                <XIcon className="bear-w-5 bear-h-5" />
              </button>
            )}
          </div>
        )}

        <div className="bear-flex-1 bear-overflow-y-auto bear-p-4 bear-text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};

