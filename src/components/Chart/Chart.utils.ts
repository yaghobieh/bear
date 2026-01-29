import { DEFAULT_COLORS, CHART } from './Chart.const';

/**
 * Get color for chart element by index
 */
export const getChartColor = (index: number, customColor?: string): string => {
  return customColor || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
};

/**
 * Convert polar coordinates to cartesian
 */
export const polarToCartesian = (angle: number, radius: number): { x: number; y: number } => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: CHART.CENTER + radius * Math.cos(rad),
    y: CHART.CENTER + radius * Math.sin(rad),
  };
};

/**
 * Create SVG arc path for pie/donut charts
 */
export const createArcPath = (
  startAngle: number,
  endAngle: number,
  innerRadius: number = 0
): string => {
  const outerRadius = CHART.OUTER_RADIUS;
  const inner = innerRadius * outerRadius;

  const start = polarToCartesian(startAngle, outerRadius);
  const end = polarToCartesian(endAngle, outerRadius);
  const startInner = polarToCartesian(startAngle, inner);
  const endInner = polarToCartesian(endAngle, inner);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  if (innerRadius > 0) {
    return `M ${start.x},${start.y} A ${outerRadius},${outerRadius} 0 ${largeArc},1 ${end.x},${end.y} L ${endInner.x},${endInner.y} A ${inner},${inner} 0 ${largeArc},0 ${startInner.x},${startInner.y} Z`;
  }

  return `M ${CHART.CENTER},${CHART.CENTER} L ${start.x},${start.y} A ${outerRadius},${outerRadius} 0 ${largeArc},1 ${end.x},${end.y} Z`;
};

/**
 * Generate smooth bezier line path
 */
export const generateLinePath = (
  points: Array<{ x: number; y: number }>,
  smooth: boolean = true
): string => {
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

  return points.reduce((acc, point, i) => {
    return `${acc} ${i === 0 ? 'M' : 'L'} ${point.x},${point.y}`;
  }, '');
};

/**
 * Calculate line chart points from data
 */
export const calculateLinePoints = (
  data: Array<{ value: number }>
): Array<{ x: number; y: number }> => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  return data.map((item, i) => ({
    x: (i / (data.length - 1 || 1)) * 100,
    y: 100 - ((item.value - minValue) / range) * 80 - 10,
  }));
};

