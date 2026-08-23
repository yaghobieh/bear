import type { ReactNode } from 'react';

export type BottomSheetSize = 'sm' | 'md' | 'lg' | 'full';

export interface BottomSheetProps {
  testId?: string;
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  size?: BottomSheetSize;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showHandle?: boolean;
  enableScroll?: boolean;
  isSticky?: boolean;
  className?: string;
}
