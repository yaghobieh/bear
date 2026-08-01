import type { HTMLAttributes, ReactNode, MouseEvent } from 'react';

export interface BackdropProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  id?: string;
  testId?: string;
  open?: boolean;
  invisible?: boolean;
  blur?: boolean;
  zIndex?: number;
  transitionDuration?: number;
  keepMounted?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  children?: ReactNode;
  className?: string;
}
