import { FC, useMemo } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { TimelineChartProps } from './TimelineChart.types';
import { DEFAULT_BAR_HEIGHT, DEFAULT_BAR_GAP, DEFAULT_AXIS_TICKS, LABEL_WIDTH, DEFAULT_COLORS, MIN_BAR_WIDTH } from './TimelineChart.const';

export const TimelineChart: FC<TimelineChartProps> = ({
  items,
  min: propMin,
  max: propMax,
  barHeight = DEFAULT_BAR_HEIGHT,
  barGap = DEFAULT_BAR_GAP,
  showAxis = true,
  axisTicks = DEFAULT_AXIS_TICKS,
  formatTick,
  onItemClick,
  testId,
  className,
  ...rest
}) => {
  const { min, max, ticks } = useMemo(() => {
    let lo = propMin ?? Infinity;
    let hi = propMax ?? -Infinity;
    for (const item of items) {
      if (item.start < lo) lo = item.start;
      if (item.end > hi) hi = item.end;
    }
    if (!isFinite(lo)) lo = 0;
    if (!isFinite(hi)) hi = 100;
    const step = (hi - lo) / (axisTicks - 1);
    const t = Array.from({ length: axisTicks }, (_, i) => lo + step * i);
    return { min: lo, max: hi, ticks: t };
  }, [items, propMin, propMax, axisTicks]);

  const range = max - min || 1;

  return (
    <div className={cn('Bear-TimelineChart w-full', className)} data-testid={testId} {...rest}>
      <div className="Bear-TimelineChart__header flex">
        <div style={{ width: LABEL_WIDTH }} className="flex-shrink-0" />
        {showAxis && (
          <div className="Bear-TimelineChart__axis flex-1 flex justify-between mb-2">
            {ticks.map((t, i) => (
              <Typography key={i} variant="caption" className="Bear-TimelineChart__tick text-gray-400 dark:text-gray-500 text-[10px]">
                {formatTick ? formatTick(t) : Math.round(t)}
              </Typography>
            ))}
          </div>
        )}
      </div>

      {items.map((item, i) => {
        const leftPct = ((item.start - min) / range) * 100;
        const widthPct = ((item.end - item.start) / range) * 100;
        const color = item.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];

        return (
          <div
            key={i}
            className="Bear-TimelineChart__row flex items-center"
            style={{ height: barHeight, marginBottom: barGap }}
          >
            <div style={{ width: LABEL_WIDTH }} className="Bear-TimelineChart__label flex-shrink-0 pr-3 overflow-hidden">
              <Typography variant="caption" className="truncate text-gray-700 dark:text-gray-300">
                {item.label}
              </Typography>
            </div>
            <div className="Bear-TimelineChart__track flex-1 relative h-full bg-gray-100 dark:bg-zinc-800 rounded">
              <div
                className="Bear-TimelineChart__bar absolute top-0 h-full rounded cursor-pointer transition-opacity hover:opacity-80"
                style={{
                  left: `${leftPct}%`,
                  width: `${widthPct}%`,
                  backgroundColor: color,
                  minWidth: MIN_BAR_WIDTH,
                }}
                title={item.tooltip ?? `${item.label}: ${item.start} - ${item.end}`}
                onClick={() => onItemClick?.(item, i)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
