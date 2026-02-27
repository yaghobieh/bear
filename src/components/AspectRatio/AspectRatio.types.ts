import type { HTMLAttributes, ReactNode } from 'react';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio as a number (width / height). E.g. 16/9, 4/3, 1 */
  ratio?: number;
  /** Maximum width constraint */
  maxWidth?: string | number;
  /** Content to render inside the aspect ratio container */
  children?: ReactNode;
}
