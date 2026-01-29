import { FC, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import { CloseIcon } from '../Icon/icons/navigation';
import type { ModalProps } from './Modal.types';
import {
  MODAL_SIZE_CLASSES,
  MODAL_BACKDROP_CLASSES,
  MODAL_CONTAINER_CLASSES,
  MODAL_HEADER_CLASSES,
  MODAL_TITLE_CLASSES,
  MODAL_CLOSE_CLASSES,
  MODAL_BODY_CLASSES,
  MODAL_FOOTER_CLASSES,
} from './Modal.const';

/**
 * Modal - Dialog component for displaying content on top of the main UI
 * 
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={handleClose} title="Modal Title">
 *   Modal content goes here
 * </Modal>
 * ```
 */
export const Modal: FC<ModalProps> = (props) => {
  const {
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
    testId,
    id,
  } = props;

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
    <div 
      className="Bear-Modal bear-fixed bear-inset-0 bear-z-50 bear-flex bear-items-center bear-justify-center"
      id={id}
      data-testid={testId}
    >
      <div
        className={cn('Bear-Modal__backdrop', MODAL_BACKDROP_CLASSES)}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={cn(
          'Bear-Modal__container',
          MODAL_CONTAINER_CLASSES,
          MODAL_SIZE_CLASSES[size],
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className={cn('Bear-Modal__header', MODAL_HEADER_CLASSES)}>
            {title && (
              <h2
                id="modal-title"
                className={cn('Bear-Modal__title', MODAL_TITLE_CLASSES)}
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn('Bear-Modal__close', MODAL_CLOSE_CLASSES)}
                aria-label="Close modal"
              >
                <CloseIcon className="bear-w-5 bear-h-5" />
              </button>
            )}
          </div>
        )}

        <div className={cn('Bear-Modal__body', MODAL_BODY_CLASSES)}>
          {children}
        </div>

        {footer && (
          <div className={cn('Bear-Modal__footer', MODAL_FOOTER_CLASSES)}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
