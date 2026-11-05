import { ZERO, TEN, FIFTY } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import type { CSSProperties } from 'react';
import type { ChartSeries, LineChartProps, LineScaleBounds } from './Chart.types';
import { CHART } from './Chart.const';
import { calculateLinePoints, chartMotionClass, generateLinePath, getChartColor } from './Chart.utils';

export const LineChart = (props: LineChartProps) => {
  const {
    data,
    height = CHART.DEFAULT_HEIGHT,
    showLabels = true,
    showDots = true,
    smooth = true,
    fill = false,
    stepped = false,
    strokeWidth = CHART.DEFAULT_STROKE_WIDTH,
    color = 'var(--bear-primary-500, #ec4899)',
    series = [],
    animated = true,
    motion,
    className,
    id,
    testId,
    ...rest
  } = props;

  const generatedId = useBearId('LineChart');
  const domId = resolveBearId(id, generatedId);
  const drawnSeries: ChartSeries[] = series.length
    ? series
    : [{ id: domId, label: color, color, values: data.map((item) => item.value) }];
  const flatValues = drawnSeries.flatMap((item) => item.values);
  const bounds: LineScaleBounds = {
    min: flatValues.length ? Math.min(...flatValues) : ZERO,
    max: flatValues.length ? Math.max(...flatValues) : ZERO,
  };
  const seriesPaths = drawnSeries.map((item, seriesIndex) => {
    const points = calculateLinePoints(item.values.map((value) => ({ value })), bounds);
    const pathD = generateLinePath(points, smooth && !stepped, stepped);
    const areaD = points.length === ZERO ? '' : `${pathD} L ${CHART.VIEWBOX},${CHART.VIEWBOX} L 0,${CHART.VIEWBOX} Z`;
    return { item, seriesIndex, points, pathD, areaD, stroke: getChartColor(seriesIndex, item.color ?? (series.length ? undefined : color)) };
  });
  const rootStyle = { '--Bear-Chart-height': `${height}px` } as CSSProperties;

  return (
    <div
      id={domId}
      data-testid={testId}
      className={cn('Bear-Chart Bear-Chart--line', className)}
      style={rootStyle}
      {...rest}
    >
      <svg viewBox={`0 0 ${CHART.VIEWBOX} ${CHART.VIEWBOX}`} preserveAspectRatio="none" className="Bear-Chart__svg">
        <defs>
          {seriesPaths.map(({ item, stroke }) => (
            <linearGradient key={item.id} id={`${domId}-${item.id}-gradient`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={stroke} stopOpacity="0.3" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {seriesPaths.map(({ item, pathD, areaD, points, stroke }) => (
          <g key={item.id}>
            {fill && (
              <path
                d={areaD}
                fill={`url(#${domId}-${item.id}-gradient)`}
                className={chartMotionClass(animated, motion, 'animate-fade-in')}
              />
            )}
            <path
              d={pathD}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth / TEN}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={chartMotionClass(animated, motion, 'animate-draw-line')}
            />
            {showDots &&
              points.map((point, index) => (
                <circle
                  key={`${item.id}-${data[index]?.label ?? index}`}
                  cx={point.x}
                  cy={point.y}
                  r={CHART.DOT_RADIUS}
                  fill={stroke}
                  className={chartMotionClass(animated, motion, 'animate-scale-in')}
                  style={{ animationDelay: `${index * FIFTY}ms` }}
                />
              ))}
          </g>
        ))}
      </svg>

      {series.length > ZERO && (
        <div className="Bear-Chart__labels">
          {series.map((item) => (
            <span key={item.id} className="Bear-Chart__label">
              {item.label}
            </span>
          ))}
        </div>
      )}

      {showLabels && (
        <div className="Bear-Chart__labels">
          {data.map((item) => (
            <span key={item.label} className="Bear-Chart__label">
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
