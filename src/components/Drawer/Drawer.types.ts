import type { ReactNode } from 'react';

export interface DrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer title */
  title?: string;
  /** Drawer content */
  children: ReactNode;
  /** Side from which drawer appears */
  side?: 'left' | 'right' | 'top' | 'bottom';
  /** Drawer size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether clicking backdrop closes drawer */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes drawer */
  closeOnEscape?: boolean;
  /** Additional class names */
  className?: string;
}

