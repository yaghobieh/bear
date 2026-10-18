import type { PortalCopyKey } from '@/components/Topbar/Topbar.types';

export interface AboutLink {
  id: string;
  href: string;
  labelKey: PortalCopyKey;
  external: boolean;
}

export interface AboutStat {
  id: string;
  value: string;
  labelKey: PortalCopyKey;
}

export interface AboutPrinciple {
  id: string;
  titleKey: PortalCopyKey;
  bodyKey: PortalCopyKey;
  path: string;
}
