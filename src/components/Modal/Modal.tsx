import { FC, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn, resolveBearId, useBearId } from '@utils';
import { CloseIcon } from '../Icon/icons/navigation';
import { Backdrop } from '../Backdrop';
import type { ModalProps } from './Modal.types';
import {
  MODAL_SIZE_CLASSES,
  MODAL_CONTAINER_CLASSES,
  MODAL_HEADER_CLASSES,
  MODAL_TITLE_CLASSES,
  MODAL_CLOSE_CLASSES,
  MODAL_BODY_CLASSES,
  MODAL_FOOTER_CLASSES,
  MODAL_ROOT_CLASSES,
  MODAL_Z_INDEX,
  MODAL_PANEL_Z_INDEX,
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
    closeOnEscape = true,
    disableEscapeKeyDown = false,
    lockBodyScroll = true,
    cancelPreventScroll = false,
    closeOnBackdrop = true,
    hideBackdrop = false,
    keepMounted = false,
    isCancelBackgroundClick,
    zIndex = MODAL_Z_INDEX,
    className,
    footer,
    testId,
    id,
  } = props;

  const generatedId = useBearId('Modal');
  const domId = resolveBearId(id, generatedId);

  const shouldLockBodyScroll = lockBodyScroll && !cancelPreventScroll;
  const closeBackdropClick =
    isCancelBackgroundClick !== undefined ? isCancelBackgroundClick : closeOnBackdrop;
  const escapeEnabled = closeOnEscape && !disableEscapeKeyDown;

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (escapeEnabled && event.key === 'Escape') {
        onClose();
      }
    },
    [escapeEnabled, onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleEscape);
    if (shouldLockBodyScroll) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape, shouldLockBodyScroll]);

  if (!isOpen && !keepMounted) return null;

  const modalContent = (
    <div
      className={MODAL_ROOT_CLASSES}
      data-testid={testId}
      id={domId}
      style={{ zIndex }}
    >
      {!hideBackdrop && (
        <Backdrop
          open={isOpen}
          keepMounted={keepMounted}
          blur
          nested
          className="Bear-Modal__backdrop"
          onClick={closeBackdropClick ? () => onClose() : undefined}
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `${domId}-title` : undefined}
        className={cn(
          'Bear-Modal__container',
          MODAL_CONTAINER_CLASSES,
          MODAL_SIZE_CLASSES[size],
          className
        )}
        style={{ zIndex: MODAL_PANEL_Z_INDEX }}
      >
        {(title || showCloseButton) && (
          <div className={cn('Bear-Modal__header', MODAL_HEADER_CLASSES)}>
            {title && (
              <h2
                id={`${domId}-title`}
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
