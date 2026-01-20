import { FC, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { XIcon } from '../Icon';
import type { ModalProps } from './Modal.types';

const sizeClasses = {
  sm: 'bear-max-w-sm',
  md: 'bear-max-w-md',
  lg: 'bear-max-w-lg',
  xl: 'bear-max-w-xl',
  full: 'bear-max-w-full bear-mx-4',
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className,
  footer,
}) => {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="bear-fixed bear-inset-0 bear-z-50 bear-flex bear-items-center bear-justify-center">
      {/* Backdrop */}
      <div
        className="bear-absolute bear-inset-0 bear-bg-black/60 bear-backdrop-blur-sm bear-transition-opacity"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={cn(
          'bear-relative bear-w-full bear-bg-gray-900 bear-rounded-xl bear-shadow-2xl',
          'bear-border bear-border-gray-700',
          'bear-transform bear-transition-all',
          'bear-animate-in bear-fade-in bear-zoom-in-95',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="bear-flex bear-items-center bear-justify-between bear-px-6 bear-py-4 bear-border-b bear-border-gray-700">
            {title && (
              <h2
                id="modal-title"
                className="bear-text-lg bear-font-semibold bear-text-white"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="bear-p-1 bear-rounded-lg bear-text-gray-400 hover:bear-text-white hover:bear-bg-gray-700 bear-transition-colors"
                aria-label="Close modal"
              >
                <XIcon className="bear-w-5 bear-h-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="bear-px-6 bear-py-4 bear-text-gray-300">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="bear-flex bear-items-center bear-justify-end bear-gap-3 bear-px-6 bear-py-4 bear-border-t bear-border-gray-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

