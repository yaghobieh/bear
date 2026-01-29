import { FC } from 'react';
import { BottomNavigationProps } from './BottomNavigation.types';
import { cn } from '@utils';

export const BottomNavigation: FC<BottomNavigationProps> = ({
  items,
  value,
  onChange,
  showLabels = 'active',
  variant = 'default',
  className,
}) => {
  const variantClasses = {
    default: 'bear-bg-zinc-900 bear-border-t bear-border-zinc-800',
    elevated: 'bear-bg-zinc-900 bear-shadow-[0_-4px_20px_rgba(0,0,0,0.3)]',
    transparent: 'bear-bg-zinc-900/80 bear-backdrop-blur-md bear-border-t bear-border-zinc-800/50',
  };

  const shouldShowLabel = (isActive: boolean) => {
    if (showLabels === true || showLabels === 'always') return true;
    if (showLabels === 'active') return isActive;
    return false;
  };

  return (
    <nav className={cn(
      'bear-fixed bear-bottom-0 bear-left-0 bear-right-0 bear-z-50 bear-h-16 bear-flex bear-items-center bear-justify-around bear-px-2',
      variantClasses[variant],
      className
    )}>
      {items.map((item) => {
        const isActive = value === item.id;
        return (
          <button
            key={item.id}
            onClick={() => !item.disabled && onChange?.(item.id)}
            disabled={item.disabled}
            className={cn(
              'bear-flex bear-flex-col bear-items-center bear-justify-center bear-flex-1 bear-h-full bear-py-2 bear-transition-all',
              isActive ? 'bear-text-pink-400' : 'bear-text-zinc-500 hover:bear-text-zinc-300',
              item.disabled && 'bear-opacity-50 bear-cursor-not-allowed'
            )}
          >
            <div className="bear-relative">
              <span className={cn('bear-transition-transform', isActive && 'bear-scale-110')}>
                {item.icon}
              </span>
              {item.badge !== undefined && (
                <span className="bear-absolute -bear-top-1 -bear-right-1 bear-min-w-[16px] bear-h-4 bear-px-1 bear-flex bear-items-center bear-justify-center bear-text-xs bear-font-medium bear-bg-pink-500 bear-text-white bear-rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            {shouldShowLabel(isActive) && (
              <span className={cn(
                'bear-text-xs bear-mt-1 bear-transition-all',
                isActive ? 'bear-font-medium' : ''
              )}>
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

