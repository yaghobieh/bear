import type { ReactNode } from 'react';

export type PopconfirmPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopconfirmProps {
  title: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  icon?: ReactNode;
  placement?: PopconfirmPlacement;
  disabled?: boolean;
  children: ReactNode;
  variant?: 'default' | 'danger';
  testId?: string;
}
