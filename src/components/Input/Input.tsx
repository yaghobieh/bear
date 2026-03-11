import { FC, forwardRef, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@utils';
import type { InputProps } from './Input.types';
import { BearContext } from '../../context/BearProvider';
import { ClearIcon } from './components/ClearIcon';
import { applyAutoFormat } from './Input.utils';
import { validateFieldValue } from '../Form/Form.utils';

const sizeClasses = {
  sm: 'bear-h-8 bear-text-sm bear-px-3',
  md: 'bear-h-10 bear-text-base bear-px-4',
  lg: 'bear-h-12 bear-text-lg bear-px-5',
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error: errorProp,
      success,
      size = 'md',
      leftAddon,
      rightAddon,
      fullWidth = false,
      clearable = false,
      onClear,
      showCharCount = false,
      charCountMax,
      autoFormat,
      validation,
      validateOnBlur,
      validateOnChange = false,
      className,
      disabled,
      value,
      defaultValue,
      maxLength,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const context = useContext(BearContext);
    const componentStyles = context?.components?.Input;
    const rootStyle = componentStyles?.root;
    const inputStyle = componentStyles?.input;
    const labelStyle = componentStyles?.label;
    const helperStyle = componentStyles?.helper;
    const prefixStyle = componentStyles?.prefix;
    const suffixStyle = componentStyles?.suffix;

    const [internalError, setInternalError] = useState<string | null>(null);
    const validationPending = useRef(false);

    const shouldValidateOnBlur = validation ? (validateOnBlur ?? true) : false;

    const error = errorProp || internalError;
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;
    const charMax = charCountMax ?? maxLength;
    const currentLen = typeof value === 'string' ? value.length : (typeof defaultValue === 'string' ? defaultValue.length : 0);
    const isOverLimit = charMax != null && currentLen > charMax;
    const showClear = clearable && !disabled && currentLen > 0;

    const feedbackMessage = error || success || helperText;

    const runValidation = useCallback(async (val: unknown) => {
      if (!validation) return;
      validationPending.current = true;
      const result = await validateFieldValue(val, validation);
      validationPending.current = false;
      setInternalError(result);
    }, [validation]);

    useEffect(() => {
      if (errorProp) {
        setInternalError(null);
      }
    }, [errorProp]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (autoFormat) {
          const formatted = applyAutoFormat(e.target.value, autoFormat);
          if (formatted !== e.target.value) {
            e.target.value = formatted;
          }
        }
        onChange?.(e);
        if (validateOnChange && validation) {
          runValidation(e.target.value);
        }
      },
      [autoFormat, onChange, validateOnChange, validation, runValidation]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);
        if (shouldValidateOnBlur && validation) {
          runValidation(e.target.value);
        }
      },
      [onBlur, shouldValidateOnBlur, validation, runValidation]
    );

    return (
      <div className={cn('Bear-Input bear-flex bear-flex-col bear-gap-1.5', fullWidth && 'bear-w-full')} style={rootStyle}>
        {label && (
          <label className="Bear-Input__label bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-gray-300" style={labelStyle}>
            {label}
          </label>
        )}

        <div className="Bear-Input__wrapper bear-relative bear-flex bear-items-center">
          {leftAddon && (
            <div className="Bear-Input__addon Bear-Input__addon--left bear-absolute bear-left-3 bear-text-gray-500 dark:bear-text-gray-400" style={prefixStyle}>
              {leftAddon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            aria-invalid={hasError || undefined}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              'Bear-Input__field',
              'bear-w-full bear-rounded-lg bear-border bear-outline-none bear-transition-all bear-duration-200',
              'bear-bg-white bear-text-gray-900 placeholder:bear-text-gray-400',
              'bear-border-gray-300 focus:bear-ring-2 focus:bear-ring-offset-2 focus:bear-ring-offset-white',
              'dark:bear-bg-gray-800 dark:bear-text-white dark:placeholder:bear-text-gray-500 dark:bear-border-gray-600 dark:focus:bear-ring-offset-gray-900',
              hasError
                ? 'Bear-Input__field--error bear-border-red-500 focus:bear-ring-red-500'
                : hasSuccess
                  ? 'Bear-Input__field--success bear-border-green-500 focus:bear-ring-green-500'
                  : 'focus:bear-border-bear-500 focus:bear-ring-bear-500 dark:focus:bear-border-bear-500 dark:focus:bear-ring-bear-500',
              disabled && 'Bear-Input__field--disabled bear-opacity-50 bear-cursor-not-allowed',
              leftAddon && 'bear-pl-10',
              (rightAddon || showClear) && 'bear-pr-10',
              sizeClasses[size],
              className
            )}
            style={inputStyle}
            {...props}
          />

          {showClear && !rightAddon && (
            <div className="Bear-Input__addon Bear-Input__addon--right bear-absolute bear-right-3 bear-text-gray-500 dark:bear-text-gray-400" style={suffixStyle}>
              <ClearIcon onClick={onClear} />
            </div>
          )}

          {rightAddon && (
            <div className="Bear-Input__addon Bear-Input__addon--right bear-absolute bear-right-3 bear-flex bear-items-center bear-gap-1.5 bear-text-gray-500 dark:bear-text-gray-400" style={suffixStyle}>
              {showClear && <ClearIcon onClick={onClear} />}
              {rightAddon}
            </div>
          )}
        </div>

        <div className="Bear-Input__footer bear-flex bear-items-center bear-justify-between bear-gap-2">
          {feedbackMessage ? (
            <p
              className={cn(
                'Bear-Input__helper bear-text-sm bear-flex-1',
                hasError ? 'Bear-Input__helper--error bear-text-red-500'
                  : hasSuccess ? 'Bear-Input__helper--success bear-text-green-500'
                  : 'bear-text-gray-500 dark:bear-text-gray-400'
              )}
              style={helperStyle}
            >
              {feedbackMessage}
            </p>
          ) : showCharCount ? <span /> : null}

          {showCharCount && charMax != null && (
            <span
              className={cn(
                'Bear-Input__char-count bear-text-xs bear-tabular-nums bear-shrink-0',
                isOverLimit ? 'bear-text-red-500' : 'bear-text-gray-400 dark:bear-text-gray-500'
              )}
            >
              {currentLen}/{charMax}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
