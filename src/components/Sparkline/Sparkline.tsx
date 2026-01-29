import { FC, useMemo } from 'react';
import { cn } from '@utils';
import { SparklineProps } from './Sparkline.types';
import { SPARKLINE } from './Sparkline.const';
import { calculateSparklinePathData } from './Sparkline.utils';

export const Sparkline: FC<SparklineProps> = (props) => {
  const {
    data,
    width = SPARKLINE.DEFAULT_WIDTH,
    height = SPARKLINE.DEFAULT_HEIGHT,
    color = SPARKLINE.DEFAULT_COLOR,
    fill = false,
    strokeWidth = SPARKLINE.DEFAULT_STROKE_WIDTH,
    showExtremes = false,
    animated = true,
    className,
    ...rest
  } = props;

  const { path, areaPath, minPoint, maxPoint } = useMemo(
    () => calculateSparklinePathData(data),
    [data]
  );

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

        {fill && (
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
      </svg>
    </div>
  );
};
