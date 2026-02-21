import type { TextareaHTMLAttributes } from 'react';

export interface ResizableTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  /** Minimum height in pixels */
  minHeight?: number;
  /** Maximum height in pixels (0 = unbounded) */
  maxHeight?: number;
  /** Allow user to resize by dragging the handle */
  resizable?: boolean;
  /** Class name for the wrapper */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Test ID */
  testId?: string;
}
