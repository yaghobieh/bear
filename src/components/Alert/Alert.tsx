import { FC, useState, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type { AlertProps, AlertSeverity, AlertVariant } from './Alert.types';

// Default icons for each severity
const DefaultIcons: Record<AlertSeverity, ReactNode> = {
  success: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  info: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  warning: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

const CloseIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SEVERITY_COLORS: Record<AlertSeverity, { bg: string; border: string; text: string; icon: string }> = {
  success: { bg: 'rgba(34, 197, 94, 0.1)', border: '#22c55e', text: '#166534', icon: '#22c55e' },
  info: { bg: 'rgba(59, 130, 246, 0.1)', border: '#3b82f6', text: '#1e40af', icon: '#3b82f6' },
  warning: { bg: 'rgba(245, 158, 11, 0.1)', border: '#f59e0b', text: '#92400e', icon: '#f59e0b' },
  error: { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', text: '#991b1b', icon: '#ef4444' },
};

const VARIANT_CLASSES: Record<AlertVariant, (severity: AlertSeverity) => string> = {
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

/**
 * Alert component for displaying important messages
 * 
 * @example
 * ```tsx
 * <Alert severity="success">Operation completed successfully!</Alert>
 * <Alert severity="error" title="Error" closable onClose={() => {}}>
 *   Something went wrong.
 * </Alert>
 * <Alert severity="warning" variant="filled">Warning message</Alert>
 * ```
 */
export const Alert: FC<AlertProps> = ({
  severity = 'info',
  variant = 'standard',
  title,
  icon = true,
  action,
  closable = false,
  onClose,
  children,
  className,
  testId,
  ...props
}) => {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;

  const colors = SEVERITY_COLORS[severity];
  const isFilled = variant === 'filled';

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const renderIcon = () => {
    if (icon === false) return null;
    if (icon !== true) return icon;
    return DefaultIcons[severity];
  };

  return (
    <div
      role="alert"
      className={cn(
        'bear-flex bear-items-start bear-gap-3 bear-p-4 bear-rounded-lg',
        VARIANT_CLASSES[variant](severity),
        className
      )}
      style={{
        backgroundColor: isFilled ? undefined : colors.bg,
        borderColor: variant === 'outlined' ? colors.border : undefined,
        color: isFilled ? undefined : colors.text,
      }}
      data-testid={testId}
      {...props}
    >
      {renderIcon() && (
        <span 
          className="bear-flex-shrink-0 bear-mt-0.5"
          style={{ color: isFilled ? 'currentColor' : colors.icon }}
        >
          {renderIcon()}
        </span>
      )}
      
      <div className="bear-flex-1 bear-min-w-0">
        {title && (
          <div className="bear-font-semibold bear-mb-1">
            {title}
          </div>
        )}
        {children && (
          <div className="bear-text-sm">
            {children}
          </div>
        )}
      </div>

      {action && (
        <div className="bear-flex-shrink-0">
          {action}
        </div>
      )}

      {closable && (
        <button
          type="button"
          onClick={handleClose}
          className={cn(
            'bear-flex-shrink-0 bear-p-1 bear-rounded hover:bear-bg-black/10 bear-transition-colors',
            'bear-bg-transparent bear-border-none bear-cursor-pointer'
          )}
          aria-label="Close alert"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Alert;

