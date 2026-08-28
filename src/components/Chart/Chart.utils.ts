import { ZERO, ONE } from '@const';
import { DEFAULT_COLORS, CHART } from './Chart.const';

export const getChartColor = (index: number, customColor?: string): string => {
  return customColor || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
};

export const polarToCartesian = (
  angle: number,
  radius: number,
  center: number = CHART.CENTER
): { x: number; y: number } => {
  const rad = (angle * Math.PI) / CHART.HALF_SWEEP;
  return {
    x: center + radius * Math.cos(rad),
    y: center + radius * Math.sin(rad),
  };
};

export const polarOffset = (angle: number, distance: number): { x: number; y: number } => {
  const rad = (angle * Math.PI) / CHART.HALF_SWEEP;
  return {
    x: distance * Math.cos(rad),
    y: distance * Math.sin(rad),
  };
};

export const createArcPath = (
  startAngle: number,
  endAngle: number,
  innerRadius: number = ZERO,
  outerRadius: number = CHART.OUTER_RADIUS
): string => {
  const inner = innerRadius * outerRadius;
  const start = polarToCartesian(startAngle, outerRadius);
  const end = polarToCartesian(endAngle, outerRadius);
  const startInner = polarToCartesian(startAngle, inner);
  const endInner = polarToCartesian(endAngle, inner);
  const largeArc = endAngle - startAngle > CHART.LARGE_ARC_THRESHOLD ? ONE : ZERO;

  if (innerRadius > ZERO) {
    return `M ${start.x},${start.y} A ${outerRadius},${outerRadius} 0 ${largeArc},1 ${end.x},${end.y} L ${endInner.x},${endInner.y} A ${inner},${inner} 0 ${largeArc},0 ${startInner.x},${startInner.y} Z`;
  }

  return `M ${CHART.CENTER},${CHART.CENTER} L ${start.x},${start.y} A ${outerRadius},${outerRadius} 0 ${largeArc},1 ${end.x},${end.y} Z`;
};

export const generateLinePath = (
  points: Array<{ x: number; y: number }>,
  smooth: boolean = true,
  stepped: boolean = false
): string => {
  if (points.length === ZERO) return '';

  if (stepped) {
    return points.reduce((acc, point, i, arr) => {
      if (i === ZERO) return `M ${point.x},${point.y}`;
      const prev = arr[i - ONE];
      return `${acc} L ${point.x},${prev.y} L ${point.x},${point.y}`;
    }, '');
  }

  if (smooth) {
    return points.reduce((acc, point, i, arr) => {
      if (i === ZERO) return `M ${point.x},${point.y}`;
      const prev = arr[i - ONE];
      const cp1x = prev.x + (point.x - prev.x) / CHART.BEZIER_DIVISOR;
      const cp2x = point.x - (point.x - prev.x) / CHART.BEZIER_DIVISOR;
      return `${acc} C ${cp1x},${prev.y} ${cp2x},${point.y} ${point.x},${point.y}`;
    }, '');
  }

  return points.reduce((acc, point, i) => `${acc} ${i === ZERO ? 'M' : 'L'} ${point.x},${point.y}`, '');
};

export const calculateLinePoints = (
  data: Array<{ value: number }>
): Array<{ x: number; y: number }> => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || ONE;
  const lastIndex = data.length - ONE || ONE;

  return data.map((item, i) => ({
    x: (i / lastIndex) * CHART.VIEWBOX,
    y: CHART.VIEWBOX - ((item.value - minValue) / range) * CHART.LINE_Y_RANGE - CHART.LINE_Y_PAD,
  }));
};

export const getStackTotal = (stacks: number[] | undefined, value: number): number => {
  if (!stacks || stacks.length === ZERO) {
    return value;
  }
  return stacks.reduce((sum, segment) => sum + segment, ZERO);
};
