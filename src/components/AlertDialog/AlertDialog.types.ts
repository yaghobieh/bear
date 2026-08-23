import type { ReactNode } from 'react';
import type { BearVariant } from '@types';

export interface AlertDialogProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: BearVariant | (string & {});
  loading?: boolean;
  loadingText?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  icon?: ReactNode;
  className?: string;
  testId?: string;
}
