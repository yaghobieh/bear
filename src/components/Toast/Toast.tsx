import { FC, createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { cn } from '@utils';
import type { 
  ToastProps, 
  ToastContainerProps, 
  ToastContextValue, 
  ToastSeverity, 
  ToastPosition 
} from './Toast.types';

// Generate unique ID
const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// Default icons
const ToastIcons: Record<ToastSeverity, ReactNode> = {
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
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SEVERITY_STYLES: Record<ToastSeverity, string> = {
  success: 'bear-bg-green-500 bear-text-white',
  info: 'bear-bg-blue-500 bear-text-white',
  warning: 'bear-bg-amber-500 bear-text-white',
  error: 'bear-bg-red-500 bear-text-white',
};

const POSITION_STYLES: Record<ToastPosition, string> = {
  'top-left': 'bear-top-4 bear-left-4',
  'top-center': 'bear-top-4 bear-left-1/2 bear-transform bear--translate-x-1/2',
  'top-right': 'bear-top-4 bear-right-4',
  'bottom-left': 'bear-bottom-4 bear-left-4',
  'bottom-center': 'bear-bottom-4 bear-left-1/2 bear-transform bear--translate-x-1/2',
  'bottom-right': 'bear-bottom-4 bear-right-4',
};

// Context
const ToastContext = createContext<ToastContextValue | null>(null);

// Hook to use toast
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Individual Toast component
const ToastItem: FC<ToastProps & { onRemove: () => void }> = ({
  message,
  title,
  severity = 'info',
  duration = 5000,
  closable = true,
  icon,
  action,
  onClose,
  onRemove,
  className,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onRemove();
          onClose?.();
        }, 200);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onRemove, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove();
      onClose?.();
    }, 200);
  };

  const renderIcon = () => {
    if (icon === false) return null;
    if (icon) return icon;
    return ToastIcons[severity];
  };

  return (
    <div
      role="alert"
      className={cn(
        'bear-flex bear-items-start bear-gap-3 bear-p-4 bear-rounded-lg bear-shadow-lg bear-min-w-[300px] bear-max-w-[400px]',
        'bear-transition-all bear-duration-200',
        isExiting ? 'bear-opacity-0 bear-translate-x-2' : 'bear-opacity-100 bear-translate-x-0',
        SEVERITY_STYLES[severity],
        className
      )}
    >
      {renderIcon() && (
        <span className="bear-flex-shrink-0 bear-mt-0.5">
          {renderIcon()}
        </span>
      )}
      
      <div className="bear-flex-1 bear-min-w-0">
        {title && (
          <div className="bear-font-semibold bear-mb-0.5">
            {title}
          </div>
        )}
        <div className="bear-text-sm bear-opacity-90">
          {message}
        </div>
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
          className="bear-flex-shrink-0 bear-p-1 bear-rounded hover:bear-bg-white/20 bear-transition-colors bear-bg-transparent bear-border-none bear-cursor-pointer"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

// Toast Container
export const ToastContainer: FC<ToastContainerProps> = ({
  position = 'top-right',
  maxToasts = 5,
  className,
}) => {
  const context = useContext(ToastContext);
  if (!context) return null;

  // Access internal toasts from provider
  const { _toasts, _removeToast } = context as ToastContextValue & { 
    _toasts: (ToastProps & { id: string })[]; 
    _removeToast: (id: string) => void;
  };

  const visibleToasts = _toasts.slice(0, maxToasts);

  return (
    <div
      className={cn(
        'bear-fixed bear-z-50 bear-flex bear-flex-col bear-gap-2',
        POSITION_STYLES[position],
        className
      )}
    >
      {visibleToasts.map((toast) => (
        <ToastItem
          key={toast.id}
          {...toast}
          onRemove={() => _removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Toast Provider
export const ToastProvider: FC<{ children: ReactNode; position?: ToastPosition }> = ({ 
  children, 
  position = 'top-right' 
}) => {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((props: ToastProps): string => {
    const id = props.id || generateId();
    setToasts((prev) => [...prev, { ...props, id }]);
    return id;
  }, []);

  const toast = useCallback((props: ToastProps) => addToast(props), [addToast]);
  
  const success = useCallback((message: ReactNode, options?: Partial<ToastProps>) => 
    addToast({ message, severity: 'success', ...options }), [addToast]);
  
  const info = useCallback((message: ReactNode, options?: Partial<ToastProps>) => 
    addToast({ message, severity: 'info', ...options }), [addToast]);
  
  const warning = useCallback((message: ReactNode, options?: Partial<ToastProps>) => 
    addToast({ message, severity: 'warning', ...options }), [addToast]);
  
  const error = useCallback((message: ReactNode, options?: Partial<ToastProps>) => 
    addToast({ message, severity: 'error', ...options }), [addToast]);

  const dismiss = useCallback((id: string) => removeToast(id), [removeToast]);
  
  const dismissAll = useCallback(() => setToasts([]), []);

  const contextValue: ToastContextValue & { _toasts: typeof toasts; _removeToast: typeof removeToast } = {
    toast,
    success,
    info,
    warning,
    error,
    dismiss,
    dismissAll,
    _toasts: toasts,
    _removeToast: removeToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer position={position} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;

