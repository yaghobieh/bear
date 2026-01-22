import { ReactNode } from 'react';

export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

export type ToastSeverity = 'success' | 'info' | 'warning' | 'error';

export interface ToastProps {
  /** Unique identifier for the toast */
  id?: string;
  /** Toast message content */
  message: ReactNode;
  /** Optional title */
  title?: string;
  /** Severity/type of the toast */
  severity?: ToastSeverity;
  /** Duration in milliseconds before auto-dismiss (0 = no auto-dismiss) */
  duration?: number;
  /** Whether the toast can be manually closed */
  closable?: boolean;
  /** Custom icon */
  icon?: ReactNode | false;
  /** Action button */
  action?: ReactNode;
  /** Callback when toast is closed */
  onClose?: () => void;
  /** Additional CSS class */
  className?: string;
}

export interface ToastContainerProps {
  /** Position of toast container */
  position?: ToastPosition;
  /** Maximum number of visible toasts */
  maxToasts?: number;
  /** Additional CSS class */
  className?: string;
}

export interface ToastContextValue {
  /** Show a toast notification */
  toast: (props: ToastProps) => string;
  /** Show a success toast */
  success: (message: ReactNode, options?: Partial<ToastProps>) => string;
  /** Show an info toast */
  info: (message: ReactNode, options?: Partial<ToastProps>) => string;
  /** Show a warning toast */
  warning: (message: ReactNode, options?: Partial<ToastProps>) => string;
  /** Show an error toast */
  error: (message: ReactNode, options?: Partial<ToastProps>) => string;
  /** Dismiss a specific toast */
  dismiss: (id: string) => void;
  /** Dismiss all toasts */
  dismissAll: () => void;
}

