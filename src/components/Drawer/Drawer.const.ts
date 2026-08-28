import { THREE_HUNDRED, SIZE_MD, POSITION_RIGHT } from '@const';
import type { DrawerProps } from './Drawer.types';

export const DRAWER_ANIMATION_MS = THREE_HUNDRED;
export const DRAWER_DEFAULT_SIDE: NonNullable<DrawerProps['side']> = POSITION_RIGHT;
export const DRAWER_DEFAULT_SIZE: NonNullable<DrawerProps['size']> = SIZE_MD;
