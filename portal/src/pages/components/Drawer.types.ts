import type { DrawerProps } from '@forgedevstack/bear';

export type DrawerSide = NonNullable<DrawerProps['side']>;

export type DrawerSize = NonNullable<DrawerProps['size']>;

export interface DrawerDemoProps {
  side?: DrawerSide;
  size?: DrawerSize;
  container?: Element | null;
}
