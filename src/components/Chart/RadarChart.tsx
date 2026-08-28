import { ZERO, ONE } from '@const';
import { cn } from '@utils';
import type { RadarChartProps } from './Chart.types';
import { CHART } from './Chart.const';
import { getChartColor, polarToCartesian } from './Chart.utils';

export const RadarChart = (props: RadarChartProps) => {
  const {
    data,
    height = CHART.DEFAULT_HEIGHT,
    showLabels = true,
    showValues = false,
    animated = true,
    color,
    className,
    ...rest
  } = props;

  const count = data.length;
  if (count === ZERO) {
    return null;
  }

  const maxValue = Math.max(...data.map((item) => item.value), ONE);
  const angleStep = CHART.FULL_SWEEP / count;
  const points = data.map((item, index) => {
    const angle = CHART.DEFAULT_START_ANGLE + index * angleStep;
    const radius = (item.value / maxValue) * CHART.OUTER_RADIUS;
    return polarToCartesian(angle, radius);
  });
  const polygon = points.map((point) => `${point.x},${point.y}`).join(' ');
  const rings = Array.from({ length: CHART.RADAR_RINGS }, (_, ringIndex) => {
    const ringRadius = ((ringIndex + ONE) / CHART.RADAR_RINGS) * CHART.OUTER_RADIUS;
    return Array.from({ length: count }, (__, axisIndex) => {
      const angle = CHART.DEFAULT_START_ANGLE + axisIndex * angleStep;
      return polarToCartesian(angle, ringRadius);
    });
  });

  return (
    <div className={cn('Bear-Chart Bear-Chart--radar bear-flex bear-flex-col bear-items-center', className)} style={{ height }} {...rest}>
      <svg viewBox={`0 0 ${CHART.VIEWBOX} ${CHART.VIEWBOX}`} className="bear-h-full bear-w-full">
        {rings.map((ring, ringIndex) => (
          <polygon
            key={ringIndex}
            points={ring.map((point) => `${point.x},${point.y}`).join(' ')}
            fill="none"
            stroke="var(--bear-border-default, #e5e5e5)"
            strokeWidth={0.4}
          />
        ))}
        {data.map((item, index) => {
          const angle = CHART.DEFAULT_START_ANGLE + index * angleStep;
          const end = polarToCartesian(angle, CHART.OUTER_RADIUS);
          return (
            <line
              key={item.label}
              x1={CHART.CENTER}
              y1={CHART.CENTER}
              x2={end.x}
              y2={end.y}
              stroke="var(--bear-border-default, #e5e5e5)"
              strokeWidth={0.4}
            />
          );
        })}
        <polygon
          points={polygon}
          fill={getChartColor(ZERO, color)}
          fillOpacity={0.25}
          stroke={getChartColor(ZERO, color)}
          strokeWidth={0.8}
          className={cn(animated && 'animate-scale-in')}
        />
        {points.map((point, index) => (
          <circle
            key={data[index].label}
            cx={point.x}
            cy={point.y}
            r={CHART.DOT_RADIUS}
            fill={getChartColor(index, data[index].color || color)}
          />
        ))}
        {showLabels &&
          data.map((item, index) => {
            const angle = CHART.DEFAULT_START_ANGLE + index * angleStep;
            const labelPoint = polarToCartesian(angle, CHART.OUTER_RADIUS + CHART.RADAR_LABEL_OFFSET);
            return (
              <text
                key={`${item.label}-label`}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="bear-fill-[var(--bear-text-secondary)]"
                fontSize={4}
              >
                {item.label}
                {showValues ? ` ${item.value}` : ''}
              </text>
            );
          })}
      </svg>
    </div>
  );
};
