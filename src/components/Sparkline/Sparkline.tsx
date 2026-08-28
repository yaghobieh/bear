import { cn } from '@utils';
import { SparklineProps } from './Sparkline.types';
import {
  SPARKLINE,
  SPARKLINE_VARIANT_AREA,
  SPARKLINE_VARIANT_BARS,
  SPARKLINE_VARIANT_LINE,
} from './Sparkline.const';
import { calculateSparklineBars, calculateSparklinePathData, calculateSparklinePoints } from './Sparkline.utils';

export const Sparkline = (props: SparklineProps) => {
  const {
    data,
    width = SPARKLINE.DEFAULT_WIDTH,
    height = SPARKLINE.DEFAULT_HEIGHT,
    color = SPARKLINE.DEFAULT_COLOR,
    fill = false,
    strokeWidth = SPARKLINE.DEFAULT_STROKE_WIDTH,
    showExtremes = false,
    animated = true,
    variant = SPARKLINE_VARIANT_LINE,
    showLastPoint = false,
    className,
    ...rest
  } = props;

  const filled = fill || variant === SPARKLINE_VARIANT_AREA;
  const { path, areaPath, minPoint, maxPoint } = calculateSparklinePathData(data);
  const bars = calculateSparklineBars(data);
  const sparkPoints = calculateSparklinePoints(data);
  const last = sparkPoints[sparkPoints.length - 1];
  const gradientId = `sparkline-gradient-${color.replace('#', '')}`;

  return (
    <div
      className={cn('inline-block', className)}
      style={{ width, height }}
      {...rest}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {variant === SPARKLINE_VARIANT_BARS ? (
          bars.map((bar, index) => (
            <rect
              key={index}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={color}
              className={cn(animated && 'animate-grow-up')}
            />
          ))
        ) : (
          <>
            {filled && (
              <path
                d={areaPath}
                fill={`url(#${gradientId})`}
                className={cn(animated && 'animate-fade-in')}
              />
            )}
            <path
              d={path}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className={cn(animated && 'animate-draw-line')}
            />
          </>
        )}

        {showExtremes && minPoint && (
          <circle
            cx={minPoint.x}
            cy={minPoint.y}
            r={SPARKLINE.INDICATOR_RADIUS}
            fill={SPARKLINE.MIN_INDICATOR_COLOR}
            vectorEffect="non-scaling-stroke"
          />
        )}
        {showExtremes && maxPoint && (
          <circle
            cx={maxPoint.x}
            cy={maxPoint.y}
            r={SPARKLINE.INDICATOR_RADIUS}
            fill={SPARKLINE.MAX_INDICATOR_COLOR}
            vectorEffect="non-scaling-stroke"
          />
        )}
        {showLastPoint && last && (
          <circle
            cx={last.x}
            cy={last.y}
            r={SPARKLINE.LAST_POINT_RADIUS}
            fill={color}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  );
};
