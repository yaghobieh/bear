import type { TextareaHTMLAttributes } from 'react';

export interface ResizableTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  /** Textarea label */
  label?: string;
  /** Helper text below textarea */
  helperText?: string;
  /** Error message (shows red border + text) */
  error?: string;
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
  /** Show live character count (requires maxLength or charCountMax) */
  showCharCount?: boolean;
  /** Max chars for counter display (alternative to maxLength when you don't want native enforcement) */
  charCountMax?: number;
}
