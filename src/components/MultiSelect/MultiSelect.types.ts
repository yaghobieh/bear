export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  /** Available options */
  options: MultiSelectOption[];
  /** Selected values */
  value?: string[];
  /** Default selected values (uncontrolled) */
  defaultValue?: string[];
  /** Called when selection changes */
  onChange?: (values: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Helper text below the select */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Maximum number of selections */
  maxSelections?: number;
  /** Whether to show search input */
  searchable?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

