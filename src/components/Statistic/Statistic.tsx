import { FC } from 'react';
import { StatisticProps } from './Statistic.types';
import { cn } from '../../utils/cn';

export const Statistic: FC<StatisticProps> = ({
  title,
  value,
  prefix,
  suffix,
  icon,
  trend,
  description,
  loading = false,
  precision = 0,
  className,
  size = 'md',
  variant = 'default',
}) => {
  const formattedValue = typeof value === 'number' 
    ? value.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })
    : value;

  const sizeClasses = {
    sm: { value: 'bear-text-xl', title: 'bear-text-xs', icon: 'bear-w-8 bear-h-8' },
    md: { value: 'bear-text-3xl', title: 'bear-text-sm', icon: 'bear-w-10 bear-h-10' },
    lg: { value: 'bear-text-4xl', title: 'bear-text-base', icon: 'bear-w-12 bear-h-12' },
  };

  const variantClasses = {
    default: '',
    card: 'bear-bg-zinc-800 bear-rounded-xl bear-p-4 bear-border bear-border-zinc-700',
    minimal: '',
  };

  if (loading) {
    return (
      <div className={cn(variantClasses[variant], className)}>
        <div className="bear-animate-pulse">
          <div className="bear-h-4 bear-w-20 bear-bg-zinc-700 bear-rounded bear-mb-2" />
          <div className="bear-h-8 bear-w-32 bear-bg-zinc-700 bear-rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bear-flex bear-items-start bear-gap-3', variantClasses[variant], className)}>
      {icon && (
        <div className={cn(
          'bear-flex bear-items-center bear-justify-center bear-rounded-lg bear-bg-pink-500/20 bear-text-pink-400',
          sizeClasses[size].icon
        )}>
          {icon}
        </div>
      )}
      <div>
        <div className={cn('bear-text-zinc-400 bear-mb-1', sizeClasses[size].title)}>
          {title}
        </div>
        <div className={cn('bear-font-bold bear-text-white bear-flex bear-items-baseline bear-gap-1', sizeClasses[size].value)}>
          {prefix && <span className="bear-text-zinc-400">{prefix}</span>}
          {formattedValue}
          {suffix && <span className="bear-text-zinc-400 bear-text-lg">{suffix}</span>}
        </div>
        {trend && (
          <div className={cn(
            'bear-flex bear-items-center bear-gap-1 bear-mt-1 bear-text-sm',
            trend.isUpward !== false ? 'bear-text-green-400' : 'bear-text-red-400'
          )}>
            <svg className="bear-w-4 bear-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trend.isUpward !== false ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} />
            </svg>
            {Math.abs(trend.value)}%
          </div>
        )}
        {description && (
          <div className="bear-text-xs bear-text-zinc-500 bear-mt-1">{description}</div>
        )}
      </div>
    </div>
  );
};

