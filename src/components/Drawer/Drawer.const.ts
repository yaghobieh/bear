import {
  DRAWER_VARIANT_TEMPORARY,
  SIZE_MD,
  POSITION_RIGHT,
  THREE_HUNDRED,
} from '@const';
import type { DrawerProps, DrawerVariant } from './Drawer.types';

export const DRAWER_ANIMATION_MS = THREE_HUNDRED;
export const DRAWER_DEFAULT_SIDE: NonNullable<DrawerProps['side']> = POSITION_RIGHT;
export const DRAWER_DEFAULT_SIZE: NonNullable<DrawerProps['size']> = SIZE_MD;
export const DRAWER_DEFAULT_VARIANT: DrawerVariant = DRAWER_VARIANT_TEMPORARY;
