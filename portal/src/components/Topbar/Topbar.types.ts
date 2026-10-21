import type { PORTAL_TEXT } from '@/constants/portal-i18n.const';

export type PortalCopyKey = keyof typeof PORTAL_TEXT.en;

export interface TopbarProps {
  onMenuClick?: () => void;
  banner?: {
    id?: string;
    message: string;
    link?: string;
    linkText?: string;
  };
  onBannerVisibilityChange?: (visible: boolean) => void;
}

export interface TopNavLink {
  labelKey: PortalCopyKey;
  path: string;
}

export interface ProductMenuItem {
  id: string;
  path: string;
  nameKey: PortalCopyKey;
  descKey: PortalCopyKey;
  icon: 'package' | 'sparkles' | 'layers' | 'code' | 'wrench' | 'globe' | 'inbox' | 'palette' | 'calendar' | 'edit';
}

export interface ProductMenuGroup {
  id: string;
  titleKey: PortalCopyKey;
  items: ProductMenuItem[];
}

export interface IconProps {
  size?: number;
  className?: string;
}
