import { FC, useMemo } from 'react';
import { cn } from '@utils';
import { ChartProps, BarChartProps, LineChartProps, PieChartProps } from './Chart.types';

const DEFAULT_COLORS = [
  '#ec4899', // pink
  '#8b5cf6', // purple
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#06b6d4', // cyan
  '#84cc16', // lime
];

const getColor = (index: number, customColor?: string) => {
  return customColor || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
};

/**
 * BarChart Component
 */
export const BarChart: FC<BarChartProps> = ({
  data,
  height = 200,
  showLabels = true,
  showValues = false,
  animated = true,
  color,
  orientation = 'vertical',
  barRadius = 4,
  barGap = 0.2,
  className,
  ...props
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className={cn('w-full', className)} style={{ height }} {...props}>
      {orientation === 'vertical' ? (
        <div className="flex items-end justify-between h-full gap-2">
          {data.map((item, i) => {
            const barHeight = (item.value / maxValue) * 100;
            const barColor = getColor(i, item.color || color);
            
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className={cn(
                      'w-full transition-all duration-500 ease-out',
                      animated && 'animate-grow-up'
                    )}
                    style={{
                      height: `${barHeight}%`,
                      backgroundColor: barColor,
                      borderRadius: `${barRadius}px ${barRadius}px 0 0`,
                      opacity: 0.9,
                    }}
                  />
                </div>
                {showValues && (
                  <span className="text-xs text-gray-500 dark:text-slate-400">
                    {item.value}
                  </span>
                )}
                {showLabels && (
                  <span className="text-xs text-gray-600 dark:text-slate-300 truncate max-w-full">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full gap-2">
          {data.map((item, i) => {
            const barWidth = (item.value / maxValue) * 100;
            const barColor = getColor(i, item.color || color);
            
            return (
              <div key={i} className="flex-1 flex items-center gap-2">
                {showLabels && (
                  <span className="text-xs text-gray-600 dark:text-slate-300 w-16 truncate">
                    {item.label}
                  </span>
                )}
                <div className="flex-1 h-full flex items-center">
                  <div
                    className={cn(
                      'h-3/4 transition-all duration-500 ease-out',
                      animated && 'animate-grow-right'
                    )}
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: barColor,
                      borderRadius: `0 ${barRadius}px ${barRadius}px 0`,
                      opacity: 0.9,
                    }}
                  />
                </div>
                {showValues && (
                  <span className="text-xs text-gray-500 dark:text-slate-400 w-10 text-right">
                    {item.value}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/**
 * LineChart Component
 */
export const LineChart: FC<LineChartProps> = ({
  data,
  height = 200,
  showLabels = true,
  showDots = true,
  smooth = true,
  fill = false,
  strokeWidth = 2,
  color = '#ec4899',
  animated = true,
  className,
  ...props
}) => {
  const points = useMemo(() => {
    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue || 1;
    
    return data.map((item, i) => ({
      x: (i / (data.length - 1 || 1)) * 100,
      y: 100 - ((item.value - minValue) / range) * 80 - 10,
      ...item,
    }));
  }, [data]);

  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    
    if (smooth) {
      // Smooth curve using bezier
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
  }, [points, smooth]);

  const areaD = useMemo(() => {
    if (points.length === 0) return '';
    return `${pathD} L 100,100 L 0,100 Z`;
  }, [pathD, points]);

  return (
    <div className={cn('w-full', className)} style={{ height }} {...props}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
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
          strokeWidth={strokeWidth / 10}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(animated && 'animate-draw-line')}
        />
        
        {showDots && points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={1.5}
            fill={color}
            className={cn(animated && 'animate-scale-in')}
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </svg>
      
      {showLabels && (
        <div className="flex justify-between mt-2">
          {data.map((item, i) => (
            <span key={i} className="text-xs text-gray-600 dark:text-slate-300">
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * PieChart Component
 */
export const PieChart: FC<PieChartProps> = ({
  data,
  height = 200,
  showLabels = true,
  innerRadius = 0,
  startAngle = -90,
  padAngle = 2,
  animated = true,
  className,
  ...props
}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  
  const slices = useMemo(() => {
    let currentAngle = startAngle;
    
    return data.map((item, i) => {
      const angle = (item.value / total) * 360 - padAngle;
      const slice = {
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
        color: getColor(i, item.color),
        ...item,
      };
      currentAngle += angle + padAngle;
      return slice;
    });
  }, [data, total, startAngle, padAngle]);

  const polarToCartesian = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: 50 + radius * Math.cos(rad),
      y: 50 + radius * Math.sin(rad),
    };
  };

  const createArcPath = (startAngle: number, endAngle: number) => {
    const outerRadius = 45;
    const inner = innerRadius * outerRadius;
    
    const start = polarToCartesian(startAngle, outerRadius);
    const end = polarToCartesian(endAngle, outerRadius);
    const startInner = polarToCartesian(startAngle, inner);
    const endInner = polarToCartesian(endAngle, inner);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    if (innerRadius > 0) {
      return `M ${start.x},${start.y} A ${outerRadius},${outerRadius} 0 ${largeArc},1 ${end.x},${end.y} L ${endInner.x},${endInner.y} A ${inner},${inner} 0 ${largeArc},0 ${startInner.x},${startInner.y} Z`;
    }
    
    return `M 50,50 L ${start.x},${start.y} A ${outerRadius},${outerRadius} 0 ${largeArc},1 ${end.x},${end.y} Z`;
  };

  return (
    <div className={cn('flex items-center gap-4', className)} {...props}>
      <div style={{ width: height, height }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {slices.map((slice, i) => (
            <path
              key={i}
              d={createArcPath(slice.startAngle, slice.endAngle)}
              fill={slice.color}
              className={cn(
                'transition-opacity hover:opacity-80',
                animated && 'animate-scale-in'
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </svg>
      </div>
      
      {showLabels && (
        <div className="flex flex-col gap-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getColor(i, item.color) }}
              />
              <span className="text-sm text-gray-600 dark:text-slate-300">
                {item.label}
              </span>
              <span className="text-sm text-gray-400 dark:text-slate-500">
                {Math.round((item.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Main Chart Component
 */
export const Chart: FC<ChartProps> = ({ type, ...props }) => {
  switch (type) {
    case 'bar':
      return <BarChart {...props} />;
    case 'line':
    case 'area':
      return <LineChart {...props} fill={type === 'area'} />;
    case 'pie':
      return <PieChart {...props} />;
    case 'donut':
      return <PieChart {...props} innerRadius={0.6} />;
    default:
      return <BarChart {...props} />;
  }
};

