import type { ReactNode } from 'react';
import type { MaxVisibleInput } from '../../utils/maxVisible.utils';

export type BreadcrumbSize = 'sm' | 'md' | 'lg';

export interface BreadcrumbDropdownItem {
  key: string;
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
  /** When set, the crumb opens a dropdown (same shape as Dropdown items). */
  dropdownItems?: BreadcrumbDropdownItem[];
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  /** Collapse middle crumbs into a "…" menu when items.length exceeds this threshold. Number or breakpoint map (same rules as TabList maxVisibleTabs). */
  maxItems?: MaxVisibleInput;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  className?: string;
  size?: BreadcrumbSize;
  showHomeIcon?: boolean;
  testId?: string;
  id?: string;
  'aria-label'?: string;
}
