export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Select options */
  options: SelectOption[];
  /** Current value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Select label */
  label?: string;
  /** Error message */
  error?: string;
  /** Whether select is disabled */
  disabled?: boolean;
  /** Select size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether select is full width */
  fullWidth?: boolean;
  /** Additional class names */
  className?: string;
}

