import { ReactNode } from 'react';

export type BreadcrumbSize = 'sm' | 'md' | 'lg';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  className?: string;
  size?: BreadcrumbSize;
  showHomeIcon?: boolean;
  /** Unique identifier for testing */
  testId?: string;
  /** HTML id attribute */
  id?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}
