import { CardType, CreditCardValue } from './CreditInput.types';
import { CARD_PATTERNS, CARD_NUMBER_LENGTHS, CVV_LENGTHS, CARD_FORMATS } from './CreditInput.const';

/**
 * Detect card type from card number
 */
export const detectCardType = (number: string): CardType => {
  const digits = number.replace(/\D/g, '');
  
  // Check patterns in order of specificity
  const types: CardType[] = ['amex', 'diners', 'discover', 'jcb', 'unionpay', 'mastercard', 'visa'];
  
  for (const type of types) {
    if (CARD_PATTERNS[type].test(digits)) {
      return type;
    }
  }
  
  return 'unknown';
};

/**
 * Format card number with spaces
 */
export const formatCardNumber = (number: string, cardType: CardType): string => {
  const digits = number.replace(/\D/g, '');
  const format = CARD_FORMATS[cardType] || CARD_FORMATS.unknown;
  
  let result = '';
  let digitIndex = 0;
  
  for (const groupSize of format) {
    if (digitIndex >= digits.length) break;
    if (result) result += ' ';
    result += digits.slice(digitIndex, digitIndex + groupSize);
    digitIndex += groupSize;
  }
  
  return result;
};

/**
 * Format expiry date as MM/YY
 */
export const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) return '';
  if (digits.length === 1) {
    // Auto-add leading zero for months 2-9
    if (parseInt(digits) > 1) {
      return `0${digits}/`;
    }
    return digits;
  }
  if (digits.length === 2) {
    const month = parseInt(digits);
    if (month > 12) {
      return `0${digits[0]}/${digits[1]}`;
    }
    return `${digits}/`;
  }
  
  const month = digits.slice(0, 2);
  const year = digits.slice(2, 4);
  return `${month}/${year}`;
};

/**
 * Parse expiry date to month and year
 */
export const parseExpiry = (value: string): { month: string; year: string } => {
  const parts = value.split('/');
  return {
    month: parts[0] || '',
    year: parts[1] || '',
  };
};

/**
 * Validate card number using Luhn algorithm
 */
export const validateLuhn = (number: string): boolean => {
  const digits = number.replace(/\D/g, '');
  if (digits.length === 0) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Validate card number length
 */
export const validateCardLength = (number: string, cardType: CardType): boolean => {
  const digits = number.replace(/\D/g, '');
  const validLengths = CARD_NUMBER_LENGTHS[cardType] || CARD_NUMBER_LENGTHS.unknown;
  return validLengths.includes(digits.length);
};

/**
 * Validate CVV length
 */
export const validateCvvLength = (cvv: string, cardType: CardType): boolean => {
  const digits = cvv.replace(/\D/g, '');
  const expectedLength = CVV_LENGTHS[cardType] || CVV_LENGTHS.unknown;
  return digits.length === expectedLength;
};

/**
 * Validate expiry date
 */
export const validateExpiry = (month: string, year: string): boolean => {
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);
  
  if (isNaN(monthNum) || isNaN(yearNum)) return false;
  if (monthNum < 1 || monthNum > 12) return false;
  
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  if (yearNum < currentYear) return false;
  if (yearNum === currentYear && monthNum < currentMonth) return false;
  
  return true;
};

/**
 * Create credit card value object
 */
export const createCreditCardValue = (
  number: string,
  expiry: string,
  cvv: string,
  name?: string
): CreditCardValue => {
  const rawNumber = number.replace(/\D/g, '');
  const cardType = detectCardType(rawNumber);
  const { month, year } = parseExpiry(expiry);
  
  const isNumberValid = validateLuhn(rawNumber) && validateCardLength(rawNumber, cardType);
  const isExpiryValid = validateExpiry(month, year);
  const isCvvValid = validateCvvLength(cvv, cardType);
  
  return {
    number: formatCardNumber(rawNumber, cardType),
    rawNumber,
    expiryMonth: month,
    expiryYear: year,
    cvv: cvv.replace(/\D/g, ''),
    name,
    cardType,
    isValid: isNumberValid && isExpiryValid && isCvvValid,
  };
};

/**
 * Get max CVV length for card type
 */
export const getMaxCvvLength = (cardType: CardType): number => {
  return CVV_LENGTHS[cardType] || CVV_LENGTHS.unknown;
};

/**
 * Get max card number length for card type
 */
export const getMaxCardLength = (cardType: CardType): number => {
  const lengths = CARD_NUMBER_LENGTHS[cardType] || CARD_NUMBER_LENGTHS.unknown;
  return Math.max(...lengths);
};
