import { FC, useMemo } from 'react';
import { cn } from '@utils';
import type { LineChartProps } from './Chart.types';

export const LineChart: FC<LineChartProps> = ({
  data,
  height = 200,
  showLabels = true,
  showDots = true,
  smooth = true,
  fill = false,
  strokeWidth = 2,
  color = '#ec4899',
  animated = true,
  className,
  ...props
}) => {
  const points = useMemo(() => {
    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue || 1;

    return data.map((item, i) => ({
      x: (i / (data.length - 1 || 1)) * 100,
      y: 100 - ((item.value - minValue) / range) * 80 - 10,
      ...item,
    }));
  }, [data]);

  const pathD = useMemo(() => {
    if (points.length === 0) return '';

    if (smooth) {
      return points.reduce((acc, point, i, arr) => {
        if (i === 0) return `M ${point.x},${point.y}`;
        const prev = arr[i - 1];
        const cp1x = prev.x + (point.x - prev.x) / 3;
        const cp2x = point.x - (point.x - prev.x) / 3;
        return `${acc} C ${cp1x},${prev.y} ${cp2x},${point.y} ${point.x},${point.y}`;
      }, '');
    }

    return points.reduce((acc, point, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${point.x},${point.y}`, '');
  }, [points, smooth]);

  const areaD = useMemo(() => {
    if (points.length === 0) return '';
    return `${pathD} L 100,100 L 0,100 Z`;
  }, [pathD, points]);

  return (
    <div className={cn('w-full', className)} style={{ height }} {...props}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {fill && (
          <path
            d={areaD}
            fill="url(#line-gradient)"
            className={cn(animated && 'animate-fade-in')}
          />
        )}

        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth / 10}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(animated && 'animate-draw-line')}
        />

        {showDots && points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={1.5}
            fill={color}
            className={cn(animated && 'animate-scale-in')}
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </svg>

      {showLabels && (
        <div className="flex justify-between mt-2">
          {data.map((item, i) => (
            <span key={i} className="text-xs text-gray-600 dark:text-slate-300">
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
