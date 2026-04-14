import { FC, useMemo, useState, useRef, useCallback } from 'react';
import { cn } from '@utils';
import { Popover } from '../Popover';
import { Typography } from '../Typography';
import type { HeatmapProps, HeatmapCell } from './Heatmap.types';
import {
  DEFAULT_CELL_SIZE,
  DEFAULT_CELL_GAP,
  DEFAULT_COLOR_SCALE,
  DEFAULT_EMPTY_COLOR,
  DAY_LABELS,
  MONTH_LABELS,
  DAYS_IN_WEEK,
  LABEL_PAD,
} from './Heatmap.const';
import { getWeeks, toKey } from './Heatmap.utils';

export const Heatmap: FC<HeatmapProps> = ({
  data,
  startDate,
  endDate,
  colorScale = DEFAULT_COLOR_SCALE,
  cellSize = DEFAULT_CELL_SIZE,
  cellGap = DEFAULT_CELL_GAP,
  showDayLabels = true,
  showMonthLabels = true,
  emptyColor,
  tooltipFormat,
  onCellClick,
  renderTooltip,
  testId,
  className,
  ...rest
}) => {
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const { weeks, dataMap, maxValue } = useMemo(() => {
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(end.getFullYear() - 1, end.getMonth(), end.getDate());
    const map = new Map<string, HeatmapCell>();
    let max = 0;
    for (const d of data) {
      map.set(d.date, d);
      if (d.value > max) max = d.value;
    }
    return { weeks: getWeeks(start, end), dataMap: map, maxValue: max };
  }, [data, startDate, endDate]);

  const getColor = useCallback(
    (value: number): string => {
      if (value === 0 || maxValue === 0) return emptyColor ?? DEFAULT_EMPTY_COLOR;
      const idx = Math.min(Math.floor((value / maxValue) * (colorScale.length - 1)), colorScale.length - 1);
      return colorScale[idx];
    },
    [maxValue, emptyColor, colorScale]
  );

  const labelWidth = showDayLabels ? 28 : 0;

  const handleCellEnter = useCallback((cell: HeatmapCell | undefined) => {
    if (!cell || !renderTooltip) return;
    setHoveredCell(cell);
    setPopoverOpen(true);
  }, [renderTooltip]);

  const handleCellLeave = useCallback(() => {
    setPopoverOpen(false);
    setHoveredCell(null);
  }, []);

  return (
    <div className={cn('Bear-Heatmap relative inline-block', className)} data-testid={testId} {...rest}>
      {showMonthLabels && (
        <div className="Bear-Heatmap__months flex mb-1" style={{ paddingLeft: labelWidth }}>
          {weeks.map((week, wi) => {
            const firstDay = week[0];
            const showLabel = wi === 0 || firstDay.getDate() <= DAYS_IN_WEEK;
            return (
              <Typography
                key={wi}
                variant="caption"
                className="Bear-Heatmap__month text-gray-400 dark:text-gray-500 text-[10px]"
                style={{ width: cellSize + cellGap, textAlign: 'left' }}
              >
                {showLabel ? MONTH_LABELS[firstDay.getMonth()] : ''}
              </Typography>
            );
          })}
        </div>
      )}
      <div className="Bear-Heatmap__grid flex">
        {showDayLabels && (
          <div className="Bear-Heatmap__days flex flex-col mr-1" style={{ gap: cellGap }}>
            {DAY_LABELS.map((lbl, i) => (
              <Typography
                key={i}
                variant="caption"
                className="Bear-Heatmap__day text-gray-400 dark:text-gray-500 text-[10px] flex items-center justify-end"
                style={{ height: cellSize, width: labelWidth - LABEL_PAD }}
              >
                {lbl}
              </Typography>
            ))}
          </div>
        )}
        <div className="Bear-Heatmap__weeks flex" style={{ gap: cellGap }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="Bear-Heatmap__week flex flex-col" style={{ gap: cellGap }}>
              {week.map((day, di) => {
                const key = toKey(day);
                const cell = dataMap.get(key);
                const value = cell?.value ?? 0;
                const color = getColor(value);
                const cellEl = (
                  <div
                    key={di}
                    ref={(el) => { if (el) cellRefs.current.set(key, el); }}
                    className="Bear-Heatmap__cell rounded-sm cursor-pointer transition-transform hover:scale-125"
                    style={{ width: cellSize, height: cellSize, backgroundColor: color }}
                    title={!renderTooltip ? (cell ? (tooltipFormat ? tooltipFormat(cell) : `${key}: ${value}`) : key) : undefined}
                    onClick={() => cell && onCellClick?.(cell)}
                    onMouseEnter={() => handleCellEnter(cell)}
                    onMouseLeave={handleCellLeave}
                  />
                );

                if (renderTooltip && cell && hoveredCell?.date === cell.date) {
                  return (
                    <Popover
                      key={di}
                      content={renderTooltip(cell)}
                      trigger="hover"
                      placement="top"
                      open={popoverOpen}
                      onOpenChange={setPopoverOpen}
                      arrow={false}
                    >
                      {cellEl}
                    </Popover>
                  );
                }

                return cellEl;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
