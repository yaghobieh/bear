import { FC, useEffect, useCallback } from 'react';
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

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape' && !loading) {
        onClose();
      }
    },
    [closeOnEscape, onClose, loading]
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
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-dialog-title"
        aria-describedby={description ? 'alert-dialog-description' : undefined}
        className={cn('Bear-AlertDialog__container', ALERT_DIALOG_CONTAINER_CLASSES, 'bear-p-6', className)}
      >
        {icon && (
          <div className="Bear-AlertDialog__icon bear-mb-4 bear-flex bear-justify-center">
            {icon}
          </div>
        )}

        <Typography
          variant="h6"
          id="alert-dialog-title"
          className={cn('Bear-AlertDialog__title', ALERT_DIALOG_TITLE_CLASSES, icon && 'bear-text-center')}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            id="alert-dialog-description"
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
