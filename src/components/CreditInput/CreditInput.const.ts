import { CreditInputTranslations, CardType } from './CreditInput.types';

/**
 * Default translations
 */
export const CREDIT_INPUT_DEFAULT_TRANSLATIONS: CreditInputTranslations = {
  cardNumber: 'Card Number',
  expiry: 'Expiry',
  cvv: 'CVV',
  name: 'Cardholder Name',
  cardNumberPlaceholder: '1234 5678 9012 3456',
  expiryPlaceholder: 'MM/YY',
  cvvPlaceholder: '123',
  namePlaceholder: 'John Doe',
  invalidCard: 'Invalid card number',
  invalidExpiry: 'Invalid expiry date',
  invalidCvv: 'Invalid CVV',
};

/**
 * Size classes
 */
export const CREDIT_INPUT_SIZE_CLASSES = {
  sm: 'bear-py-1.5 bear-px-3 bear-text-sm',
  md: 'bear-py-2 bear-px-4 bear-text-sm',
  lg: 'bear-py-2.5 bear-px-5 bear-text-base',
} as const;

/**
 * Variant classes (light/dark)
 */
export const CREDIT_INPUT_VARIANT_CLASSES = {
  default: 'bear-bg-white dark:bear-bg-zinc-800 bear-border-zinc-300 dark:bear-border-zinc-600',
  filled: 'bear-bg-zinc-100 dark:bear-bg-zinc-700 bear-border-transparent',
  outline: 'bear-bg-transparent bear-border-zinc-300 dark:bear-border-zinc-500',
} as const;

/**
 * Card type patterns (regex for detection)
 */
export const CARD_PATTERNS: Record<CardType, RegExp> = {
  visa: /^4/,
  mastercard: /^(5[1-5]|2[2-7])/,
  amex: /^3[47]/,
  discover: /^(6011|65|64[4-9])/,
  diners: /^(36|38|30[0-5])/,
  jcb: /^35/,
  unionpay: /^62/,
  unknown: /.*/,
};

/**
 * Card number lengths by type
 */
export const CARD_NUMBER_LENGTHS: Record<CardType, number[]> = {
  visa: [13, 16, 19],
  mastercard: [16],
  amex: [15],
  discover: [16, 19],
  diners: [14, 16, 19],
  jcb: [16, 19],
  unionpay: [16, 17, 18, 19],
  unknown: [16],
};

/**
 * CVV lengths by card type
 */
export const CVV_LENGTHS: Record<CardType, number> = {
  visa: 3,
  mastercard: 3,
  amex: 4,
  discover: 3,
  diners: 3,
  jcb: 3,
  unionpay: 3,
  unknown: 3,
};

/**
 * Card format patterns (spacing)
 */
export const CARD_FORMATS: Record<CardType, number[]> = {
  visa: [4, 4, 4, 4, 3],
  mastercard: [4, 4, 4, 4],
  amex: [4, 6, 5],
  discover: [4, 4, 4, 4, 3],
  diners: [4, 6, 4, 4, 1],
  jcb: [4, 4, 4, 4, 3],
  unionpay: [4, 4, 4, 4, 3],
  unknown: [4, 4, 4, 4],
};
