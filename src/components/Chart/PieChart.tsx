import { FC, useCallback, useMemo, useState } from 'react';
import { cn } from '@utils';
import { Portal } from '../Portal';
import { Card, CardBody, CardHeader } from '../Card';
import type { PieChartProps } from './Chart.types';
import { getChartColor } from './Chart.utils';

type SliceTooltipState = {
  x: number;
  y: number;
  index: number;
  label: string;
  value: number;
  pct: number;
};

const PIE_OUTER_RADIUS = 45;

export const PieChart: FC<PieChartProps> = ({
  data,
  height = 200,
  showLabels = true,
  innerRadius = 0,
  startAngle = -90,
  padAngle = 2,
  animated = true,
  onSliceClick,
  onSliceHover,
  showSliceTooltip = true,
  sliceTooltipTitle,
  sliceTooltipDescription,
  sliceTooltipContent,
  className,
  ...props
}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const [tip, setTip] = useState<SliceTooltipState | null>(null);

  const updateTip = useCallback(
    (clientX: number, clientY: number, index: number) => {
      const item = data[index];
      onSliceHover?.(item, index);
      if (!showSliceTooltip) return;
      const pct = Math.round((item.value / total) * 100);
      setTip({ x: clientX, y: clientY, index, label: item.label, value: item.value, pct });
    },
    [data, onSliceHover, showSliceTooltip, total]
  );

  const clearTip = useCallback(() => {
    setTip(null);
    onSliceHover?.(null, null);
  }, [onSliceHover]);

  const slices = useMemo(() => {
    let currentAngle = startAngle;
    return data.map((item, i) => {
      const angle = (item.value / total) * 360 - padAngle;
      const slice = {
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
        color: getChartColor(i, item.color),
        ...item,
      };
      currentAngle += angle + padAngle;
      return slice;
    });
  }, [data, total, startAngle, padAngle]);

  const polarToCartesian = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) };
  };

  const createArcPath = (sliceStartAngle: number, sliceEndAngle: number) => {
    const inner = innerRadius * PIE_OUTER_RADIUS;
    const start = polarToCartesian(sliceStartAngle, PIE_OUTER_RADIUS);
    const end = polarToCartesian(sliceEndAngle, PIE_OUTER_RADIUS);
    const startInner = polarToCartesian(sliceStartAngle, inner);
    const endInner = polarToCartesian(sliceEndAngle, inner);
    const largeArc = sliceEndAngle - sliceStartAngle > 180 ? 1 : 0;
    if (innerRadius > 0) {
      return `M ${start.x},${start.y} A ${PIE_OUTER_RADIUS},${PIE_OUTER_RADIUS} 0 ${largeArc},1 ${end.x},${end.y} L ${endInner.x},${endInner.y} A ${inner},${inner} 0 ${largeArc},0 ${startInner.x},${startInner.y} Z`;
    }
    return `M 50,50 L ${start.x},${start.y} A ${PIE_OUTER_RADIUS},${PIE_OUTER_RADIUS} 0 ${largeArc},1 ${end.x},${end.y} Z`;
  };

  return (
    <div className={cn('relative flex max-w-full flex-wrap items-center gap-4', className)} {...props}>
      <div style={{ width: height, height }} className="min-w-0 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          {slices.map((slice, i) => (
            <path
              key={i}
              d={createArcPath(slice.startAngle, slice.endAngle)}
              fill={slice.color}
              className={cn(
                onSliceClick && 'cursor-pointer',
                'transition-opacity hover:opacity-80',
                animated && 'animate-scale-in'
              )}
              style={{ animationDelay: `${i * 100}ms` }}
              onClick={() => onSliceClick?.(data[i], i)}
              tabIndex={0}
              role="button"
              aria-label={`${data[i].label} ${Math.round((data[i].value / total) * 100)}%`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSliceClick?.(data[i], i);
                }
              }}
              onMouseEnter={(e) => updateTip(e.clientX, e.clientY, i)}
              onMouseMove={(e) => updateTip(e.clientX, e.clientY, i)}
              onMouseLeave={clearTip}
            />
          ))}
        </svg>
      </div>

      {showLabels && (
        <div className="flex flex-col gap-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getChartColor(i, item.color) }}
              />
              <span className="text-sm text-gray-600 dark:text-slate-300">{item.label}</span>
              <span className="text-sm text-gray-400 dark:text-slate-500">
                {Math.round((item.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      )}

      {tip && showSliceTooltip && (
        <Portal>
          <div className="pointer-events-none fixed z-[11500] w-56 max-w-[calc(100vw-24px)]" style={{ left: tip.x + 12, top: tip.y + 12 }}>
            <Card variant="elevated" padding="none">
              {(sliceTooltipTitle || sliceTooltipDescription) && (
                <CardHeader
                  title={sliceTooltipTitle?.(data[tip.index], tip.index) ?? tip.label}
                  subtitle={sliceTooltipDescription?.(data[tip.index], tip.index)}
                />
              )}
              <CardBody className="bear-text-xs bear-text-gray-500 dark:bear-text-slate-400">
                {sliceTooltipContent?.(data[tip.index], tip.index) ?? (
                  <span>{tip.value} ({tip.pct}%)</span>
                )}
              </CardBody>
            </Card>
          </div>
        </Portal>
      )}
    </div>
  );
};
