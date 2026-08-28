import { ZERO, ONE } from '@const';
import { cn } from '@utils';
import type { BarChartProps } from './Chart.types';
import { CHART } from './Chart.const';
import { getChartColor, getStackTotal } from './Chart.utils';

export const BarChart = (props: BarChartProps) => {
  const {
    data,
    height = CHART.DEFAULT_HEIGHT,
    showLabels = true,
    showValues = false,
    animated = true,
    color,
    orientation = 'vertical',
    barRadius = CHART.DEFAULT_BAR_RADIUS,
    barGap = CHART.DEFAULT_BAR_GAP,
    stacked = false,
    className,
    ...rest
  } = props;

  const totals = data.map((item) => getStackTotal(item.stacks, item.value));
  const maxValue = Math.max(...totals, ONE);
  const isVertical = orientation === 'vertical';

  return (
    <div className={cn('Bear-Chart Bear-Chart--bar bear-w-full', className)} style={{ height }} {...rest}>
      <div
        className={cn('bear-h-full', isVertical ? 'bear-flex bear-items-end bear-justify-between' : 'bear-flex bear-flex-col bear-justify-between')}
        style={{ gap: `${barGap}rem` }}
      >
        {data.map((item, index) => {
          const segments = stacked && item.stacks && item.stacks.length > ZERO ? item.stacks : [item.value];
          const total = totals[index];
          const sizePct = (total / maxValue) * CHART.VIEWBOX;

          return (
            <div
              key={item.label}
              className={cn(
                isVertical ? 'bear-flex-1 bear-flex bear-flex-col bear-items-center bear-gap-1' : 'bear-flex-1 bear-flex bear-items-center bear-gap-2'
              )}
            >
              {showLabels && !isVertical && (
                <span className="bear-w-16 bear-truncate bear-text-xs bear-text-gray-600 dark:bear-text-slate-300">
                  {item.label}
                </span>
              )}
              <div
                className={cn(
                  isVertical ? 'bear-w-full bear-flex-1 bear-flex bear-items-end' : 'bear-flex-1 bear-h-full bear-flex bear-items-center'
                )}
              >
                <div
                  className={cn(
                    'bear-flex',
                    isVertical ? 'bear-w-full bear-flex-col-reverse' : 'bear-h-3/4 bear-flex-row',
                    animated && (isVertical ? 'animate-grow-up' : 'animate-grow-right')
                  )}
                  style={isVertical ? { height: `${sizePct}%` } : { width: `${sizePct}%` }}
                >
                  {segments.map((segment, segmentIndex) => {
                    const segmentPct = total > ZERO ? (segment / total) * CHART.VIEWBOX : ZERO;
                    const isFirst = segmentIndex === ZERO;
                    const isLast = segmentIndex === segments.length - ONE;
                    const radius = stacked
                      ? isVertical
                        ? isLast
                          ? `${barRadius}px ${barRadius}px 0 0`
                          : '0'
                        : isLast
                          ? `0 ${barRadius}px ${barRadius}px 0`
                          : '0'
                      : isVertical
                        ? `${barRadius}px ${barRadius}px 0 0`
                        : `0 ${barRadius}px ${barRadius}px 0`;
                    return (
                      <div
                        key={`${item.label}-${segmentIndex}`}
                        className="bear-transition-all bear-duration-500 bear-ease-out"
                        style={{
                          [isVertical ? 'height' : 'width']: `${segmentPct}%`,
                          [isVertical ? 'width' : 'height']: '100%',
                          backgroundColor: getChartColor(stacked ? segmentIndex : index, item.color || color),
                          borderRadius: isFirst && !stacked ? radius : radius,
                          opacity: 0.9,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              {showValues && (
                <span className="bear-text-xs bear-text-gray-500 dark:bear-text-slate-400">{total}</span>
              )}
              {showLabels && isVertical && (
                <span className="bear-max-w-full bear-truncate bear-text-xs bear-text-gray-600 dark:bear-text-slate-300">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
