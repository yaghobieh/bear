import { ReactNode } from 'react';

/**
 * Credit card types
 */
export type CardType = 
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'diners'
  | 'jcb'
  | 'unionpay'
  | 'unknown';

/**
 * Credit card value
 */
export interface CreditCardValue {
  /** Card number (formatted) */
  number: string;
  /** Card number (raw digits only) */
  rawNumber: string;
  /** Expiry month */
  expiryMonth: string;
  /** Expiry year */
  expiryYear: string;
  /** CVV/CVC code */
  cvv: string;
  /** Cardholder name */
  name?: string;
  /** Detected card type */
  cardType: CardType;
  /** Whether the card number is valid (Luhn check) */
  isValid: boolean;
}

/**
 * CreditInput size variants
 */
export type CreditInputSize = 'sm' | 'md' | 'lg';

/**
 * CreditInput variant styles
 */
export type CreditInputVariant = 'default' | 'filled' | 'outline';

/**
 * CreditInput display mode
 */
export type CreditInputMode = 'single' | 'split';

/**
 * CreditInput translations
 */
export interface CreditInputTranslations {
  cardNumber: string;
  expiry: string;
  cvv: string;
  name: string;
  cardNumberPlaceholder: string;
  expiryPlaceholder: string;
  cvvPlaceholder: string;
  namePlaceholder: string;
  invalidCard: string;
  invalidExpiry: string;
  invalidCvv: string;
}

/**
 * CreditInput component props
 */
export interface CreditInputProps {
  /** Current credit card value */
  value?: Partial<CreditCardValue>;
  /** Callback when value changes */
  onChange?: (value: CreditCardValue) => void;
  /** Display mode */
  mode?: CreditInputMode;
  /** Whether to show cardholder name field */
  showName?: boolean;
  /** Size variant */
  size?: CreditInputSize;
  /** Style variant */
  variant?: CreditInputVariant;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Accepted card types */
  acceptedCards?: CardType[];
  /** Whether to validate on input */
  validateOnInput?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
  /** Translation strings */
  translations?: Partial<CreditInputTranslations>;
  /** Custom card icon */
  icon?: ReactNode;
}
