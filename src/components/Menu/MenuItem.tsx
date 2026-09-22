import { FC } from 'react';
import { cn } from '@utils';
import { NEGATIVE_ONE, ZERO } from '@constants';
import { MenuDivider } from './MenuDivider';
import type { MenuItemProps } from './Menu.types';

/**
 * MenuItem component for menu items
 */
export const MenuItem: FC<MenuItemProps> = ({
  icon,
  disabled = false,
  selected = false,
  divider = false,
  children,
  onClick,
  className,
  testId,
  ...props
}) => {
  return (
    <>
      <div
        role="menuitem"
        tabIndex={disabled ? NEGATIVE_ONE : ZERO}
        className={cn(
          'bear-flex bear-items-center bear-gap-3 bear-px-4 bear-py-2 bear-cursor-pointer bear-transition-colors',
          'hover:bear-bg-gray-100 dark:hover:bear-bg-gray-700',
          'focus:bear-outline-none focus:bear-bg-gray-100 dark:focus:bear-bg-gray-700',
          selected && 'bear-bg-primary-50 dark:bear-bg-primary-900/20 bear-text-primary-600',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed hover:bear-bg-transparent',
          className
        )}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            onClick?.();
          }
        }}
        data-testid={testId}
        {...props}
      >
        {icon && (
          <span className="bear-flex-shrink-0 bear-text-gray-500">
            {icon}
          </span>
        )}
        <span className="bear-flex-1 bear-text-sm">
          {children}
        </span>
      </div>
      {divider && <MenuDivider />}
    </>
  );
};
