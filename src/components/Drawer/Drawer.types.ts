import type { ReactNode } from 'react';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface UseDrawerParams {
  isOpen: boolean;
  onClose: () => void;
  closeOnEscape: boolean;
}

export interface UseDrawerResult {
  isMounted: boolean;
  isPanelOpen: boolean;
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

