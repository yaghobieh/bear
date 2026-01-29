import { HTMLAttributes, ReactNode } from 'react';

export interface ActivityItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon element */
  icon: ReactNode;
  /** Icon background color/gradient */
  iconBg?: string;
  /** Activity title */
  title: string;
  /** Activity description */
  description?: string;
  /** User who performed the activity */
  user?: string;
  /** Time of the activity */
  time: string;
  /** Click handler */
  onClick?: () => void;
}

