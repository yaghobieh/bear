import { ReactNode } from 'react';

/**
 * Country data interface
 */
export interface CountryData {
  /** ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB') */
  code: string;
  /** Country name */
  name: string;
  /** Dial code (e.g., '+1', '+44') */
  dialCode: string;
  /** Flag emoji */
  flag: string;
  /** Phone number format mask (e.g., '(###) ###-####') */
  format?: string;
}

/**
 * Phone number value
 */
export interface PhoneValue {
  /** Country code */
  countryCode: string;
  /** Dial code */
  dialCode: string;
  /** Phone number (without dial code) */
  number: string;
  /** Full formatted phone number */
  formattedNumber: string;
  /** Raw phone number (digits only) */
  rawNumber: string;
}

/**
 * PhoneInput size variants
 */
export type PhoneInputSize = 'sm' | 'md' | 'lg';

/**
 * PhoneInput variant styles
 */
export type PhoneInputVariant = 'default' | 'filled' | 'outline';

/**
 * PhoneInput translations
 */
export interface PhoneInputTranslations {
  placeholder: string;
  searchCountry: string;
  noResults: string;
}

/**
 * PhoneInput component props
 */
export interface PhoneInputProps {
  /** Current phone value */
  value?: PhoneValue;
  /** Callback when value changes */
  onChange?: (value: PhoneValue) => void;
  /** Default country code */
  defaultCountry?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Size variant */
  size?: PhoneInputSize;
  /** Style variant */
  variant?: PhoneInputVariant;
  /** Only allow specific countries */
  onlyCountries?: string[];
  /** Exclude specific countries */
  excludeCountries?: string[];
  /** Preferred countries (shown at top) */
  preferredCountries?: string[];
  /** Whether to show country search */
  searchable?: boolean;
  /** Whether to show flags */
  showFlags?: boolean;
  /** Whether to show dial code in input */
  showDialCode?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
  /** Translation strings */
  translations?: Partial<PhoneInputTranslations>;
  /** Custom country selector icon */
  icon?: ReactNode;
}

/**
 * CountrySelector component props
 */
export interface CountrySelectorProps {
  countries: CountryData[];
  selectedCountry: CountryData | null;
  onSelect: (country: CountryData) => void;
  isOpen: boolean;
  onToggle: () => void;
  searchable: boolean;
  showFlags: boolean;
  translations: PhoneInputTranslations;
  disabled?: boolean;
}
