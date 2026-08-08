import type { HTMLAttributes, ReactNode } from 'react';

export type AppShellNavbarWidth = 'sm' | 'md' | 'lg';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  navbar?: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  navbarCollapsed?: boolean;
  navbarWidth?: AppShellNavbarWidth;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  padding?: boolean;
  id?: string;
  testId?: string;
}
