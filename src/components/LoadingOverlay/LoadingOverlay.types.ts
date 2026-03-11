import type { ReactNode, HTMLAttributes } from 'react';

export interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  loader?: ReactNode;
  overlayOpacity?: number;
  overlayBlur?: number;
  zIndex?: number;
  loaderSize?: 'sm' | 'md' | 'lg';
  label?: string;
  testId?: string;
}
