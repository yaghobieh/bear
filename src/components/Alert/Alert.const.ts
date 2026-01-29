import type { AlertSeverity, AlertVariant } from './Alert.types';
import { cn } from '@utils';

export const ALERT_SEVERITY_COLORS: Record<AlertSeverity, { bg: string; border: string; text: string; icon: string }> = {
  success: { bg: 'rgba(34, 197, 94, 0.1)', border: '#22c55e', text: '#166534', icon: '#22c55e' },
  info: { bg: 'rgba(59, 130, 246, 0.1)', border: '#3b82f6', text: '#1e40af', icon: '#3b82f6' },
  warning: { bg: 'rgba(245, 158, 11, 0.1)', border: '#f59e0b', text: '#92400e', icon: '#f59e0b' },
  error: { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', text: '#991b1b', icon: '#ef4444' },
};

export const ALERT_VARIANT_CLASSES: Record<AlertVariant, (severity: AlertSeverity) => string> = {
  filled: (severity) => cn(
    'bear-text-white',
    severity === 'success' && 'bear-bg-green-500',
    severity === 'info' && 'bear-bg-blue-500',
    severity === 'warning' && 'bear-bg-amber-500',
    severity === 'error' && 'bear-bg-red-500',
  ),
  outlined: () => 'bear-bg-transparent bear-border',
  standard: () => '',
};

export const ALERT_DEFAULTS = {
  SEVERITY: 'info' as AlertSeverity,
  VARIANT: 'standard' as AlertVariant,
  SHOW_ICON: true,
  CLOSABLE: false,
};

