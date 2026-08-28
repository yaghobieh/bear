import type { DrawerSide } from '../../Drawer.types';

export interface DrawerHeaderTitleProps {
  title?: string;
  titleId: string;
}

export interface DrawerHeaderCloseProps {
  showCloseButton: boolean;
  onClose: () => void;
}

export interface DrawerHeaderProps {
  side: DrawerSide;
  title?: string;
  titleId: string;
  showCloseButton: boolean;
  onClose: () => void;
  direction?: string;
}

export interface DrawerOptionalHeaderProps extends DrawerHeaderProps {
  showHeader: boolean;
}

