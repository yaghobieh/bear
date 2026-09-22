import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ALERT_DESC_ID_PREFIX,
  ALERT_TITLE_ID_PREFIX,
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  LABEL_CANCEL,
  LABEL_CONFIRM,
  VARIANT_DANGER,
} from '@const';
import { cn } from '@utils';
import { useFocusTrap } from '@hooks/useFocusTrap';
import { Button } from '../Button';
import { Typography } from '../Typography';
import type { AlertDialogProps } from './AlertDialog.types';

export const AlertDialog = (props: AlertDialogProps) => {
  const {
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = LABEL_CONFIRM,
    cancelText = LABEL_CANCEL,
    confirmVariant = VARIANT_DANGER,
    loading = BOOLEAN_FALSE,
    loadingText,
    closeOnBackdrop = BOOLEAN_FALSE,
    closeOnEscape = BOOLEAN_TRUE,
    icon,
    className,
    testId,
  } = props;

  const uid = useId();
  const titleId = `${ALERT_TITLE_ID_PREFIX}${uid}`;
  const descId = `${ALERT_DESC_ID_PREFIX}${uid}`;
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, {
    enabled: isOpen,
    onEscape: closeOnEscape && !loading ? onClose : undefined,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const dialogContent = (
    <div
      className="Bear-AlertDialog bear-fixed bear-inset-0 bear-z-50 bear-flex bear-items-center bear-justify-center bear-p-4"
      data-testid={testId}
    >
      <div
        className="Bear-AlertDialog__backdrop bear-absolute bear-inset-0 bear-bg-black/60 bear-backdrop-blur-sm bear-transition-opacity animate-fade-in"
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
        className={cn(
          'Bear-AlertDialog__container bear-relative bear-w-full bear-max-w-md bear-bg-white dark:bear-bg-zinc-900 bear-rounded-xl bear-shadow-2xl bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-transform bear-transition-all animate-alert-dialog-in bear-p-6',
          className
        )}
      >
        {icon && (
          <div className="Bear-AlertDialog__icon bear-mb-4 bear-flex bear-justify-center">
            {icon}
          </div>
        )}

        <Typography
          variant="h6"
          id={titleId}
          className={cn('Bear-AlertDialog__title bear-text-lg bear-font-semibold bear-text-gray-900 dark:bear-text-white', icon && 'bear-text-center')}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            id={descId}
            className={cn('Bear-AlertDialog__description bear-text-sm bear-text-gray-600 dark:bear-text-gray-400 bear-mt-2', icon && 'bear-text-center')}
          >
            {description}
          </Typography>
        )}

        <div className="Bear-AlertDialog__footer bear-flex bear-items-center bear-justify-end bear-gap-3 bear-pt-6">
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
