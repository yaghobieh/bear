import { ReactNode } from 'react';

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
  size?: 'sm' | 'md' | 'lg';
  showHomeIcon?: boolean;
}

