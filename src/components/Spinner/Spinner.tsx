import { FC } from 'react';
import { cn } from '../../utils/cn';
import type { EmberSize } from '../../types';
import type { SpinnerProps } from './Spinner.types';

const sizeClasses: Record<EmberSize, string> = {
  xs: 'ember-w-3 ember-h-3',
  sm: 'ember-w-4 ember-h-4',
  md: 'ember-w-6 ember-h-6',
  lg: 'ember-w-8 ember-h-8',
  xl: 'ember-w-10 ember-h-10',
};

/**
 * Spinner component for loading states
 * 
 * @example
 * ```tsx
 * <Spinner size="md" />
 * <Spinner size="lg" color="#f97316" />
 * ```
 */
export const Spinner: FC<SpinnerProps> = ({
  size = 'md',
  className,
  color = 'currentColor',
  label = 'Loading',
}) => {
  return (
    <svg
      className={cn(
        'ember-animate-spin',
        sizeClasses[size],
        className
      )}
      viewBox="0 0 24 24"
      fill="none"
      aria-label={label}
      role="status"
    >
      <circle
        className="ember-opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
      />
      <path
        className="ember-opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

