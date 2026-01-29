import { FC } from 'react';
import { cn } from '@utils';
import { ActivityItemProps } from './ActivityItem.types';

/**
 * ActivityItem Component
 * A single activity/event item for activity feeds
 */
export const ActivityItem: FC<ActivityItemProps> = ({
  icon,
  iconBg = 'rgba(16, 185, 129, 0.2)',
  title,
  description,
  user,
  time,
  onClick,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-start gap-4 p-4 hover:bg-slate-700/30 dark:hover:bg-slate-700/30 rounded-xl transition-colors cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 dark:text-white font-medium truncate">{title}</p>
        <p className="text-gray-500 dark:text-slate-400 text-sm truncate">{description}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-gray-500 dark:text-slate-400 text-sm">{time}</p>
        {user && <p className="text-gray-400 dark:text-slate-500 text-xs">{user}</p>}
      </div>
    </div>
  );
};

