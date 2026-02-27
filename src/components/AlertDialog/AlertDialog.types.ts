import type { ReactNode } from 'react';
import type { BearVariant } from '../../types';

export interface AlertDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback when dialog should close (cancel/backdrop/escape) */
  onClose: () => void;
  /** Callback when confirm action is triggered */
  onConfirm: () => void;
  /** Dialog title */
  title: string;
  /** Dialog description / body text */
  description?: string | ReactNode;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Variant for the confirm button */
  confirmVariant?: BearVariant | (string & {});
  /** Whether confirm action is in progress */
  loading?: boolean;
  /** Loading text for confirm button */
  loadingText?: string;
  /** Whether clicking backdrop closes the dialog */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes the dialog */
  closeOnEscape?: boolean;
  /** Optional icon to show above the title */
  icon?: ReactNode;
  /** Additional class name */
  className?: string;
  /** Test ID */
  testId?: string;
}
