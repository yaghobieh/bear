import type { ReactNode } from 'react';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerHeaderProps {
  side: DrawerSide;
  title?: string;
  titleId: string;
  showCloseButton: boolean;
  onClose: () => void;
  direction?: string;
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  side?: DrawerSide;
  anchor?: DrawerSide;
  variant?: 'temporary' | 'persistent' | 'permanent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  container?: Element | DocumentFragment | null;
  id?: string;
  testId?: string;
}

