import type { DrawerProps } from './Drawer.types';

type DrawerSide = NonNullable<DrawerProps['side']>;
type DrawerSize = NonNullable<DrawerProps['size']>;

export const DRAWER_ANIMATION_MS = 300;

export const SIZE_CLASSES: Record<DrawerSide, Record<DrawerSize, string>> = {
  left: {
    sm: 'bear-w-full sm:bear-w-64 bear-max-w-full sm:bear-max-w-none',
    md: 'bear-w-full sm:bear-w-80 bear-max-w-full sm:bear-max-w-none',
    lg: 'bear-w-full sm:bear-w-96 bear-max-w-full sm:bear-max-w-none',
    xl: 'bear-w-full sm:bear-w-[32rem] bear-max-w-full sm:bear-max-w-none',
  },
  right: {
    sm: 'bear-w-full sm:bear-w-64 bear-max-w-full sm:bear-max-w-none',
    md: 'bear-w-full sm:bear-w-80 bear-max-w-full sm:bear-max-w-none',
    lg: 'bear-w-full sm:bear-w-96 bear-max-w-full sm:bear-max-w-none',
    xl: 'bear-w-full sm:bear-w-[32rem] bear-max-w-full sm:bear-max-w-none',
  },
  top: {
    sm: 'bear-h-32',
    md: 'bear-h-48',
    lg: 'bear-h-64',
    xl: 'bear-h-96',
  },
  bottom: {
    sm: 'bear-h-32',
    md: 'bear-h-48',
    lg: 'bear-h-64',
    xl: 'bear-h-96',
  },
};

export const POSITION_CLASSES: Record<DrawerSide, string> = {
  left: 'bear-left-0 bear-top-0 bear-h-full',
  right: 'bear-right-0 bear-top-0 bear-h-full',
  top: 'bear-top-0 bear-left-0 bear-w-full',
  bottom: 'bear-bottom-0 bear-left-0 bear-w-full',
};

export const TRANSFORM_OPEN: Record<DrawerSide, string> = {
  left: 'bear-translate-x-0',
  right: 'bear-translate-x-0',
  top: 'bear-translate-y-0',
  bottom: 'bear-translate-y-0',
};

export const TRANSFORM_CLOSED: Record<DrawerSide, string> = {
  left: '-bear-translate-x-full',
  right: 'bear-translate-x-full',
  top: '-bear-translate-y-full',
  bottom: 'bear-translate-y-full',
};

export const BORDER_SIDE_MAP: Record<DrawerSide, string> = {
  left: 'bear-border-r',
  right: 'bear-border-l',
  top: 'bear-border-b',
  bottom: 'bear-border-t',
};
