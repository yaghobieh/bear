import {
  NPM_INSTALL_BEAR,
  NPM_INSTALL_ICONS,
  PATH_CHARTS,
  PATH_COMPONENTS,
  PATH_DESIGN_KITS,
  PATH_ICONS,
} from '@/constants/marketing.const';

export const PRODUCT_CARD_KEYS = ['bear', 'icons', 'charts', 'kits'] as const;

export type ProductCardKey = (typeof PRODUCT_CARD_KEYS)[number];

export const PRODUCT_NAME_KEY: Record<ProductCardKey, 'productBearName' | 'productIconsName' | 'productChartsName' | 'productKitsName'> = {
  bear: 'productBearName',
  icons: 'productIconsName',
  charts: 'productChartsName',
  kits: 'productKitsName',
};

export const PRODUCT_DESC_KEY: Record<ProductCardKey, 'productBearDesc' | 'productIconsDesc' | 'productChartsDesc' | 'productKitsDesc'> = {
  bear: 'productBearDesc',
  icons: 'productIconsDesc',
  charts: 'productChartsDesc',
  kits: 'productKitsDesc',
};

export const PRODUCT_HREF: Record<ProductCardKey, string> = {
  bear: PATH_COMPONENTS,
  icons: PATH_ICONS,
  charts: PATH_CHARTS,
  kits: PATH_DESIGN_KITS,
};

export const PRODUCT_INSTALL: Record<ProductCardKey, string | null> = {
  bear: NPM_INSTALL_BEAR,
  icons: NPM_INSTALL_ICONS,
  charts: NPM_INSTALL_ICONS,
  kits: null,
};
