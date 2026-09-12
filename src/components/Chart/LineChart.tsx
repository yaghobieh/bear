import { ZERO, TEN, FIFTY } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import type { CSSProperties } from 'react';
import type { LineChartProps } from './Chart.types';
import { CHART } from './Chart.const';
import { calculateLinePoints, generateLinePath } from './Chart.utils';

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
    animated = true,
    className,
    id,
    testId,
    ...rest
  } = props;

  const generatedId = useBearId('LineChart');
  const domId = resolveBearId(id, generatedId);
  const gradientId = `${domId}-gradient`;
  const points = calculateLinePoints(data);
  const pathD = generateLinePath(points, smooth && !stepped, stepped);
  const areaD = points.length === ZERO ? '' : `${pathD} L ${CHART.VIEWBOX},${CHART.VIEWBOX} L 0,${CHART.VIEWBOX} Z`;
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
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {fill && (
          <path
            d={areaD}
            fill={`url(#${gradientId})`}
            className={cn(animated && 'animate-fade-in')}
          />
        )}

        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth / TEN}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(animated && 'animate-draw-line')}
        />

        {showDots &&
          points.map((point, index) => (
            <circle
              key={data[index]?.label ?? index}
              cx={point.x}
              cy={point.y}
              r={CHART.DOT_RADIUS}
              fill={color}
              className={cn(animated && 'animate-scale-in')}
              style={{ animationDelay: `${index * FIFTY}ms` }}
            />
          ))}
      </svg>

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
