import type { DrawerProps } from '@forgedevstack/bear';

export type DrawerSide = NonNullable<DrawerProps['side']>;

export type DrawerSize = NonNullable<DrawerProps['size']>;

export interface DrawerDemoProps {
  side?: DrawerSide;
  size?: DrawerSize;
  variant?: DrawerProps['variant'];
  container?: Element | null;
  openEffect?: DrawerProps['openEffect'];
  closeEffect?: DrawerProps['closeEffect'];
}
