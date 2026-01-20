export interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface AutocompleteProps {
  /** Available options */
  options: AutocompleteOption[];
  /** Current value */
  value?: string;
  /** Called when value changes */
  onChange?: (value: string) => void;
  /** Called when an option is selected */
  onSelect?: (option: AutocompleteOption) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Allow free-form input (not just from options) */
  freeSolo?: boolean;
  /** Show loading state */
  loading?: boolean;
  /** Custom filter function */
  filterOptions?: (options: AutocompleteOption[], inputValue: string) => AutocompleteOption[];
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

