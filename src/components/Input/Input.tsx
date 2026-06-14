import { FC, forwardRef, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { cn, resolveBearId, useBearId } from '@utils';
import type { InputProps } from './Input.types';
import { BearContext } from '../../context/BearProvider';
import { ClearIcon } from './components/ClearIcon';
import { applyAutoFormat } from './Input.utils';
import { validateFieldValue } from '../Form/Form.utils';
import {
  INPUT_MULTILINE_DEFAULT_ROWS,
  INPUT_MULTILINE_MIN_ROWS,
  INPUT_ROOT_CLASS,
  INPUT_TEXT_CLASSES,
  INPUT_WRAPPER_HEIGHT_CLASSES,
} from './Input.const';

export const Input: FC<InputProps> = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      label,
      helperText,
      error: errorProp,
      success,
      size = 'md',
      variant: _variant,
      radius: _radius,
      InputProps,
      leftAddon,
      rightAddon,
      prefix: _prefix,
      suffix: _suffix,
      fullWidth = false,
      clearable = false,
      onClear,
      showCharCount = false,
      charCountMax,
      autoFormat,
      validation,
      validateOnBlur,
      validateOnChange = false,
      loading: _loading,
      copyable: _copyable,
      onCopy: _onCopy,
      floatingLabel: _floatingLabel,
      multiline = false,
      rows,
      minRows = INPUT_MULTILINE_MIN_ROWS,
      maxRows,
      readOnly,
      inputRef,
      inputProps,
      id,
      testId,
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
    const generatedId = useBearId('Input');
    const domId = resolveBearId(id, generatedId);

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

    const inputTextClasses = INPUT_TEXT_CLASSES;
    const wrapperHeightClasses = INPUT_WRAPPER_HEIGHT_CLASSES;
    const shouldValidateOnBlur = validation ? (validateOnBlur ?? true) : false;

    const error = errorProp || internalError;
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;
    const charMax = charCountMax ?? maxLength;
    const currentLen = typeof value === 'string' ? value.length : (typeof defaultValue === 'string' ? defaultValue.length : 0);
    const isOverLimit = charMax != null && currentLen > charMax;
    const showClear = clearable && !disabled && currentLen > 0;

    const startSlot = InputProps?.startAdornment ?? leftAddon;
    const endSlot = InputProps?.endAdornment ?? rightAddon;
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
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (autoFormat && !multiline) {
          const formatted = applyAutoFormat(e.target.value, autoFormat);
          if (formatted !== e.target.value) {
            e.target.value = formatted;
          }
        }
        onChange?.(e as React.ChangeEvent<HTMLInputElement>);
        if (validateOnChange && validation) {
          runValidation(e.target.value);
        }
      },
      [autoFormat, multiline, onChange, validateOnChange, validation, runValidation]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onBlur?.(e as React.FocusEvent<HTMLInputElement>);
        if (shouldValidateOnBlur && validation) {
          runValidation(e.target.value);
        }
      },
      [onBlur, shouldValidateOnBlur, validation, runValidation]
    );

    const fieldClasses = cn(
      'Bear-Input__field',
      'bear-flex-1 bear-min-w-0 bear-border-0 bear-outline-none bear-bg-transparent',
      'placeholder:opacity-100 placeholder:[color:var(--bear-text-muted)]',
      inputTextClasses[size],
      multiline && 'bear-resize-y bear-py-2 bear-min-h-0 bear-h-auto',
      className
    );

    const fieldStyle = {
      color: 'var(--bear-text-primary)',
      ...inputStyle,
    };

    const textareaRows = rows ?? minRows ?? INPUT_MULTILINE_DEFAULT_ROWS;

    return (
      <div
        id={domId}
        data-testid={testId}
        className={cn(INPUT_ROOT_CLASS, 'bear-flex bear-flex-col bear-gap-1.5', fullWidth && 'bear-w-full')}
        style={rootStyle}
      >
        {label && (
          <label className="Bear-Input__label bear-text-sm bear-font-medium" style={{ color: 'var(--bear-text-secondary)', ...labelStyle }}>
            {label}
          </label>
        )}

        <div
          className={cn(
            'Bear-Input__wrapper bear-flex bear-items-center bear-rounded-lg bear-border bear-overflow-hidden bear-transition-all bear-duration-200',
            'focus-within:bear-ring-2 focus-within:bear-ring-offset-2',
            'focus-within:bear-ring-offset-[var(--bear-bg-primary)]',
            hasError
              ? 'Bear-Input__wrapper--error bear-border-red-500 focus-within:bear-ring-red-500'
              : hasSuccess
                ? 'Bear-Input__wrapper--success bear-border-green-500 focus-within:bear-ring-green-500'
                : 'focus-within:bear-border-bear-500 focus-within:bear-ring-bear-500 dark:focus-within:bear-border-bear-500 dark:focus-within:bear-ring-bear-500',
            disabled && 'bear-opacity-50 bear-cursor-not-allowed',
            !multiline && wrapperHeightClasses[size]
          )}
          style={{
            backgroundColor: 'var(--bear-bg-primary)',
            borderColor: hasError ? undefined : hasSuccess ? undefined : 'var(--bear-border-default)',
          }}
        >
          {startSlot && (
            <div
              className="Bear-Input__addon Bear-Input__addon--left bear-flex bear-items-center bear-self-stretch bear-shrink-0 bear-px-3 bear-text-sm bear-font-medium bear-select-none bear-pointer-events-none"
              style={{
                backgroundColor: 'var(--bear-bg-tertiary)',
                borderRight: '1px solid var(--bear-border-default)',
                color: 'var(--bear-text-secondary)',
                ...prefixStyle,
              }}
            >
              {startSlot}
            </div>
          )}

          {multiline ? (
            <textarea
              ref={(node) => {
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
                if (typeof inputRef === 'function') inputRef(node);
                else if (inputRef) (inputRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
              }}
              id={`${domId}-field`}
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              defaultValue={defaultValue}
              maxLength={maxLength}
              rows={textareaRows}
              aria-invalid={hasError || undefined}
              className={fieldClasses}
              style={fieldStyle}
              {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e)}
            />
          ) : (
            <input
              ref={(node) => {
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
                if (typeof inputRef === 'function') inputRef(node);
                else if (inputRef) (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
              }}
              id={`${domId}-field`}
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              defaultValue={defaultValue}
              maxLength={maxLength}
              aria-invalid={hasError || undefined}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClasses}
              style={fieldStyle}
              {...inputProps}
              {...props}
            />
          )}

          {showClear && (
            <div
              className="Bear-Input__clear bear-flex bear-items-center bear-self-stretch bear-shrink-0 bear-px-2 bear-cursor-pointer"
              style={{ color: 'var(--bear-text-muted)' }}
            >
              <ClearIcon onClick={onClear} />
            </div>
          )}

          {endSlot && (
            <div
              className="Bear-Input__addon Bear-Input__addon--right bear-flex bear-items-center bear-self-stretch bear-shrink-0 bear-px-3 bear-gap-1.5"
              style={{
                backgroundColor: 'var(--bear-bg-tertiary)',
                borderLeft: '1px solid var(--bear-border-default)',
                color: 'var(--bear-text-secondary)',
                ...suffixStyle,
              }}
            >
              {endSlot}
            </div>
          )}
        </div>

        <div className="Bear-Input__footer bear-flex bear-items-center bear-justify-between bear-gap-2">
          {feedbackMessage ? (
            <p
              className={cn(
                'Bear-Input__helper bear-text-sm bear-flex-1',
                hasError && 'Bear-Input__helper--error bear-text-red-500',
                hasSuccess && 'Bear-Input__helper--success bear-text-green-500'
              )}
              style={{
                ...(hasError || hasSuccess ? {} : { color: 'var(--bear-text-muted)' }),
                ...helperStyle,
              }}
            >
              {feedbackMessage}
            </p>
          ) : showCharCount ? <span /> : null}

          {showCharCount && charMax != null && (
            <span
              className={cn(
                'Bear-Input__char-count bear-text-xs bear-tabular-nums bear-shrink-0',
                isOverLimit && 'bear-text-red-500'
              )}
              style={!isOverLimit ? { color: 'var(--bear-text-muted)' } : undefined}
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
