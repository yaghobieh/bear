import { FC } from 'react';
import { cn } from '@utils';
import { CLOCK_CENTER, CLOCK_RADIUS } from '../TimePicker.constants';

const HIT_AREA_RADIUS = 16;
const SELECTED_DOT_RADIUS = 14;
const LABEL_POSITION_RATIO = 0.85;
const HAND_LENGTH_RATIO = 0.6;
const HOUR_ANGLE_STEP = 30;
const MINUTE_ANGLE_OFFSET = 90;
const DEG_TO_RAD = Math.PI / 180;

export interface ClockFaceSvgProps {
  values: readonly number[] | number[];
  isHourMode: boolean;
  format: '12h' | '24h';
  selectedHour: number;
  selectedMinute: number;
  onSelect: (v: number) => void;
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
    if (isHourMode) return (idx * HOUR_ANGLE_STEP - MINUTE_ANGLE_OFFSET) * DEG_TO_RAD;
    return (idx * (360 / values.length) - MINUTE_ANGLE_OFFSET) * DEG_TO_RAD;
  };

  const handAngle = isHourMode
    ? (format === '12h' ? (selectedHour === 12 ? 0 : selectedHour % 12) : selectedHour) * HOUR_ANGLE_STEP - MINUTE_ANGLE_OFFSET
    : selectedMinute * 6 - MINUTE_ANGLE_OFFSET;
  const handRad = handAngle * DEG_TO_RAD;

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
        const x = CLOCK_CENTER + CLOCK_RADIUS * LABEL_POSITION_RATIO * Math.cos(angle);
        const y = CLOCK_CENTER + CLOCK_RADIUS * LABEL_POSITION_RATIO * Math.sin(angle);
        const isSelected = isHourMode
          ? (format === '12h' ? (v === 12 ? selectedHour === 12 : selectedHour % 12 === v) : selectedHour === v)
          : selectedMinute === v;
        return (
          <g
            key={v}
            onClick={() => onSelect(v)}
            className="Bear-TimePicker__clock-face-item bear-cursor-pointer"
          >
            <circle cx={x} cy={y} r={HIT_AREA_RADIUS} fill="transparent" />
            {isSelected && (
              <circle cx={x} cy={y} r={SELECTED_DOT_RADIUS} className="Bear-TimePicker__clock-face-dot bear-fill-pink-500" />
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
        x2={CLOCK_CENTER + CLOCK_RADIUS * HAND_LENGTH_RATIO * Math.cos(handRad)}
        y2={CLOCK_CENTER + CLOCK_RADIUS * HAND_LENGTH_RATIO * Math.sin(handRad)}
        className="Bear-TimePicker__clock-face-hand bear-stroke-pink-500 bear-stroke-2"
        strokeLinecap="round"
      />
    </svg>
  );
};
