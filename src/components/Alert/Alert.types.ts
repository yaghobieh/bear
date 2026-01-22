import type { HTMLAttributes, ReactNode } from 'react';

export type AlertSeverity = 'success' | 'info' | 'warning' | 'error';
export type AlertVariant = 'filled' | 'outlined' | 'standard';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Alert severity/type */
  severity?: AlertSeverity;
  /** Alert visual variant */
  variant?: AlertVariant;
  /** Alert title */
  title?: ReactNode;
  /** Whether to show default icon */
  icon?: boolean | ReactNode;
  /** Action buttons/elements */
  action?: ReactNode;
  /** Whether alert can be closed */
  closable?: boolean;
  /** Callback when close button is clicked */
  onClose?: () => void;
  /** Content of the alert */
  children?: ReactNode;
  /** Test ID */
  testId?: string;
}

