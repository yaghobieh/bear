import { FC, forwardRef } from 'react';
import { cn } from '@utils';
import type { InputProps } from './Input.types';

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
      error,
      size = 'md',
      leftAddon,
      rightAddon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);

    return (
      <div className={cn('Bear-Input bear-flex bear-flex-col bear-gap-1.5', fullWidth && 'bear-w-full')}>
        {label && (
          <label className="Bear-Input__label bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-gray-300">
            {label}
          </label>
        )}

        <div className="Bear-Input__wrapper bear-relative bear-flex bear-items-center">
          {leftAddon && (
            <div className="Bear-Input__addon Bear-Input__addon--left bear-absolute bear-left-3 bear-text-gray-500 dark:bear-text-gray-400">
              {leftAddon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              'Bear-Input__field',
              'bear-w-full bear-rounded-lg bear-border bear-outline-none bear-transition-all bear-duration-200',
              'bear-bg-white bear-text-gray-900 placeholder:bear-text-gray-400',
              'bear-border-gray-300 focus:bear-ring-2 focus:bear-ring-offset-2 focus:bear-ring-offset-white',
              'dark:bear-bg-gray-800 dark:bear-text-white dark:placeholder:bear-text-gray-500 dark:bear-border-gray-600 dark:focus:bear-ring-offset-gray-900',
              hasError
                ? 'Bear-Input__field--error bear-border-red-500 focus:bear-ring-red-500'
                : 'focus:bear-border-bear-500 focus:bear-ring-bear-500 dark:focus:bear-border-bear-500 dark:focus:bear-ring-bear-500',
              disabled && 'Bear-Input__field--disabled bear-opacity-50 bear-cursor-not-allowed',
              leftAddon && 'bear-pl-10',
              rightAddon && 'bear-pr-10',
              sizeClasses[size],
              className
            )}
            {...props}
          />

          {rightAddon && (
            <div className="Bear-Input__addon Bear-Input__addon--right bear-absolute bear-right-3 bear-text-gray-500 dark:bear-text-gray-400">
              {rightAddon}
            </div>
          )}
        </div>

        {(helperText || error) && (
          <p
            className={cn(
              'Bear-Input__helper bear-text-sm',
              hasError ? 'Bear-Input__helper--error bear-text-red-500' : 'bear-text-gray-500 dark:bear-text-gray-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
