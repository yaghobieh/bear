import { FC, useContext } from 'react';
import type { ToastContainerProps, ToastProps, ToastContextValue } from './Toast.types';
import { T_O_A_S_T_ROOT_CLASS, TOAST_POSITION_CLASSES } from './Toast.const';
import { ToastContext } from './Toast.context';
import { ToastItem } from './ToastItem';
import { cn } from '@utils';
import { FIVE } from '@constants';

export const ToastContainer: FC<ToastContainerProps> = ({
  position = 'top-right',
  maxToasts = FIVE,
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
        `${T_O_A_S_T_ROOT_CLASS}__container`,
        'bear-fixed bear-z-[11000] bear-flex bear-flex-col bear-gap-2',
        TOAST_POSITION_CLASSES[position],
        className
      )}
      aria-relevant="additions"
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
