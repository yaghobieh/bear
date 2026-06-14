import { cn } from '@utils';
import { GAUGE_ANIMATION_EASING } from '../Gauge.const';

export interface GaugeArcSvgProps {
  radius: number;
  strokeWidth: number;
  circumference: number;
  dashOffset: number;
  startAngle: number;
  color: string;
  trackColor?: string;
  gradientId?: string;
  gradient?: [string, string];
  animated: boolean;
  fillDurationMs: number;
}

export const GaugeArcSvg = ({
  radius,
  strokeWidth,
  circumference,
  dashOffset,
  startAngle,
  color,
  trackColor,
  gradientId,
  gradient,
  animated,
  fillDurationMs,
}: GaugeArcSvgProps) => (
  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
    <defs>
      {gradient && gradientId && (
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      )}
    </defs>

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
      className={cn('bear-text-[var(--bear-border-default)]')}
      style={{
        transformOrigin: 'center',
        transform: `rotate(${startAngle}deg)`,
      }}
    />

    <circle
      cx="50"
      cy="50"
      r={radius}
      fill="none"
      stroke={gradient && gradientId ? `url(#${gradientId})` : color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={circumference}
      strokeDashoffset={dashOffset}
      style={{
        transformOrigin: 'center',
        transform: `rotate(${startAngle}deg)`,
        transitionProperty: animated ? 'stroke-dashoffset' : undefined,
        transitionDuration: animated ? `${fillDurationMs}ms` : undefined,
        transitionTimingFunction: animated ? GAUGE_ANIMATION_EASING : undefined,
      }}
    />
  </svg>
);
