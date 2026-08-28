import { LABEL_CLOSE_DRAWER } from '@const';
import { CloseButton } from '../../../CloseButton';
import type { DrawerHeaderCloseProps } from './DrawerHeader.types';

export const DrawerHeaderClose = (props: DrawerHeaderCloseProps) => {
  const { showCloseButton, onClose } = props;

  if (!showCloseButton) {
    return null;
  }

  return (
    <CloseButton
      className="Bear-Drawer__close"
      aria-label={LABEL_CLOSE_DRAWER}
      onClick={onClose}
    />
  );
};
