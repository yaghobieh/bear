import type { ReactNode } from 'react';
import type { BearVariant } from '../../types';
import type { ModalSize } from '../Modal/Modal.types';

export interface ModalsTranslations {
  confirm: string;
  cancel: string;
}

export interface OpenModalOptions {
  id?: string;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
  footer?: ReactNode;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  onClose?: () => void;
  className?: string;
  testId?: string;
}

export interface ConfirmModalOptions {
  id?: string;
  title: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: BearVariant;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  testId?: string;
}

export interface ModalsContextValue {
  open: (options: OpenModalOptions) => string;
  confirm: (options: ConfirmModalOptions) => Promise<boolean>;
  close: (id?: string) => void;
  closeAll: () => void;
}

export interface ModalsProviderProps {
  children: ReactNode;
  translations?: Partial<ModalsTranslations>;
  id?: string;
  testId?: string;
}

export interface ModalStackModalEntry {
  kind: 'modal';
  id: string;
  options: OpenModalOptions;
}

export interface ModalStackConfirmEntry {
  kind: 'confirm';
  id: string;
  options: ConfirmModalOptions;
}

export type ModalStackEntry = ModalStackModalEntry | ModalStackConfirmEntry;

export interface ModalsHostProps {
  stack: ModalStackEntry[];
  loadingId: string | null;
  labels: ModalsTranslations;
  onDismiss: (id: string) => void;
  onConfirm: (id: string) => void;
  id?: string;
  testId?: string;
}

export interface StackedModalProps {
  entry: ModalStackEntry;
  index: number;
  isTop: boolean;
  loading: boolean;
  labels: ModalsTranslations;
  onDismiss: (id: string) => void;
  onConfirm: (id: string) => void;
}
