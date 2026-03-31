import { FC, ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  /** Content to render in the portal */
  children: ReactNode;
  /** Target DOM element (defaults to document.body) */
  target?: HTMLElement | null;
  /** Disable portalling — render inline instead */
  disabled?: boolean;
}

export const Portal: FC<PortalProps> = ({ children, target, disabled = false }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (disabled || !mounted) return <>{children}</>;

  return createPortal(children, target ?? document.body);
};

export default Portal;
