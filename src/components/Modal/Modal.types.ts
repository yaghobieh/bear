import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: ReactNode;
  /** Modal size */
  size?: ModalSize;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether clicking backdrop closes modal */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes modal */
  closeOnEscape?: boolean;
  /** When false, the document body scroll is not locked while open */
  lockBodyScroll?: boolean;
  /** When true, the page behind the modal stays scrollable (same as lockBodyScroll: false) */
  cancelPreventScroll?: boolean;
  /** When provided, sets whether clicking the backdrop closes the modal (overrides closeOnBackdrop) */
  isCancelBackgroundClick?: boolean;
  /** Additional class names for content */
  className?: string;
  /** Footer content */
  footer?: ReactNode;
  /** Test ID for testing purposes */
  testId?: string;
  /** Unique ID for accessibility */
  id?: string;
}
