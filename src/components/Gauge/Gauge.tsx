import { FC, useMemo, useId } from 'react';
import { cn } from '@utils';
import { GaugeProps } from './Gauge.types';

export const Gauge: FC<GaugeProps> = ({
  value,
  min = 0,
  max = 100,
  size = 120,
  strokeWidth = 10,
  color = '#ec4899',
  trackColor,
  showLabel = true,
  label,
  animated = true,
  arcAngle = 270,
  gradient,
  className,
  ...props
}) => {
  const gradientId = useId();
  
  const { percentage, circumference, offset, startAngle } = useMemo(() => {
    const pct = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
    const radius = 50 - strokeWidth / 2;
    const circ = 2 * Math.PI * radius * (arcAngle / 360);
    const off = circ - (pct / 100) * circ;
    const start = 90 + (360 - arcAngle) / 2;
    
    return {
      percentage: pct,
      circumference: circ,
      offset: off,
      startAngle: start,
    };
  }, [value, min, max, arcAngle, strokeWidth]);

  const radius = 50 - strokeWidth / 2;

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <defs>
          {gradient && (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          )}
        </defs>

        {/* Track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={trackColor || 'currentColor'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          className={cn('text-gray-200 dark:text-slate-700')}
          style={{
            transformOrigin: 'center',
            transform: `rotate(${startAngle}deg)`,
          }}
        />

        {/* Progress */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={gradient ? `url(#${gradientId})` : color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            animated && 'transition-all duration-1000 ease-out'
          )}
          style={{
            transformOrigin: 'center',
            transform: `rotate(${startAngle}deg)`,
          }}
        />
      </svg>

      {/* Label */}
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          {label || (
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
};

