import { FC, forwardRef, useState, useCallback, useId, useContext } from 'react';
import { cn } from '@utils';
import { FORMFIELD_SIZE_CLASSES } from './FormField.const';
import type { FormFieldProps } from './FormField.types';
import { BearContext } from '../../context/BearProvider';

export const FormField: FC<FormFieldProps> = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      size = 'md',
      leftAddon,
      rightAddon,
      fullWidth = false,
      required = false,
      variant = 'outlined',
      className,
      disabled,
      value,
      defaultValue,
      placeholder,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const isFilled = variant === 'filled';
    const isStandard = variant === 'standard';

    const context = useContext(BearContext);
    const componentStyles = context?.components?.FormField;
    const rootStyle = componentStyles?.root;
    const inputStyle = componentStyles?.input;
    const labelStyle = componentStyles?.label;
    const helperStyle = componentStyles?.helper;
    const addonStyle = componentStyles?.addon;
    const variantStyle = isFilled
      ? componentStyles?.filled
      : isStandard
        ? componentStyles?.standard
        : componentStyles?.outlined;

    const [focused, setFocused] = useState(false);
    const id = useId();
    const fieldId = props.id ?? id;

    const hasValue = (value != null && value !== '') || (defaultValue != null && defaultValue !== '');
    // Match TextField behavior: label starts inside and floats only on focus/value
    const isFloating = focused || hasValue;
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;
    const sizeConfig = FORMFIELD_SIZE_CLASSES[size];
    const feedbackMessage = error || success || helperText;

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    return (
      <div className={cn('Bear-FormField bear-flex bear-flex-col bear-gap-1', fullWidth && 'bear-w-full')} style={rootStyle}>
        <div className="Bear-FormField__wrapper bear-relative bear-flex bear-items-center">
          {leftAddon && (
            <div className="Bear-FormField__addon Bear-FormField__addon--left bear-absolute bear-left-3 bear-z-10 bear-text-gray-500 dark:bear-text-gray-400" style={addonStyle}>
              {leftAddon}
            </div>
          )}

          <input
            ref={ref}
            id={fieldId}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            placeholder={isFloating ? placeholder : undefined}
            aria-invalid={hasError || undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              'Bear-FormField__input bear-peer bear-w-full bear-rounded-lg bear-border bear-outline-none bear-transition-all bear-duration-200',
              isFilled
                ? cn(
                    'bear-bg-gray-100 bear-border-transparent bear-rounded-t-lg bear-rounded-b-none bear-border-b-2',
                    'dark:bear-bg-gray-800',
                    hasError
                      ? 'bear-border-b-red-500'
                      : hasSuccess
                        ? 'bear-border-b-green-500'
                        : focused
                          ? 'bear-border-b-bear-500'
                          : 'bear-border-b-gray-400 dark:bear-border-b-gray-500'
                  )
                : isStandard
                  ? cn(
                      'bear-bg-transparent bear-rounded-none bear-border-0 bear-border-b-2',
                      hasError
                        ? 'bear-border-b-red-500'
                        : hasSuccess
                          ? 'bear-border-b-green-500'
                          : focused
                            ? 'bear-border-b-bear-500'
                            : 'bear-border-b-gray-300 dark:bear-border-b-gray-600'
                    )
                  : cn(
                    'bear-bg-white dark:bear-bg-gray-900',
                    hasError
                      ? 'bear-border-red-500 focus:bear-ring-2 focus:bear-ring-red-500/30'
                      : hasSuccess
                        ? 'bear-border-green-500 focus:bear-ring-2 focus:bear-ring-green-500/30'
                        : cn(
                            'bear-border-gray-300 dark:bear-border-gray-600',
                            'focus:bear-border-bear-500 focus:bear-ring-2 focus:bear-ring-bear-500/30',
                            'dark:focus:bear-border-bear-400'
                          )
                  ),
              'bear-text-gray-900 dark:bear-text-white placeholder:bear-text-gray-400 dark:placeholder:bear-text-gray-500',
              disabled && 'bear-opacity-50 bear-cursor-not-allowed',
              leftAddon && 'bear-pl-10',
              rightAddon && 'bear-pr-10',
              sizeConfig.field,
              isStandard && 'focus:bear-ring-0',
              className
            )}
            style={{ ...variantStyle, ...inputStyle }}
            {...props}
          />

          <label
            htmlFor={fieldId}
            className={cn(
              'Bear-FormField__label bear-absolute bear-left-0 bear-pointer-events-none bear-origin-top-left',
              'bear-transition-all bear-duration-200 bear-select-none',
              leftAddon ? 'bear-ml-10' : 'bear-ml-4',
              isFloating
                ? cn(
                    isFilled
                      ? sizeConfig.labelFloat
                      : isStandard
                        ? 'bear-top-0 bear--translate-y-1/2 bear-text-xs'
                        : 'bear-top-0 bear--translate-y-1/2 bear-text-xs bear-px-1 bear-bg-white dark:bear-bg-gray-900',
                    hasError
                      ? 'bear-text-red-500'
                      : hasSuccess
                        ? 'bear-text-green-500'
                        : focused
                          ? 'bear-text-bear-500 dark:bear-text-bear-400'
                          : 'bear-text-gray-500 dark:bear-text-gray-400'
                  )
                : cn(
                    sizeConfig.labelRest,
                    'bear--translate-y-1/2',
                    'bear-text-gray-500 dark:bear-text-gray-400'
                  ),
              disabled && 'bear-opacity-50'
            )}
            style={labelStyle}
          >
            {label}
            {required && <span className="bear-text-red-500 bear-ml-0.5">*</span>}
          </label>

          {rightAddon && (
            <div className="Bear-FormField__addon Bear-FormField__addon--right bear-absolute bear-right-3 bear-z-10 bear-text-gray-500 dark:bear-text-gray-400" style={addonStyle}>
              {rightAddon}
            </div>
          )}
        </div>

        {feedbackMessage && (
          <p
            className={cn(
              'Bear-FormField__helper bear-text-xs bear-ml-4',
              hasError
                ? 'bear-text-red-500'
                : hasSuccess
                  ? 'bear-text-green-500'
                  : 'bear-text-gray-500 dark:bear-text-gray-400'
            )}
            style={helperStyle}
          >
            {feedbackMessage}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
