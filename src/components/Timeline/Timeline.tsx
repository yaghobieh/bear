import { FC } from 'react';
import { TimelineProps } from './Timeline.types';
import { cn } from '../../utils/cn';

export const Timeline: FC<TimelineProps> = ({
  items,
  orientation = 'vertical',
  position = 'left',
  className,
  size = 'md',
  showConnector = true,
}) => {
  const colorClasses = {
    default: 'bear-bg-zinc-600 bear-border-zinc-600',
    primary: 'bear-bg-pink-500 bear-border-pink-500',
    success: 'bear-bg-green-500 bear-border-green-500',
    warning: 'bear-bg-yellow-500 bear-border-yellow-500',
    error: 'bear-bg-red-500 bear-border-red-500',
    info: 'bear-bg-blue-500 bear-border-blue-500',
  };

  const sizeClasses = {
    sm: { dot: 'bear-w-2.5 bear-h-2.5', iconDot: 'bear-w-6 bear-h-6', text: 'bear-text-xs', title: 'bear-text-sm' },
    md: { dot: 'bear-w-3 bear-h-3', iconDot: 'bear-w-8 bear-h-8', text: 'bear-text-sm', title: 'bear-text-base' },
    lg: { dot: 'bear-w-4 bear-h-4', iconDot: 'bear-w-10 bear-h-10', text: 'bear-text-base', title: 'bear-text-lg' },
  };

  const isVertical = orientation === 'vertical';

  return (
    <div className={cn(
      'bear-relative',
      isVertical ? '' : 'bear-flex bear-items-start',
      className
    )}>
      {items.map((item, index) => {
        const isLeft = position === 'left' || (position === 'alternate' && index % 2 === 0);
        const isLast = index === items.length - 1;
        const color = item.color || 'default';
        const hasIcon = item.dotVariant === 'icon' && item.icon;

        return (
          <div
            key={item.id}
            className={cn(
              'bear-relative',
              isVertical ? 'bear-pb-6' : 'bear-flex-1 bear-pr-4',
              isVertical && position === 'alternate' && (isLeft ? 'bear-pr-8 bear-text-right' : 'bear-pl-8')
            )}
          >
            <div className={cn(
              'bear-absolute',
              isVertical ? (
                position === 'alternate'
                  ? (isLeft ? 'bear-right-0 bear-translate-x-1/2' : 'bear-left-0 -bear-translate-x-1/2')
                  : 'bear-left-0'
              ) : 'bear-top-0',
              hasIcon ? '' : 'bear-top-1'
            )}>
              {hasIcon ? (
                <div className={cn(
                  'bear-rounded-full bear-flex bear-items-center bear-justify-center bear-text-white',
                  sizeClasses[size].iconDot,
                  colorClasses[color]
                )}>
                  {item.icon}
                </div>
              ) : (
                <div className={cn(
                  'bear-rounded-full',
                  sizeClasses[size].dot,
                  item.dotVariant === 'outlined'
                    ? `bear-border-2 bear-bg-zinc-900 ${colorClasses[color]}`
                    : colorClasses[color]
                )} />
              )}
            </div>
            {showConnector && !isLast && (
              <div className={cn(
                'bear-absolute bear-bg-zinc-700',
                isVertical ? (
                  position === 'alternate'
                    ? (isLeft ? 'bear-right-0 bear-w-0.5 bear-top-4 bear-bottom-0 bear-translate-x-1/2' : 'bear-left-0 bear-w-0.5 bear-top-4 bear-bottom-0 -bear-translate-x-1/2')
                    : 'bear-left-1 bear-w-0.5 bear-top-4 bear-bottom-0'
                ) : 'bear-left-3 bear-h-0.5 bear-top-1.5 bear-right-0'
              )} />
            )}
            <div className={cn(
              isVertical && position !== 'alternate' && 'bear-pl-6',
              isVertical && position === 'alternate' && !isLeft && 'bear-pl-6'
            )}>
              {item.date && (
                <div className={cn('bear-text-zinc-500 bear-mb-1', sizeClasses[size].text)}>
                  {item.date}
                </div>
              )}
              <div className={cn('bear-font-medium bear-text-white', sizeClasses[size].title)}>
                {item.title}
              </div>
              {item.description && (
                <div className={cn('bear-text-zinc-400 bear-mt-1', sizeClasses[size].text)}>
                  {item.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

