import { FC, useState, useCallback, useEffect } from 'react';
import { Input } from '../Input';
import { BearIcons } from '../Icon';
import type { CurrencyInputProps } from './CurrencyInput.types';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE, DEFAULT_DECIMALS, CURRENCY_SYMBOLS } from './CurrencyInput.const';
import { formatCurrency, parseCurrency } from './CurrencyInput.utils';

export const CurrencyInput: FC<CurrencyInputProps> = ({
  value,
  onChange,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
  decimals = DEFAULT_DECIMALS,
  placeholder = '0.00',
  size = 'md',
  disabled = false,
  error,
  allowNegative = false,
  max,
  min,
  testId,
  className,
  ...rest
}) => {
  const [displayValue, setDisplayValue] = useState(() => formatCurrency(value, locale, decimals));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) {
      setDisplayValue(formatCurrency(value, locale, decimals));
    }
  }, [value, locale, decimals, focused]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const pattern = allowNegative ? /[^0-9.,-]/g : /[^0-9.,]/g;
      setDisplayValue(raw.replace(pattern, ''));
    },
    [allowNegative]
  );

  const handleBlur = useCallback(() => {
    setFocused(false);
    let parsed = parseCurrency(displayValue);
    if (parsed != null) {
      if (max != null && parsed > max) parsed = max;
      if (min != null && parsed < min) parsed = min;
      parsed = parseFloat(parsed.toFixed(decimals));
    }
    onChange?.(parsed);
    setDisplayValue(formatCurrency(parsed, locale, decimals));
  }, [displayValue, locale, decimals, max, min, onChange]);

  const symbol = typeof currency === 'string'
    ? CURRENCY_SYMBOLS[currency] ?? currency
    : null;

  const adornment = typeof currency !== 'string'
    ? currency
    : <BearIcons.DollarSignIcon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="text-gray-400" />;

  const displayAdornment = symbol
    ? <span className="text-gray-500 dark:text-gray-400 font-medium select-none">{symbol}</span>
    : adornment;

  return (
    <Input
      {...rest}
      size={size}
      disabled={disabled}
      error={error}
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
      inputMode="decimal"
      className={className}
      data-testid={testId}
      InputProps={{ startAdornment: displayAdornment }}
    />
  );
};
