import { SPARKLINE } from './Sparkline.const';

export interface SparklinePoint {
  x: number;
  y: number;
  value: number;
}

export interface SparklinePathData {
  path: string;
  areaPath: string;
  minPoint: SparklinePoint | null;
  maxPoint: SparklinePoint | null;
}

/**
 * Calculate points for sparkline from data array
 */
export const calculateSparklinePoints = (data: number[]): SparklinePoint[] => {
  if (data.length === 0) return [];

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return data.map((value, i) => ({
    x: (i / (data.length - 1 || 1)) * SPARKLINE.VIEWBOX_SIZE,
    y: SPARKLINE.VIEWBOX_SIZE - ((value - min) / range) * SPARKLINE.Y_RANGE - SPARKLINE.Y_PADDING,
    value,
  }));
};

/**
 * Generate smooth bezier curve path from points
 */
export const generateSparklinePath = (points: SparklinePoint[]): string => {
  if (points.length === 0) return '';

  return points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x},${point.y}`;

    const prev = points[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / SPARKLINE.CONTROL_POINT_FACTOR;
    const cp2x = point.x - (point.x - prev.x) / SPARKLINE.CONTROL_POINT_FACTOR;

    return `${acc} C ${cp1x},${prev.y} ${cp2x},${point.y} ${point.x},${point.y}`;
  }, '');
};

/**
 * Generate area path for filled sparkline
 */
export const generateAreaPath = (linePath: string): string => {
  if (!linePath) return '';
  return `${linePath} L ${SPARKLINE.VIEWBOX_SIZE},${SPARKLINE.VIEWBOX_SIZE} L 0,${SPARKLINE.VIEWBOX_SIZE} Z`;
};

/**
 * Calculate all sparkline path data from raw data
 */
export const calculateSparklinePathData = (data: number[]): SparklinePathData => {
  if (data.length === 0) {
    return { path: '', areaPath: '', minPoint: null, maxPoint: null };
  }

  const points = calculateSparklinePoints(data);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const minIdx = data.indexOf(min);
  const maxIdx = data.indexOf(max);

  const path = generateSparklinePath(points);
  const areaPath = generateAreaPath(path);

  return {
    path,
    areaPath,
    minPoint: points[minIdx] || null,
    maxPoint: points[maxIdx] || null,
  };
};

