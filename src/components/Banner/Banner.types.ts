import type { HTMLAttributes, ReactNode } from 'react';

export type BannerSeverity = 'info' | 'success' | 'warning' | 'error';

export type BannerPosition = 'static' | 'sticky';

export interface BannerTranslations {
  dismissLabel: string;
}

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  severity?: BannerSeverity;
  title?: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  icon?: boolean | ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  open?: boolean;
  position?: BannerPosition;
  fullWidth?: boolean;
  translations?: Partial<BannerTranslations>;
  id?: string;
  testId?: string;
}
