import { FC } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { RingProgressProps } from './RingProgress.types';
import {
  DEFAULT_SIZE,
  DEFAULT_THICKNESS,
  ROOT_CLASS,
  TRACK_COLOR,
} from './RingProgress.const';

export const RingProgress: FC<RingProgressProps> = ({
  sections,
  size = DEFAULT_SIZE,
  thickness = DEFAULT_THICKNESS,
  roundCaps = false,
  label,
  rootColor,
  className,
  testId,
  ...rest
}) => {
  const total = sections.reduce((sum, s) => sum + s.value, 0);

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;

  let accumulated = 0;

  return (
    <div
      className={cn(ROOT_CLASS, className)}
      data-testid={testId}
      {...rest}
    >
      <svg width={size} height={size} className="bear-rotate-[-90deg]">
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          className={!rootColor ? TRACK_COLOR : undefined}
          style={rootColor ? { stroke: rootColor } : undefined}
        />
        {total > 0 &&
          sections.map((section, i) => {
            const segmentLength = (section.value / total) * circumference;
            const dashOffset = -accumulated;
            accumulated += segmentLength;

            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  strokeWidth={thickness}
                  stroke={section.color}
                  strokeDasharray={`${segmentLength} ${circumference}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap={roundCaps ? 'round' : 'butt'}
                />
                {section.tooltip && <title>{section.tooltip}</title>}
              </g>
            );
          })}
      </svg>
      {label !== undefined && (
        <div className="bear-absolute bear-inset-0 bear-flex bear-items-center bear-justify-center">
          {typeof label === 'string' ? (
            <Typography variant="body2" color="secondary">
              {label}
            </Typography>
          ) : (
            label
          )}
        </div>
      )}
    </div>
  );
};

export default RingProgress;
