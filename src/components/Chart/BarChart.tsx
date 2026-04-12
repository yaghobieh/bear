import { FC } from 'react';
import { cn } from '@utils';
import type { BarChartProps } from './Chart.types';
import { getChartColor } from './Chart.utils';

export const BarChart: FC<BarChartProps> = ({
  data,
  height = 200,
  showLabels = true,
  showValues = false,
  animated = true,
  color,
  orientation = 'vertical',
  barRadius = 4,
  barGap = 0.2,
  className,
  ...props
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className={cn('w-full', className)} style={{ height }} {...props}>
      {orientation === 'vertical' ? (
        <div className="flex items-end justify-between h-full" style={{ gap: `${barGap}rem` }}>
          {data.map((item, i) => {
            const barHeight = (item.value / maxValue) * 100;
            const barColor = getChartColor(i, item.color || color);

            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className={cn(
                      'w-full transition-all duration-500 ease-out',
                      animated && 'animate-grow-up'
                    )}
                    style={{
                      height: `${barHeight}%`,
                      backgroundColor: barColor,
                      borderRadius: `${barRadius}px ${barRadius}px 0 0`,
                      opacity: 0.9,
                    }}
                  />
                </div>
                {showValues && (
                  <span className="text-xs text-gray-500 dark:text-slate-400">
                    {item.value}
                  </span>
                )}
                {showLabels && (
                  <span className="text-xs text-gray-600 dark:text-slate-300 truncate max-w-full">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full" style={{ gap: `${barGap}rem` }}>
          {data.map((item, i) => {
            const barWidth = (item.value / maxValue) * 100;
            const barColor = getChartColor(i, item.color || color);

            return (
              <div key={i} className="flex-1 flex items-center gap-2">
                {showLabels && (
                  <span className="text-xs text-gray-600 dark:text-slate-300 w-16 truncate">
                    {item.label}
                  </span>
                )}
                <div className="flex-1 h-full flex items-center">
                  <div
                    className={cn(
                      'h-3/4 transition-all duration-500 ease-out',
                      animated && 'animate-grow-right'
                    )}
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: barColor,
                      borderRadius: `0 ${barRadius}px ${barRadius}px 0`,
                      opacity: 0.9,
                    }}
                  />
                </div>
                {showValues && (
                  <span className="text-xs text-gray-500 dark:text-slate-400 w-10 text-right">
                    {item.value}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
