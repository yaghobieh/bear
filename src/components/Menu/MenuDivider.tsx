import { FC } from 'react';
import { cn } from '@utils';
import type { MenuDividerProps } from './Menu.types';

/**
 * MenuDivider component for separating menu sections
 */
export const MenuDivider: FC<MenuDividerProps> = ({ className }) => (
  <div className={cn('bear-h-px bear-bg-gray-200 dark:bear-bg-gray-700 bear-my-1', className)} />
);
