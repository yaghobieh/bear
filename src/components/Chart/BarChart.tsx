import { ZERO, ONE } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import type { CSSProperties } from 'react';
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
    id,
    testId,
    ...rest
  } = props;

  const generatedId = useBearId('BarChart');
  const domId = resolveBearId(id, generatedId);
  const totals = data.map((item) => getStackTotal(item.stacks, item.value));
  const maxValue = Math.max(...totals, ONE);
  const isVertical = orientation === 'vertical';
  const rootStyle = {
    '--Bear-Chart-height': `${height}px`,
    '--Bear-Chart-gap': `${barGap}rem`,
  } as CSSProperties;

  return (
    <div
      id={domId}
      data-testid={testId}
      className={cn(
        'Bear-Chart Bear-Chart--bar',
        isVertical ? 'Bear-Chart--vertical' : 'Bear-Chart--horizontal',
        className
      )}
      style={rootStyle}
      {...rest}
    >
      <div className="Bear-Chart__track">
        {data.map((item, index) => {
          const segments = stacked && item.stacks && item.stacks.length > ZERO ? item.stacks : [item.value];
          const total = totals[index];
          const sizePct = (total / maxValue) * CHART.VIEWBOX;
          const colStyle = {
            '--Bear-Chart-size': `${sizePct}%`,
          } as CSSProperties;

          return (
            <div key={item.label} className="Bear-Chart__col">
              {showLabels && !isVertical && <span className="Bear-Chart__label">{item.label}</span>}
              <div className="Bear-Chart__plot">
                <div
                  className={cn('Bear-Chart__stack', animated && (isVertical ? 'animate-grow-up' : 'animate-grow-right'))}
                  style={colStyle}
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
                    const segmentStyle = {
                      '--Bear-Chart-segment': `${segmentPct}%`,
                      '--Bear-Chart-color': getChartColor(stacked ? segmentIndex : index, item.color || color),
                      '--Bear-Chart-radius': isFirst && !stacked ? radius : radius,
                    } as CSSProperties;
                    return (
                      <div
                        key={`${item.label}-${segmentIndex}`}
                        className="Bear-Chart__segment"
                        style={segmentStyle}
                      />
                    );
                  })}
                </div>
              </div>
              {showValues && <span className="Bear-Chart__value">{total}</span>}
              {showLabels && isVertical && <span className="Bear-Chart__label">{item.label}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
