import { FC, useRef, useState, useEffect, useCallback, KeyboardEvent, ClipboardEvent } from 'react';
import type { OTPInputProps } from './OTPInput.types';
import { OTP_CELL_RECT_CLASSES, OTP_VARIANT_FRAME } from './OTPInput.const';
import { cn } from '@utils';

export const OTPInput: FC<OTPInputProps> = ({
  length = 6,
  value: controlledValue,
  onChange,
  onComplete,
  onFinish,
  disabled = false,
  error = false,
  autoFocus = true,
  mask = false,
  size = 'md',
  separator,
  className,
  variant = 'boxed',
  layout = 'horizontal',
  stackOnNarrow = true,
  cancelAutoJump = false,
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

  const emitComplete = useCallback((joined: string) => {
    onComplete?.(joined);
    onFinish?.(joined);
  }, [onComplete, onFinish]);

  const updateValues = useCallback((newValues: string[]) => {
    setValues(newValues);
    const joined = newValues.join('');
    onChange?.(joined);
    if (joined.length === length && newValues.every(v => v !== '')) {
      emitComplete(joined);
    }
  }, [onChange, emitComplete, length]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.slice(-1);
    if (!/^\d*$/.test(char) && char !== '') return;

    const newValues = [...values];
    newValues[index] = char;
    updateValues(newValues);

    if (char && index < length - 1 && !cancelAutoJump) {
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

  const frame = OTP_VARIANT_FRAME[variant];
  const sizeCfg = OTP_CELL_RECT_CLASSES[size];
  const cellSize = variant === 'circle' ? sizeCfg.circle : sizeCfg.rect;

  return (
    <div
      className={cn(
        layout === 'vertical'
          ? 'bear-flex bear-flex-col bear-items-center bear-gap-2'
          : variant === 'circle'
            ? 'bear-flex bear-flex-row bear-flex-wrap bear-justify-center bear-gap-2'
            : stackOnNarrow
              ? 'max-sm:bear-grid max-sm:bear-grid-cols-3 max-sm:bear-gap-2 max-sm:bear-justify-items-center sm:bear-flex sm:bear-flex-row sm:bear-flex-wrap sm:bear-justify-center sm:bear-gap-2'
              : 'bear-flex bear-flex-row bear-flex-wrap bear-justify-center bear-gap-2',
        className,
      )}
    >
      {values.map((val, index) => (
        <div
          key={index}
          className={cn(
            'bear-flex bear-items-center',
            layout === 'vertical' ? 'bear-flex-col' : 'bear-flex-row',
          )}
        >
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
              'bear-text-center bear-font-semibold bear-outline-none bear-transition-all',
              cellSize,
              frame,
              'bear-bg-[var(--bear-bg-primary,#18181b)] bear-text-[var(--bear-text-primary,#fafafa)]',
              error ? 'bear-border-red-500' : 'bear-border-zinc-600 focus:bear-border-pink-500 focus:bear-ring-2 focus:bear-ring-pink-500/30',
              disabled && 'bear-opacity-50 bear-cursor-not-allowed',
            )}
          />
          {separator && (index + 1) % separator === 0 && index < length - 1 && (
            <span
              className={cn(
                'bear-text-zinc-500 bear-text-xl',
                layout === 'vertical' ? 'bear-my-1' : 'bear-mx-2',
              )}
            >
              —
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
