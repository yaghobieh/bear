import { FC, useState, useMemo, useCallback, ChangeEvent, useEffect } from 'react';
import { cn } from '@utils';
import type { CreditInputProps, CardType } from './CreditInput.types';
import {
  CREDIT_INPUT_DEFAULT_TRANSLATIONS,
  CREDIT_INPUT_SIZE_CLASSES,
  CREDIT_INPUT_VARIANT_CLASSES,
} from './CreditInput.const';
import {
  detectCardType,
  formatCardNumber,
  formatExpiry,
  createCreditCardValue,
  getMaxCvvLength,
  getMaxCardLength,
} from './CreditInput.utils';

/**
 * Card type icons (SVG)
 */
const CardIcons: Record<CardType, JSX.Element> = {
  visa: (
    <svg viewBox="0 0 24 24" className="bear-w-8 bear-h-5" fill="currentColor">
      <path d="M9.5 8.5l-1.8 7h-1.4l1.8-7h1.4zm6.5 4.5c0-1.1-.9-1.5-1.8-1.9-.6-.2-1-.4-1-.7 0-.2.2-.5.7-.5.5 0 .9.1 1.2.3l.2-1.2c-.3-.1-.9-.3-1.6-.3-1.7 0-2.9.9-2.9 2.2 0 1 .9 1.5 1.5 1.8.7.3 1 .5 1 .8 0 .4-.6.6-1.1.6-.6 0-1.1-.1-1.5-.3l-.2 1.2c.4.2 1 .3 1.7.3 1.8 0 2.9-.9 2.9-2.3h-.1zm2.7-4.5l-1.4 7h-1.3l.1-.5c-.4.4-.9.6-1.5.6-1.3 0-2.2-1.1-2.2-2.5 0-1.7 1.2-3.1 2.9-3.1.5 0 1 .1 1.4.4l.1-.4h1.3l-.4 2.5zm-2.1 2.3c0-.9-.5-1.5-1.2-1.5-.9 0-1.6.9-1.6 1.9 0 .8.5 1.4 1.2 1.4.9 0 1.6-.8 1.6-1.8z" />
    </svg>
  ),
  mastercard: (
    <svg viewBox="0 0 24 24" className="bear-w-8 bear-h-5" fill="currentColor">
      <circle cx="9" cy="12" r="5" opacity=".8" fill="#eb001b" />
      <circle cx="15" cy="12" r="5" opacity=".8" fill="#f79e1b" />
    </svg>
  ),
  amex: (
    <svg viewBox="0 0 24 24" className="bear-w-8 bear-h-5" fill="#2e77bc">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <text x="12" y="14" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">AMEX</text>
    </svg>
  ),
  discover: (
    <svg viewBox="0 0 24 24" className="bear-w-8 bear-h-5" fill="#ff6600">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="15" cy="12" r="3" fill="white" />
    </svg>
  ),
  diners: (
    <svg viewBox="0 0 24 24" className="bear-w-8 bear-h-5" fill="#0079be">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="4" fill="white" />
    </svg>
  ),
  jcb: (
    <svg viewBox="0 0 24 24" className="bear-w-8 bear-h-5">
      <rect x="2" y="6" width="20" height="12" rx="2" fill="#0e4c96" />
      <text x="12" y="14" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">JCB</text>
    </svg>
  ),
  unionpay: (
    <svg viewBox="0 0 24 24" className="bear-w-8 bear-h-5">
      <rect x="2" y="6" width="20" height="12" rx="2" fill="#d9222a" />
      <text x="12" y="14" textAnchor="middle" fontSize="4" fill="white" fontWeight="bold">UnionPay</text>
    </svg>
  ),
  unknown: (
    <svg viewBox="0 0 24 24" className="bear-w-8 bear-h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
};

/**
 * CreditInput - Credit card input with formatting and validation
 *
 * @example
 * ```tsx
 * <CreditInput
 *   value={cardValue}
 *   onChange={setCardValue}
 *   showName={true}
 * />
 * ```
 */
export const CreditInput: FC<CreditInputProps> = ({
  value,
  onChange,
  mode = 'single',
  showName = false,
  size = 'md',
  variant = 'default',
  disabled = false,
  required = false,
  label,
  helperText,
  error,
  acceptedCards,
  validateOnInput = true,
  className,
  testId,
  translations,
  icon,
}) => {
  const [cardNumber, setCardNumber] = useState(value?.number || '');
  const [expiry, setExpiry] = useState(
    value?.expiryMonth && value?.expiryYear
      ? `${value.expiryMonth}/${value.expiryYear}`
      : ''
  );
  const [cvv, setCvv] = useState(value?.cvv || '');
  const [name, setName] = useState(value?.name || '');
  const [cardType, setCardType] = useState<CardType>('unknown');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = useMemo(() => ({
    ...CREDIT_INPUT_DEFAULT_TRANSLATIONS,
    ...translations,
  }), [translations]);

  // Update internal state when value prop changes
  useEffect(() => {
    if (value?.number !== undefined) setCardNumber(value.number);
    if (value?.expiryMonth && value?.expiryYear) {
      setExpiry(`${value.expiryMonth}/${value.expiryYear}`);
    }
    if (value?.cvv !== undefined) setCvv(value.cvv);
    if (value?.name !== undefined) setName(value.name);
    if (value?.cardType !== undefined) setCardType(value.cardType);
  }, [value]);

  const updateValue = useCallback(() => {
    const newValue = createCreditCardValue(cardNumber, expiry, cvv, showName ? name : undefined);
    onChange?.(newValue);
  }, [cardNumber, expiry, cvv, name, showName, onChange]);

  // Call updateValue when inputs change
  useEffect(() => {
    updateValue();
  }, [updateValue]);

  const handleCardNumberChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const detected = detectCardType(raw);
    setCardType(detected);
    
    const maxLength = getMaxCardLength(detected);
    const truncated = raw.slice(0, maxLength);
    const formatted = formatCardNumber(truncated, detected);
    setCardNumber(formatted);
    
    // Check if card type is accepted
    if (validateOnInput && acceptedCards && !acceptedCards.includes(detected) && detected !== 'unknown') {
      setErrors((prev) => ({ ...prev, number: t.invalidCard }));
    } else {
      setErrors((prev) => {
        const { number, ...rest } = prev;
        return rest;
      });
    }
  }, [acceptedCards, validateOnInput, t.invalidCard]);

  const handleExpiryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
  }, []);

  const handleCvvChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const maxLength = getMaxCvvLength(cardType);
    setCvv(raw.slice(0, maxLength));
  }, [cardType]);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const inputBaseClass = cn(
    'bear-bg-transparent bear-border-0 bear-outline-none bear-text-gray-900 dark:bear-text-white placeholder:bear-text-gray-400 dark:placeholder:bear-text-zinc-500',
    CREDIT_INPUT_SIZE_CLASSES[size]
  );

  const wrapperBaseClass = cn(
    'bear-flex bear-items-center bear-rounded-lg bear-border bear-transition-colors',
    CREDIT_INPUT_VARIANT_CLASSES[variant],
    error || Object.keys(errors).length > 0 ? 'bear-border-red-500' : 'focus-within:bear-border-pink-500',
    disabled && 'bear-opacity-50 bear-cursor-not-allowed'
  );

  return (
    <div
      className={cn('Bear-CreditInput', className)}
      data-testid={testId}
    >
      {label && (
        <label className="Bear-CreditInput__label bear-block bear-text-sm bear-font-medium bear-text-zinc-700 dark:bear-text-zinc-300 bear-mb-1.5">
          {label}
          {required && <span className="bear-text-red-500 bear-ml-0.5">*</span>}
        </label>
      )}

      {mode === 'single' ? (
        <div className={cn('Bear-CreditInput__single', wrapperBaseClass)}>
          <div className="Bear-CreditInput__icon bear-pl-3 bear-pr-1">
            {icon ?? CardIcons[cardType]}
          </div>

          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder={t.cardNumberPlaceholder}
            disabled={disabled}
            className={cn('Bear-CreditInput__number bear-flex-1', inputBaseClass)}
          />

          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder={t.expiryPlaceholder}
            disabled={disabled}
            className={cn('Bear-CreditInput__expiry bear-w-16 bear-text-center', inputBaseClass)}
          />

          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            value={cvv}
            onChange={handleCvvChange}
            placeholder={t.cvvPlaceholder}
            disabled={disabled}
            className={cn('Bear-CreditInput__cvv bear-w-12 bear-text-center bear-pr-3', inputBaseClass)}
          />
        </div>
      ) : (
        <div className="Bear-CreditInput__split bear-space-y-3">
          <div className={wrapperBaseClass}>
            <div className="Bear-CreditInput__icon bear-pl-3 bear-pr-1">
              {icon ?? CardIcons[cardType]}
            </div>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder={t.cardNumberPlaceholder}
              disabled={disabled}
              className={cn('Bear-CreditInput__number bear-flex-1', inputBaseClass)}
            />
          </div>

          <div className="bear-flex bear-gap-3">
            <div className={cn(wrapperBaseClass, 'bear-flex-1')}>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder={t.expiryPlaceholder}
                disabled={disabled}
                className={cn('Bear-CreditInput__expiry bear-w-full', inputBaseClass)}
              />
            </div>
            <div className={cn(wrapperBaseClass, 'bear-w-24')}>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={cvv}
                onChange={handleCvvChange}
                placeholder={t.cvvPlaceholder}
                disabled={disabled}
                className={cn('Bear-CreditInput__cvv bear-w-full bear-text-center', inputBaseClass)}
              />
            </div>
          </div>

          {showName && (
            <div className={wrapperBaseClass}>
              <input
                type="text"
                autoComplete="cc-name"
                value={name}
                onChange={handleNameChange}
                placeholder={t.namePlaceholder}
                disabled={disabled}
                className={cn('Bear-CreditInput__name bear-w-full', inputBaseClass)}
              />
            </div>
          )}
        </div>
      )}

      {error && <p className="Bear-CreditInput__error bear-mt-1 bear-text-xs bear-text-red-400">{error}</p>}
      {Object.values(errors).map((err, idx) => (
        <p key={idx} className="Bear-CreditInput__error bear-mt-1 bear-text-xs bear-text-red-400">{err}</p>
      ))}
      {helperText && !error && Object.keys(errors).length === 0 && (
        <p className="Bear-CreditInput__helper bear-mt-1 bear-text-xs bear-text-zinc-500 dark:bear-text-zinc-400">{helperText}</p>
      )}
    </div>
  );
};
