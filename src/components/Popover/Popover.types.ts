import { ReactNode } from 'react';

export type PopoverPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

export interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  placement?: PopoverPlacement;
  trigger?: 'click' | 'hover';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  offset?: number;
}

