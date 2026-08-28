import { ZERO, TEN, FIFTY } from '@const';
import { cn } from '@utils';
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
    ...rest
  } = props;

  const points = calculateLinePoints(data);
  const pathD = generateLinePath(points, smooth && !stepped, stepped);
  const areaD = points.length === ZERO ? '' : `${pathD} L ${CHART.VIEWBOX},${CHART.VIEWBOX} L 0,${CHART.VIEWBOX} Z`;

  return (
    <div className={cn('Bear-Chart Bear-Chart--line bear-w-full', className)} style={{ height }} {...rest}>
      <svg viewBox={`0 0 ${CHART.VIEWBOX} ${CHART.VIEWBOX}`} preserveAspectRatio="none" className="bear-h-full bear-w-full">
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
        <div className="bear-mt-2 bear-flex bear-justify-between">
          {data.map((item) => (
            <span key={item.label} className="bear-text-xs bear-text-gray-600 dark:bear-text-slate-300">
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
