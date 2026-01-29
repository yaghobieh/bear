import { FC } from 'react';
import { cn } from '@utils';
import { StatCardProps } from './StatCard.types';

/**
 * StatCard Component
 * A colorful statistics card with gradient background
 */
export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  color = '#6366f1',
  icon,
  onClick,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 transition-transform hover:scale-105 cursor-pointer',
        className
      )}
      style={{ background: `linear-gradient(135deg, ${color}dd, ${color}99)` }}
      onClick={onClick}
      {...props}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-20 bg-white" />
      
      <div className="relative z-10">
        <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
        <p className="text-white text-3xl font-bold mb-4">{value}</p>
        {onClick && (
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition-colors">
            {icon}
            View All
          </button>
        )}
      </div>
    </div>
  );
};

