import { ReactNode } from 'react';

export interface CollapsibleProps {
  children: ReactNode;
  trigger: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  animationDuration?: number;
}

