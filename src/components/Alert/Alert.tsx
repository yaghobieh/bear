import { FC, useState, ReactNode } from 'react';
import { cn } from '@utils';
import type { AlertProps, AlertSeverity } from './Alert.types';
import { ALERT_VARIANT_CLASSES, ALERT_DEFAULTS } from './Alert.const';

// Default icons for each severity
const DefaultIcons: Record<AlertSeverity, ReactNode> = {
  success: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  info: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  warning: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

const CloseIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

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
export const Alert: FC<AlertProps> = (props) => {
  const {
    severity = ALERT_DEFAULTS.SEVERITY,
    variant = ALERT_DEFAULTS.VARIANT,
    title,
    icon = ALERT_DEFAULTS.SHOW_ICON,
    action,
    closable = ALERT_DEFAULTS.CLOSABLE,
    onClose,
    children,
    className,
    testId,
    id,
    ...rest
  } = props;

  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;

  const isFilled = variant === 'filled';

  // Get colors based on severity - uses CSS variables for theme support
  const getColors = () => {
    const colorMap = {
      success: { bg: 'var(--bear-success-50)', border: 'var(--bear-success-500)', text: 'var(--bear-success-800)', icon: 'var(--bear-success-600)' },
      info: { bg: 'var(--bear-info-50)', border: 'var(--bear-info-500)', text: 'var(--bear-info-800)', icon: 'var(--bear-info-600)' },
      warning: { bg: 'var(--bear-warning-50)', border: 'var(--bear-warning-500)', text: 'var(--bear-warning-800)', icon: 'var(--bear-warning-600)' },
      error: { bg: 'var(--bear-danger-50)', border: 'var(--bear-danger-500)', text: 'var(--bear-danger-800)', icon: 'var(--bear-danger-600)' },
    };
    return colorMap[severity];
  };
  
  const colors = getColors();

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
      id={id}
      role="alert"
      aria-live="polite"
      className={cn(
        'Bear-Alert',
        'bear-flex bear-items-start bear-gap-3 bear-p-4 bear-rounded-lg',
        ALERT_VARIANT_CLASSES[variant](severity),
        className
      )}
      style={{
        backgroundColor: isFilled ? undefined : colors.bg,
        borderColor: variant === 'outlined' ? colors.border : undefined,
        color: isFilled ? undefined : colors.text,
      }}
      data-testid={testId}
      {...rest}
    >
      {renderIcon() && (
        <span 
          className="Bear-Alert__icon bear-flex-shrink-0 bear-mt-0.5"
          style={{ color: isFilled ? 'currentColor' : colors.icon }}
        >
          {renderIcon()}
        </span>
      )}
      
      <div className="Bear-Alert__content bear-flex-1 bear-min-w-0">
        {title && (
          <div className="Bear-Alert__title bear-font-semibold bear-mb-1">
            {title}
          </div>
        )}
        {children && (
          <div className="Bear-Alert__message bear-text-sm">
            {children}
          </div>
        )}
      </div>

      {action && (
        <div className="Bear-Alert__action bear-flex-shrink-0">
          {action}
        </div>
      )}

      {closable && (
        <button
          type="button"
          onClick={handleClose}
          className={cn(
            'Bear-Alert__close',
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
