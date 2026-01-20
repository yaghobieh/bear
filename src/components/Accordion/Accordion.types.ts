import type { ReactNode } from 'react';

export interface AccordionContextValue {
  openItems: string[];
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

export interface AccordionProps {
  /** Accordion items */
  children: ReactNode;
  /** Allow multiple items open at once */
  allowMultiple?: boolean;
  /** Default open items */
  defaultOpen?: string[];
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

export interface AccordionItemProps {
  /** Unique identifier */
  id: string;
  /** Item header */
  title: ReactNode;
  /** Item content */
  children: ReactNode;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Icon to show (overrides default chevron) */
  icon?: ReactNode;
  /** Custom class name */
  className?: string;
}

