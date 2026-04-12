import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  target?: HTMLElement | null;
  disabled?: boolean;
}

export const Portal: FC<PortalProps> = ({ children, target, disabled = false }) => {
  if (disabled) return <>{children}</>;
  if (typeof document === 'undefined') return null;
  return createPortal(children, target ?? document.body);
};

export default Portal;
