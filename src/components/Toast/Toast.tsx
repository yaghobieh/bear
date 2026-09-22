import { FC, useState, useCallback, ReactNode } from 'react';
import type {
  ToastProps,
  ToastContextValue,
  ToastProviderProps,
} from './Toast.types';
import { COMPONENT_NAME_TOAST } from './Toast.const';
import { ToastContext } from './Toast.context';
import { ToastContainer } from './ToastContainer';
import { generateBearId } from '@utils';

export { useToast } from './Toast.context';
export { ToastContainer } from './ToastContainer';
export { ToastItem } from './ToastItem';

// Toast Provider
export const ToastProvider: FC<ToastProviderProps> = ({ 
  children, 
  position = 'top-right',
  maxToasts,
}) => {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((props: ToastProps): string => {
    const id = props.id || generateBearId(COMPONENT_NAME_TOAST);
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
      <ToastContainer position={position} maxToasts={maxToasts} />
    </ToastContext.Provider>
  );
};
