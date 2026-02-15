import type { ReactNode } from 'react';

export type NavigableSelectSize = 'sm' | 'md' | 'lg';

export interface NavigableSelectOption {
  /** Unique option value */
  value: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Optional group name */
  group?: string;
}

export interface NavigableSelectProps {
  /** Available options */
  options: NavigableSelectOption[];
  /** Selected value(s) — string for single, string[] for multiple */
  value?: string | string[];
  /** Default value (uncontrolled) */
  defaultValue?: string | string[];
  /** Called when selection changes */
  onChange?: (value: string | string[]) => void;
  /** Allow multiple selections */
  multiple?: boolean;
  /** Enable search/filter */
  searchable?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Whether select is disabled */
  disabled?: boolean;
  /** Component size */
  size?: NavigableSelectSize;
  /** Whether select is full width */
  fullWidth?: boolean;
  /** Maximum visible options before scrolling */
  maxVisible?: number;
  /** Maximum selections in multiple mode */
  maxSelections?: number;
  /** Empty state text */
  emptyText?: string;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Test ID */
  testId?: string;
}
