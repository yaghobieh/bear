import { FC } from 'react';
import type { BottomNavigationProps } from './BottomNavigation.types';
import {
  BOTTOM_NAVIGATION_ROOT_CLASS,
  BOTTOM_NAVIGATION_VARIANT_CLASSES,
  BOTTOM_NAVIGATION_ACTIVE_CLASSES,
  BOTTOM_NAVIGATION_INACTIVE_CLASSES,
} from './BottomNavigation.const';
import { cn, resolveBearId, useBearId } from '@utils';

export const BottomNavigation: FC<BottomNavigationProps> = (props) => {
  const {
    items,
    value,
    onChange,
    showLabels = 'active',
    variant = 'default',
    className,
    id,
    testId,
  } = props;

  const generatedId = useBearId('BottomNavigation');
  const domId = resolveBearId(id, generatedId);

  const shouldShowLabel = (isActive: boolean) => {
    if (showLabels === true || showLabels === 'always') return true;
    if (showLabels === 'active') return isActive;
    return false;
  };

  return (
    <nav
      id={domId}
      data-testid={testId}
      className={cn(
        BOTTOM_NAVIGATION_ROOT_CLASS,
        'bear-fixed bear-bottom-0 bear-left-0 bear-right-0 bear-z-50 bear-h-16 bear-flex bear-items-center bear-justify-around bear-px-2',
        BOTTOM_NAVIGATION_VARIANT_CLASSES[variant],
        className
      )}
    >
      {items.map((item) => {
        const isActive = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => !item.disabled && onChange?.(item.id)}
            disabled={item.disabled}
            className={cn(
              `${BOTTOM_NAVIGATION_ROOT_CLASS}__item`,
              'bear-flex bear-flex-col bear-items-center bear-justify-center bear-flex-1 bear-h-full bear-py-2 bear-transition-all',
              isActive ? BOTTOM_NAVIGATION_ACTIVE_CLASSES : BOTTOM_NAVIGATION_INACTIVE_CLASSES,
              item.disabled && 'bear-opacity-50 bear-cursor-not-allowed'
            )}
          >
            <div className="bear-relative">
              <span className={cn('bear-transition-transform', isActive && 'bear-scale-110')}>
                {item.icon}
              </span>
              {item.badge !== undefined && (
                <span className="bear-absolute -bear-top-1 -bear-right-1 bear-min-w-[16px] bear-h-4 bear-px-1 bear-flex bear-items-center bear-justify-center bear-text-xs bear-font-medium bear-bg-primary-500 bear-text-white bear-rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            {shouldShowLabel(isActive) && (
              <span
                className={cn(
                  'bear-text-xs bear-mt-1 bear-transition-all',
                  isActive ? 'bear-font-medium' : ''
                )}
              >
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
