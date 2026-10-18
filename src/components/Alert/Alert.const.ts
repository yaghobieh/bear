import type { AlertSeverity, AlertVariant } from './Alert.types';
import { cn } from '@utils';

export const ALERT_SEVERITY_CLASS: Record<AlertSeverity, string> = {
  success: 'Bear-Alert--success',
  info: 'Bear-Alert--info',
  warning: 'Bear-Alert--warning',
  error: 'Bear-Alert--error',
};

export const ALERT_VARIANT_CLASSES: Record<AlertVariant, (severity: AlertSeverity) => string> = {
  filled: (severity) => cn(
    'bear-alert-filled',
    severity === 'success' && 'bear-alert-filled-success',
    severity === 'info' && 'bear-alert-filled-info',
    severity === 'warning' && 'bear-alert-filled-warning',
    severity === 'error' && 'bear-alert-filled-error',
  ),
  outlined: () => 'Bear-Alert--outlined',
  standard: () => '',
};
