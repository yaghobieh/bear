import { FC } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { InputGroupProps } from './InputGroup.types';

export const InputGroup: FC<InputGroupProps> = ({
  label,
  description,
  error,
  helperText,
  required = false,
  fullWidth = false,
  children,
  className,
  htmlFor,
  testId,
}) => {
  const hasError = Boolean(error);
  const feedbackMessage = error || helperText;

  return (
    <div
      className={cn('Bear-InputGroup bear-flex bear-flex-col bear-gap-1.5', fullWidth && 'bear-w-full', className)}
      data-testid={testId}
    >
      {label && (
        <label htmlFor={htmlFor} className="Bear-InputGroup__label">
          <Typography
            variant="body2"
            className="bear-font-medium bear-text-gray-700 dark:bear-text-gray-300"
            inline
          >
            {label}
            {required && (
              <span className="Bear-InputGroup__required bear-text-red-500 bear-ml-0.5" aria-hidden="true">*</span>
            )}
          </Typography>
        </label>
      )}

      {description && (
        <Typography
          variant="caption"
          className="Bear-InputGroup__description bear-text-gray-500 dark:bear-text-gray-400"
        >
          {description}
        </Typography>
      )}

      <div className="Bear-InputGroup__content">
        {children}
      </div>

      {feedbackMessage && (
        <Typography
          variant="body2"
          className={cn(
            'Bear-InputGroup__helper',
            hasError ? 'bear-text-red-500' : 'bear-text-gray-500 dark:bear-text-gray-400'
          )}
          role={hasError ? 'alert' : undefined}
        >
          {feedbackMessage}
        </Typography>
      )}
    </div>
  );
};

export default InputGroup;
