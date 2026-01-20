import { FC } from 'react';
import { cn } from '../../utils/cn';
import type { ProgressProps } from './Progress.types';

const sizeClasses = {
  sm: 'bear-h-1.5',
  md: 'bear-h-2.5',
  lg: 'bear-h-4',
};

const colorClasses = {
  default: 'bear-bg-pink-500',
  success: 'bear-bg-green-500',
  warning: 'bear-bg-yellow-500',
  danger: 'bear-bg-red-500',
  info: 'bear-bg-blue-500',
};

/**
 * Progress - Progress bar with multiple variants
 * 
 * @example
 * ```tsx
 * <Progress value={75} showLabel />
 * <Progress value={50} color="success" striped animated />
 * <Progress indeterminate />
 * ```
 */
export const Progress: FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'default',
  showLabel = false,
  labelPosition = 'outside',
  striped = false,
  animated = false,
  indeterminate = false,
  className,
  testId,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={cn('bear-w-full', className)} data-testid={testId}>
      {showLabel && labelPosition === 'outside' && (
        <div className="bear-flex bear-justify-between bear-mb-1">
          <span className="bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-gray-200">
            Progress
          </span>
          <span className="bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-gray-200">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div
        className={cn(
          'bear-w-full bear-bg-gray-200 dark:bear-bg-gray-700 bear-rounded-full bear-overflow-hidden',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'bear-h-full bear-rounded-full bear-transition-all bear-duration-300 bear-ease-out',
            'bear-flex bear-items-center bear-justify-center',
            colorClasses[color],
            striped && 'bear-bg-stripes',
            animated && 'bear-animate-stripes',
            indeterminate && 'bear-animate-indeterminate'
          )}
          style={{ 
            width: indeterminate ? '50%' : `${percentage}%`,
            backgroundSize: striped ? '1rem 1rem' : undefined,
            backgroundImage: striped 
              ? 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)'
              : undefined,
          }}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {showLabel && labelPosition === 'inside' && size === 'lg' && !indeterminate && (
            <span className="bear-text-xs bear-font-medium bear-text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

