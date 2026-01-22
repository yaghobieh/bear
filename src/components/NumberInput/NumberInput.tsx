import { FC, useState, useEffect } from 'react';
import { NumberInputProps } from './NumberInput.types';
import { cn } from '../../utils/cn';

export const NumberInput: FC<NumberInputProps> = ({
  value: controlledValue,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  label,
  helperText,
  error,
  placeholder = '0',
  size = 'md',
  variant = 'default',
  showButtons = true,
  buttonPosition = 'sides',
  className,
  precision = 0,
}) => {
  const [internalValue, setInternalValue] = useState<number>(controlledValue ?? 0);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    if (controlledValue !== undefined) setInternalValue(controlledValue);
  }, [controlledValue]);

  const clamp = (val: number): number => {
    let result = val;
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return Number(result.toFixed(precision));
  };

  const updateValue = (newValue: number) => {
    const clamped = clamp(newValue);
    setInternalValue(clamped);
    onChange?.(clamped);
  };

  const increment = () => updateValue(value + step);
  const decrement = () => updateValue(value - step);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) updateValue(parsed);
    else if (e.target.value === '') updateValue(0);
  };

  const sizeClasses = {
    sm: { input: 'bear-py-1.5 bear-text-sm', button: 'bear-w-7 bear-h-7 bear-text-sm' },
    md: { input: 'bear-py-2', button: 'bear-w-9 bear-h-9' },
    lg: { input: 'bear-py-2.5 bear-text-lg', button: 'bear-w-11 bear-h-11 bear-text-lg' },
  };

  const variantClasses = {
    default: 'bear-bg-zinc-800 bear-border-zinc-600',
    filled: 'bear-bg-zinc-700 bear-border-transparent',
    outline: 'bear-bg-transparent bear-border-zinc-500',
  };

  const Button: FC<{ onClick: () => void; children: React.ReactNode; disabled?: boolean }> = ({ onClick, children, disabled: btnDisabled }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || btnDisabled}
      className={cn(
        'bear-flex bear-items-center bear-justify-center bear-rounded bear-bg-zinc-700 bear-text-zinc-300 hover:bear-bg-zinc-600 bear-transition-colors',
        sizeClasses[size].button,
        (disabled || btnDisabled) && 'bear-opacity-50 bear-cursor-not-allowed'
      )}
    >
      {children}
    </button>
  );

  return (
    <div className={className}>
      {label && <label className="bear-block bear-text-sm bear-font-medium bear-text-zinc-300 bear-mb-1.5">{label}</label>}
      <div className={cn('bear-flex bear-items-center bear-gap-2', buttonPosition === 'right' && 'bear-flex-row-reverse')}>
        {showButtons && buttonPosition === 'sides' && (
          <Button onClick={decrement} disabled={min !== undefined && value <= min}>−</Button>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'bear-flex-1 bear-px-4 bear-rounded-lg bear-border bear-text-center bear-text-white bear-outline-none bear-transition-colors focus:bear-border-pink-500',
            sizeClasses[size].input,
            variantClasses[variant],
            error && 'bear-border-red-500',
            disabled && 'bear-opacity-50 bear-cursor-not-allowed'
          )}
        />
        {showButtons && buttonPosition === 'sides' && (
          <Button onClick={increment} disabled={max !== undefined && value >= max}>+</Button>
        )}
        {showButtons && buttonPosition === 'right' && (
          <div className="bear-flex bear-flex-col bear-gap-0.5">
            <button
              type="button"
              onClick={increment}
              disabled={disabled || (max !== undefined && value >= max)}
              className="bear-px-2 bear-py-0.5 bear-bg-zinc-700 bear-text-zinc-300 hover:bear-bg-zinc-600 bear-rounded-t bear-text-xs disabled:bear-opacity-50"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={decrement}
              disabled={disabled || (min !== undefined && value <= min)}
              className="bear-px-2 bear-py-0.5 bear-bg-zinc-700 bear-text-zinc-300 hover:bear-bg-zinc-600 bear-rounded-b bear-text-xs disabled:bear-opacity-50"
            >
              ▼
            </button>
          </div>
        )}
      </div>
      {error && <p className="bear-mt-1 bear-text-xs bear-text-red-400">{error}</p>}
      {helperText && !error && <p className="bear-mt-1 bear-text-xs bear-text-zinc-500">{helperText}</p>}
    </div>
  );
};

