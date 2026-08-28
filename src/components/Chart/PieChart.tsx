import { useState } from 'react';
import { ONE, ZERO } from '@const';
import { cn } from '@utils';
import { Portal } from '../Portal';
import { Card, CardBody, CardHeader } from '../Card';
import { Flex } from '../Flex';
import { Box } from '../Box';
import { Typography } from '../Typography';
import type { PieChartProps } from './Chart.types';
import {
  CHART,
  CHART_LEGEND_BOTTOM,
  CHART_LEGEND_NONE,
  PIE_VIEW_FULL,
  PIE_VIEW_HALF,
  PIE_VIEW_ROSE,
} from './Chart.const';
import { createArcPath, getChartColor, polarOffset } from './Chart.utils';
import type { SliceTooltipState } from './PieChart.types';

export const PieChart = (props: PieChartProps) => {
  const {
    data,
    height = CHART.DEFAULT_HEIGHT,
    showLabels = true,
    innerRadius = ZERO,
    startAngle,
    padAngle = CHART.DEFAULT_PAD_ANGLE,
    animated = true,
    pieView = PIE_VIEW_FULL,
    explodeIndex,
    legendPosition = 'right',
    onSliceClick,
    onSliceHover,
    showSliceTooltip = true,
    sliceTooltipTitle,
    sliceTooltipDescription,
    sliceTooltipContent,
    className,
    ...rest
  } = props;

  const total = data.reduce((sum, item) => sum + item.value, ZERO);
  const [tip, setTip] = useState<SliceTooltipState | null>(null);
  const isHalf = pieView === PIE_VIEW_HALF;
  const isRose = pieView === PIE_VIEW_ROSE;
  const sweep = isHalf ? CHART.HALF_SWEEP : CHART.FULL_SWEEP;
  const resolvedStart = startAngle ?? (isHalf ? CHART.HALF_PIE_START : CHART.DEFAULT_START_ANGLE);
  const maxValue = Math.max(...data.map((item) => item.value), ONE);
  const hideLegend = legendPosition === CHART_LEGEND_NONE || !showLabels;
  const legendBelow = legendPosition === CHART_LEGEND_BOTTOM;

  const updateTip = (clientX: number, clientY: number, index: number) => {
    const item = data[index];
    onSliceHover?.(item, index);
    if (!showSliceTooltip) {
      return;
    }
    const pct = Math.round((item.value / total) * CHART.VIEWBOX);
    setTip({ x: clientX, y: clientY, index, label: item.label, value: item.value, pct });
  };

  const clearTip = () => {
    setTip(null);
    onSliceHover?.(null, null);
  };

  let currentAngle = resolvedStart;
  const slices = data.map((item, index) => {
    const sliceAngle = isRose
      ? sweep / data.length - padAngle
      : (item.value / total) * sweep - padAngle;
    const sliceStart = currentAngle;
    const sliceEnd = currentAngle + sliceAngle;
    currentAngle += sliceAngle + padAngle;
    const outerRadius = isRose
      ? CHART.ROSE_MIN_RADIUS + (item.value / maxValue) * (CHART.OUTER_RADIUS - CHART.ROSE_MIN_RADIUS)
      : CHART.OUTER_RADIUS;
    return {
      startAngle: sliceStart,
      endAngle: sliceEnd,
      color: getChartColor(index, item.color),
      outerRadius,
      ...item,
    };
  });

  return (
    <Flex
      direction={legendBelow ? 'column' : 'row'}
      align="center"
      gap={4}
      wrap="wrap"
      className={cn('Bear-Chart Bear-Chart--pie bear-relative bear-max-w-full', className)}
      {...rest}
    >
      <Box style={{ width: height, height }} className="bear-min-w-0 bear-shrink-0">
        <svg viewBox={`0 0 ${CHART.VIEWBOX} ${CHART.VIEWBOX}`} className="bear-h-full bear-w-full">
          {slices.map((slice, index) => {
            const midAngle = (slice.startAngle + slice.endAngle) / 2;
            const explode = explodeIndex === index ? polarOffset(midAngle, CHART.EXPLODE_OFFSET) : { x: ZERO, y: ZERO };
            return (
              <g key={slice.label} transform={`translate(${explode.x} ${explode.y})`}>
                <path
                  d={createArcPath(slice.startAngle, slice.endAngle, innerRadius, slice.outerRadius)}
                  fill={slice.color}
                  className={cn(
                    onSliceClick && 'bear-cursor-pointer',
                    'bear-transition-opacity hover:bear-opacity-80',
                    animated && 'animate-scale-in'
                  )}
                  style={{ animationDelay: `${index * CHART.SLICE_DELAY_MS}ms` }}
                  onClick={() => onSliceClick?.(data[index], index)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${data[index].label} ${Math.round((data[index].value / total) * CHART.VIEWBOX)}%`}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onSliceClick?.(data[index], index);
                    }
                  }}
                  onMouseEnter={(event) => updateTip(event.clientX, event.clientY, index)}
                  onMouseMove={(event) => updateTip(event.clientX, event.clientY, index)}
                  onMouseLeave={clearTip}
                />
              </g>
            );
          })}
        </svg>
      </Box>

      {!hideLegend && (
        <Flex direction="column" gap={2}>
          {data.map((item, index) => (
            <Flex key={item.label} align="center" gap={2}>
              <Box
                className="bear-h-3 bear-w-3 bear-rounded-full"
                style={{ backgroundColor: getChartColor(index, item.color) }}
              />
              <Typography variant="body2" color="muted">
                {item.label}
              </Typography>
              <Typography variant="body2" color="muted">
                {Math.round((item.value / total) * CHART.VIEWBOX)}%
              </Typography>
            </Flex>
          ))}
        </Flex>
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
    </Flex>
  );
};
