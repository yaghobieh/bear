import { FC, useEffect, useCallback, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import { Button } from '../Button';
import { Typography } from '../Typography';
import type { AlertDialogProps } from './AlertDialog.types';
import {
  ALERT_DIALOG_BACKDROP_CLASSES,
  ALERT_DIALOG_CONTAINER_CLASSES,
  ALERT_DIALOG_TITLE_CLASSES,
  ALERT_DIALOG_DESCRIPTION_CLASSES,
  ALERT_DIALOG_FOOTER_CLASSES,
} from './AlertDialog.const';

export const AlertDialog: FC<AlertDialogProps> = (props) => {
  const {
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmVariant = 'danger',
    loading = false,
    loadingText,
    closeOnBackdrop = false,
    closeOnEscape = true,
    icon,
    className,
    testId,
  } = props;

  const uid = useId();
  const titleId = `bear-alert-title-${uid}`;
  const descId = `bear-alert-desc-${uid}`;
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape' && !loading) {
        onClose();
      }
    },
    [closeOnEscape, onClose, loading],
  );

  // Focus trap: keep Tab within the dialog
  const handleTab = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTab);
      document.body.style.overflow = 'hidden';
      // Auto-focus the dialog container for screen readers
      requestAnimationFrame(() => dialogRef.current?.focus());
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, [isOpen, handleEscape, handleTab]);

  if (!isOpen) return null;

  const dialogContent = (
    <div
      className="Bear-AlertDialog bear-fixed bear-inset-0 bear-z-50 bear-flex bear-items-center bear-justify-center bear-p-4"
      data-testid={testId}
    >
      <div
        className={cn('Bear-AlertDialog__backdrop', ALERT_DIALOG_BACKDROP_CLASSES)}
        onClick={closeOnBackdrop && !loading ? onClose : undefined}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn('Bear-AlertDialog__container', ALERT_DIALOG_CONTAINER_CLASSES, 'bear-p-6', className)}
      >
        {icon && (
          <div className="Bear-AlertDialog__icon bear-mb-4 bear-flex bear-justify-center">
            {icon}
          </div>
        )}

        <Typography
          variant="h6"
          id={titleId}
          className={cn('Bear-AlertDialog__title', ALERT_DIALOG_TITLE_CLASSES, icon && 'bear-text-center')}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            id={descId}
            className={cn('Bear-AlertDialog__description', ALERT_DIALOG_DESCRIPTION_CLASSES, icon && 'bear-text-center')}
          >
            {description}
          </Typography>
        )}

        <div className={cn('Bear-AlertDialog__footer', ALERT_DIALOG_FOOTER_CLASSES)}>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            loading={loading}
            loadingText={loadingText}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

export default AlertDialog;
