import type { AlertSeverity, AlertVariant } from './Alert.types';
import { cn } from '@utils';

export const ALERT_SEVERITY_COLORS: Record<AlertSeverity, { bg: string; border: string; text: string; icon: string }> = {
  success: {
    bg: 'var(--bear-success-50)',
    border: 'var(--bear-success-500)',
    text: 'var(--bear-success-800)',
    icon: 'var(--bear-success-600)',
  },
  info: {
    bg: 'var(--bear-info-50)',
    border: 'var(--bear-info-500)',
    text: 'var(--bear-info-800)',
    icon: 'var(--bear-info-600)',
  },
  warning: {
    bg: 'var(--bear-warning-50)',
    border: 'var(--bear-warning-500)',
    text: 'var(--bear-warning-800)',
    icon: 'var(--bear-warning-600)',
  },
  error: {
    bg: 'var(--bear-danger-50)',
    border: 'var(--bear-danger-500)',
    text: 'var(--bear-danger-800)',
    icon: 'var(--bear-danger-600)',
  },
};

export const ALERT_VARIANT_CLASSES: Record<AlertVariant, (severity: AlertSeverity) => string> = {
  filled: (severity) => cn(
    'bear-text-white bear-alert-filled',
    severity === 'success' && 'bear-alert-filled-success',
    severity === 'info' && 'bear-alert-filled-info',
    severity === 'warning' && 'bear-alert-filled-warning',
    severity === 'error' && 'bear-alert-filled-error',
  ),
  outlined: () => 'bear-bg-transparent bear-border',
  standard: () => '',
};
