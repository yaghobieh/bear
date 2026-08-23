import { cn } from '@utils';
import { BOOLEAN_FALSE, ZERO } from '@const';
import type { RingProgressProps } from './RingProgress.types';
import { DEFAULT_SIZE, DEFAULT_THICKNESS } from './RingProgress.const';
import {
  FILL_NONE,
  getRingMetrics,
  getRingSegmentLength,
  getRingTotal,
  renderRingLabel,
  STROKE_LINECAP_BUTT,
  STROKE_LINECAP_ROUND,
} from './RingProgress.utils';

export const RingProgress = (props: RingProgressProps) => {
  const {
    sections,
    size = DEFAULT_SIZE,
    thickness = DEFAULT_THICKNESS,
    roundCaps = BOOLEAN_FALSE,
    label,
    rootColor,
    className,
    testId,
    ...rest
  } = props;

  const total = getRingTotal(sections);
  const { radius, circumference, center } = getRingMetrics(size, thickness);
  let accumulated = ZERO;
  const lineCap = roundCaps ? STROKE_LINECAP_ROUND : STROKE_LINECAP_BUTT;

  return (
    <div
      className={cn('Bear-RingProgress bear-relative bear-inline-flex', className)}
      data-testid={testId}
      {...rest}
    >
      <svg width={size} height={size} className="bear-rotate-[-90deg]">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill={FILL_NONE}
          strokeWidth={thickness}
          className={!rootColor ? 'bear-stroke-gray-200 dark:bear-stroke-zinc-700' : undefined}
          stroke={rootColor}
        />
        {total > ZERO &&
          sections.map((section, index) => {
            const segmentLength = getRingSegmentLength(section.value, total, circumference);
            const dashOffset = -accumulated;
            accumulated += segmentLength;

            return (
              <g key={index}>
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill={FILL_NONE}
                  strokeWidth={thickness}
                  stroke={section.color}
                  strokeDasharray={`${segmentLength} ${circumference}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap={lineCap}
                />
                {section.tooltip && <title>{section.tooltip}</title>}
              </g>
            );
          })}
      </svg>
      {label !== undefined && (
        <div className="bear-absolute bear-inset-0 bear-flex bear-items-center bear-justify-center">
          {renderRingLabel(label)}
        </div>
      )}
    </div>
  );
};
