import type { HTMLAttributes, ReactNode } from 'react';

export interface Annotation {
  id: string;
  x: number;
  y: number;
  text: string;
  color?: string;
}

export interface ImageAnnotationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  /** Image source URL */
  src: string;
  /** Alt text */
  alt?: string;
  /** Current annotations */
  annotations: Annotation[];
  /** Called when annotations change (add/edit/delete) */
  onChange?: (annotations: Annotation[]) => void;
  /** Whether the user can add new annotations by clicking */
  editable?: boolean;
  /** Pin color */
  pinColor?: string;
  /** Pin size in px */
  pinSize?: number;
  /** Render custom popover content for each annotation */
  renderPopover?: (annotation: Annotation) => ReactNode;
  /** Test ID */
  testId?: string;
}
