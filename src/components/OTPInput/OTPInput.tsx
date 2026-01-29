import { FC, useRef, useState, useEffect, useCallback, KeyboardEvent, ClipboardEvent } from 'react';
import { OTPInputProps } from './OTPInput.types';
import { cn } from '@utils';

export const OTPInput: FC<OTPInputProps> = ({
  length = 6,
  value: controlledValue,
  onChange,
  onComplete,
  disabled = false,
  error = false,
  autoFocus = true,
  mask = false,
  size = 'md',
  separator,
  className,
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValues(controlledValue.split('').concat(Array(length - controlledValue.length).fill('')).slice(0, length));
    }
  }, [controlledValue, length]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const updateValues = useCallback((newValues: string[]) => {
    setValues(newValues);
    const joined = newValues.join('');
    onChange?.(joined);
    if (joined.length === length && newValues.every(v => v !== '')) {
      onComplete?.(joined);
    }
  }, [onChange, onComplete, length]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.slice(-1);
    if (!/^\d*$/.test(char) && char !== '') return;

    const newValues = [...values];
    newValues[index] = char;
    updateValues(newValues);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (values[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newValues = [...values];
        newValues[index - 1] = '';
        updateValues(newValues);
      } else {
        const newValues = [...values];
        newValues[index] = '';
        updateValues(newValues);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    const newValues = pastedData.split('').concat(Array(length - pastedData.length).fill(''));
    updateValues(newValues);
    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();
  };

  const sizeClasses = {
    sm: 'bear-w-8 bear-h-10 bear-text-lg',
    md: 'bear-w-10 bear-h-12 bear-text-xl',
    lg: 'bear-w-12 bear-h-14 bear-text-2xl',
  };

  return (
    <div className={cn('bear-flex bear-items-center bear-gap-2', className)}>
      {values.map((val, index) => (
        <div key={index} className="bear-flex bear-items-center">
          <input
            ref={(el) => { inputRefs.current[index] = el; }}
            type={mask ? 'password' : 'text'}
            inputMode="numeric"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              'bear-text-center bear-font-semibold bear-rounded-lg bear-border bear-bg-zinc-800 bear-text-white bear-outline-none bear-transition-all',
              sizeClasses[size],
              error ? 'bear-border-red-500' : 'bear-border-zinc-600 focus:bear-border-pink-500 focus:bear-ring-2 focus:bear-ring-pink-500/30',
              disabled && 'bear-opacity-50 bear-cursor-not-allowed'
            )}
          />
          {separator && (index + 1) % separator === 0 && index < length - 1 && (
            <span className="bear-mx-2 bear-text-zinc-500 bear-text-xl">-</span>
          )}
        </div>
      ))}
    </div>
  );
};

