import type { AlertSeverity, AlertVariant } from './Alert.types';
import { cn } from '@utils';

/**
 * Alert severity colors using CSS variables for theme support
 * These map to the theme's success, info, warning, and danger color scales
 */
export const ALERT_SEVERITY_COLORS: Record<AlertSeverity, { bg: string; border: string; text: string; icon: string }> = {
  success: { 
    bg: 'var(--bear-success-500, rgba(34, 197, 94, 0.1))', 
    border: 'var(--bear-success-500, #22c55e)', 
    text: 'var(--bear-success-800, #166534)', 
    icon: 'var(--bear-success-500, #22c55e)' 
  },
  info: { 
    bg: 'var(--bear-info-500, rgba(59, 130, 246, 0.1))', 
    border: 'var(--bear-info-500, #3b82f6)', 
    text: 'var(--bear-info-800, #1e40af)', 
    icon: 'var(--bear-info-500, #3b82f6)' 
  },
  warning: { 
    bg: 'var(--bear-warning-500, rgba(245, 158, 11, 0.1))', 
    border: 'var(--bear-warning-500, #f59e0b)', 
    text: 'var(--bear-warning-800, #92400e)', 
    icon: 'var(--bear-warning-500, #f59e0b)' 
  },
  error: { 
    bg: 'var(--bear-danger-500, rgba(239, 68, 68, 0.1))', 
    border: 'var(--bear-danger-500, #ef4444)', 
    text: 'var(--bear-danger-800, #991b1b)', 
    icon: 'var(--bear-danger-500, #ef4444)' 
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

export const ALERT_DEFAULTS = {
  SEVERITY: 'info' as AlertSeverity,
  VARIANT: 'standard' as AlertVariant,
  SHOW_ICON: true,
  CLOSABLE: false,
};

