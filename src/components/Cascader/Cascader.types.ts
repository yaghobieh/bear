import { ReactNode } from 'react';

/**
 * Cascader option interface
 */
export interface CascaderOption {
  /** Unique value for the option */
  value: string;
  /** Display label */
  label: string;
  /** Child options for nested levels */
  children?: CascaderOption[];
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Optional icon */
  icon?: ReactNode;
}

/**
 * Cascader size variants
 */
export type CascaderSize = 'sm' | 'md' | 'lg';

/**
 * Cascader variant styles
 */
export type CascaderVariant = 'default' | 'filled' | 'outline';

/**
 * Trigger type for expanding options
 */
export type CascaderExpandTrigger = 'click' | 'hover';

/**
 * Translations for Cascader component
 */
export interface CascaderTranslations {
  placeholder: string;
  noOptions: string;
  loading: string;
  clear: string;
}

/**
 * Cascader component props
 */
export interface CascaderProps {
  /** Available options (hierarchical) */
  options: CascaderOption[];
  /** Selected value path (array of values) */
  value?: string[];
  /** Callback when value changes */
  onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is loading */
  loading?: boolean;
  /** Whether to allow clearing the selection */
  clearable?: boolean;
  /** Size variant */
  size?: CascaderSize;
  /** Style variant */
  variant?: CascaderVariant;
  /** How to expand child options */
  expandTrigger?: CascaderExpandTrigger;
  /** Whether to show the full path in the input */
  showFullPath?: boolean;
  /** Path separator for display */
  pathSeparator?: string;
  /** Allow selecting parent options */
  changeOnSelect?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID for testing */
  testId?: string;
  /** Translation strings */
  translations?: Partial<CascaderTranslations>;
  /** Custom icon */
  icon?: ReactNode;
}

/**
 * Cascader panel props (internal)
 */
export interface CascaderPanelProps {
  options: CascaderOption[];
  selectedPath: string[];
  expandedPath: string[];
  onSelect: (option: CascaderOption, level: number) => void;
  onExpand: (option: CascaderOption, level: number) => void;
  expandTrigger: CascaderExpandTrigger;
  level: number;
}
