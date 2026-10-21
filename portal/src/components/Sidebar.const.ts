import { FC } from 'react';
import { BearIcons } from '@forgedevstack/bear';
import type { IconProps } from '@forgedevstack/bear';

export const GROUP_ICON_MAP: Record<string, FC<Omit<IconProps, 'children'>>> = {
  RocketIcon: BearIcons.RocketIcon,
  LayersIcon: BearIcons.ComponentsIcon,
  ZapIcon: BearIcons.ZapIcon,
  BarChartIcon: BearIcons.BarChartIcon,
  CodeIcon: BearIcons.CodeBlockIcon,
  PaletteIcon: BearIcons.PaletteIcon,
  TuneIcon: BearIcons.TuneIcon,
  GridIcon: BearIcons.GridIcon,
  CssIcon: BearIcons.CodeIcon,
  StyleIcon: BearIcons.FormatColorTextIcon,
  BookOpenIcon: BearIcons.BookOpenIcon,
  AnchorIcon: BearIcons.AnchorIcon,
  ShoppingBagIcon: BearIcons.ShoppingBagIcon,
};

export const SIDEBAR_NAV_STORAGE_PREFIX = 'bear-nav-';
export const SIDEBAR_GROUP_STORAGE_PREFIX = 'bear-sidebar-';
export const SIDEBAR_WIDTH_CLASS = 'w-64';
