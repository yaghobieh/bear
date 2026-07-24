import { FC } from 'react';
import type { ProgressProps } from './Progress.types';
import {
  PROGRESS_ROOT_CLASS,
  PROGRESS_SIZE_CLASSES,
  PROGRESS_COLOR_CLASSES,
  PROGRESS_BUFFER_CLASSES,
  PROGRESS_TRACK_CLASSES,
  PROGRESS_DEFAULT_LABEL,
} from './Progress.const';
import { cn, resolveBearId, useBearId } from '@utils';

export const Progress: FC<ProgressProps> = (props) => {
  const {
    id,
    value,
    max = 100,
    bufferValue,
    size = 'md',
    color = 'default',
    showLabel = false,
    label = PROGRESS_DEFAULT_LABEL,
    labelPosition = 'outside',
    striped = false,
    animated = false,
    indeterminate = false,
    className,
    testId,
  } = props;

  const generatedId = useBearId('Progress');
  const domId = resolveBearId(id, generatedId);
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const bufferPercentage =
    bufferValue == null
      ? null
      : Math.min(100, Math.max(percentage, Math.max(0, (bufferValue / max) * 100)));

  return (
    <div
      id={domId}
      className={cn(PROGRESS_ROOT_CLASS, 'bear-w-full', className)}
      data-testid={testId}
    >
      {showLabel && labelPosition === 'outside' && (
        <div className={`${PROGRESS_ROOT_CLASS}__label-row bear-flex bear-justify-between bear-mb-1`}>
          <span className="bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-gray-200">
            {label}
          </span>
          <span className="bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-gray-200">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div className={cn(`${PROGRESS_ROOT_CLASS}__track`, PROGRESS_TRACK_CLASSES, PROGRESS_SIZE_CLASSES[size])}>
        {bufferPercentage != null && !indeterminate && (
          <div
            className={cn(
              `${PROGRESS_ROOT_CLASS}__buffer`,
              'bear-absolute bear-inset-y-0 bear-left-0 bear-rounded-full',
              PROGRESS_BUFFER_CLASSES
            )}
            style={{ width: `${bufferPercentage}%` }}
          />
        )}
        <div
          className={cn(
            `${PROGRESS_ROOT_CLASS}__bar`,
            'bear-relative bear-h-full bear-rounded-full bear-transition-all bear-duration-300 bear-ease-out',
            'bear-flex bear-items-center bear-justify-center',
            PROGRESS_COLOR_CLASSES[color],
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
          aria-label={label}
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
