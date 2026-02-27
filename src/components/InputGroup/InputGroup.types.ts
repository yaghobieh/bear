import type { ReactNode } from 'react';

export interface InputGroupProps {
  /** Group label */
  label?: string;
  /** Description text (below label, above input) */
  description?: string;
  /** Error message (overrides helperText styling) */
  error?: string;
  /** Helper text (below input) */
  helperText?: string;
  /** Whether the field is required (shows asterisk) */
  required?: boolean;
  /** Whether the group takes full width */
  fullWidth?: boolean;
  /** The input element(s) */
  children: ReactNode;
  /** Additional class name */
  className?: string;
  /** HTML for attribute linking label to input */
  htmlFor?: string;
  /** Test ID */
  testId?: string;
}
