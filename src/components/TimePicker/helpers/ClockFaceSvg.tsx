import { FC } from 'react';
import { cn } from '@utils';
import { CLOCK_CENTER, CLOCK_RADIUS } from '../TimePicker.constants';

export interface ClockFaceSvgProps {
  /** Clock face values (hours or minutes) */
  values: readonly number[] | number[];
  /** Whether in hour mode (different angle calc) */
  isHourMode: boolean;
  /** Format: 12h or 24h */
  format: '12h' | '24h';
  /** Current selected hour (for hour mode) */
  selectedHour: number;
  /** Current selected minute (for minute mode) */
  selectedMinute: number;
  /** Callback when value is clicked */
  onSelect: (v: number) => void;
  /** Optional class name */
  className?: string;
}

export const ClockFaceSvg: FC<ClockFaceSvgProps> = ({
  values,
  isHourMode,
  format,
  selectedHour,
  selectedMinute,
  onSelect,
  className,
}) => {
  const getAngle = (idx: number) => {
    if (isHourMode) return (idx * 30 - 90) * (Math.PI / 180);
    return (idx * (360 / values.length) - 90) * (Math.PI / 180);
  };

  const handAngle = isHourMode
    ? (format === '12h' ? (selectedHour === 12 ? 0 : selectedHour % 12) : selectedHour) * 30 - 90
    : selectedMinute * 6 - 90;
  const handRad = (handAngle * Math.PI) / 180;

  return (
    <svg viewBox="0 0 200 200" className={cn('Bear-TimePicker__clock-face bear-w-full bear-h-full', className)}>
      <circle
        cx={CLOCK_CENTER}
        cy={CLOCK_CENTER}
        r={CLOCK_RADIUS}
        className="Bear-TimePicker__clock-face-circle bear-fill-none bear-stroke-gray-200 dark:bear-stroke-zinc-700 bear-stroke-2"
      />
      {values.map((v, i) => {
        const angle = getAngle(i);
        const x = CLOCK_CENTER + CLOCK_RADIUS * 0.85 * Math.cos(angle);
        const y = CLOCK_CENTER + CLOCK_RADIUS * 0.85 * Math.sin(angle);
        const isSelected = isHourMode
          ? (format === '12h' ? (v === 12 ? selectedHour === 12 : selectedHour % 12 === v) : selectedHour === v)
          : selectedMinute === v;
        return (
          <g
            key={v}
            onClick={() => onSelect(v)}
            className="Bear-TimePicker__clock-face-item bear-cursor-pointer"
          >
            {isSelected && (
              <circle cx={x} cy={y} r={14} className="Bear-TimePicker__clock-face-dot bear-fill-blue-500" />
            )}
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={cn(
                'Bear-TimePicker__clock-face-text bear-text-sm bear-font-medium bear-pointer-events-none',
                isSelected ? 'bear-fill-white' : 'bear-fill-gray-700 dark:bear-fill-zinc-300'
              )}
            >
              {typeof v === 'number' ? v.toString().padStart(2, '0') : v}
            </text>
          </g>
        );
      })}
      <line
        x1={CLOCK_CENTER}
        y1={CLOCK_CENTER}
        x2={CLOCK_CENTER + CLOCK_RADIUS * 0.6 * Math.cos(handRad)}
        y2={CLOCK_CENTER + CLOCK_RADIUS * 0.6 * Math.sin(handRad)}
        className="Bear-TimePicker__clock-face-hand bear-stroke-blue-500 bear-stroke-2"
        strokeLinecap="round"
      />
    </svg>
  );
};
