import { FC, forwardRef } from 'react';
import { cn } from '../../utils/cn';
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
      <div className={cn('bear-flex bear-flex-col bear-gap-1.5', fullWidth && 'bear-w-full')}>
        {label && (
          <label className="bear-text-sm bear-font-medium bear-text-gray-300">
            {label}
          </label>
        )}

        <div className="bear-relative bear-flex bear-items-center">
          {leftAddon && (
            <div className="bear-absolute bear-left-3 bear-text-gray-400">
              {leftAddon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              'bear-w-full bear-rounded-lg bear-border bear-bg-gray-800',
              'bear-text-white placeholder:bear-text-gray-500',
              'bear-outline-none bear-transition-all bear-duration-200',
              'focus:bear-ring-2 focus:bear-ring-offset-2 focus:bear-ring-offset-gray-900',
              hasError
                ? 'bear-border-red-500 focus:bear-ring-red-500'
                : 'bear-border-gray-600 focus:bear-border-bear-500 focus:bear-ring-bear-500',
              disabled && 'bear-opacity-50 bear-cursor-not-allowed',
              leftAddon && 'bear-pl-10',
              rightAddon && 'bear-pr-10',
              sizeClasses[size],
              className
            )}
            {...props}
          />

          {rightAddon && (
            <div className="bear-absolute bear-right-3 bear-text-gray-400">
              {rightAddon}
            </div>
          )}
        </div>

        {(helperText || error) && (
          <p
            className={cn(
              'bear-text-sm',
              hasError ? 'bear-text-red-500' : 'bear-text-gray-400'
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

