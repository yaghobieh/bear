import type { ComponentType } from 'react';
import { LABEL_DISMISS } from '@const';
import { CheckCircleIcon, ErrorIcon, InfoIcon, WarningIcon } from '../Icon';
import type { BannerPosition, BannerSeverity, BannerTranslations } from './Banner.types';

export const BANNER_DEFAULT_TRANSLATIONS: BannerTranslations = {
  dismissLabel: LABEL_DISMISS,
};

export const BANNER_DEFAULT_ICON_MAP: Record<BannerSeverity, ComponentType> = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

export const BANNER_POSITION_CLASSES: Record<BannerPosition, string> = {
  static: '',
  sticky: 'bear-sticky bear-top-0 bear-z-40',
};

export const BANNER_SEVERITY_CLASSES: Record<BannerSeverity, string> = {
  info: 'bear-bg-[var(--bear-info-50,#eff6ff)] bear-text-[var(--bear-info-800,#1e40af)]',
  success: 'bear-bg-[var(--bear-success-50,#f0fdf4)] bear-text-[var(--bear-success-800,#166534)]',
  warning: 'bear-bg-[var(--bear-warning-50,#fffbeb)] bear-text-[var(--bear-warning-800,#92400e)]',
  error: 'bear-bg-[var(--bear-danger-50,#fef2f2)] bear-text-[var(--bear-danger-800,#991b1b)]',
};
