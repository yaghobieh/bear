import { TWENTY, POSITION_RIGHT, LABEL_CLOSE_DRAWER, INPUT_TYPE_BUTTON } from '@const';
import { XIcon } from '../../../Icon';
import type { DrawerHeaderProps } from '../../Drawer.types';

export const DrawerHeader = (props: DrawerHeaderProps) => {
  const { side, title, titleId, showCloseButton, onClose, direction } = props;

  const closeButton = showCloseButton ? (
    <button
      type={INPUT_TYPE_BUTTON}
      className="Bear-Drawer__close"
      aria-label={LABEL_CLOSE_DRAWER}
      onClick={onClose}
    >
      <XIcon size={TWENTY} />
    </button>
  ) : null;

  const titleNode = title ? (
    <h2 id={titleId} className="Bear-Drawer__title">
      {title}
    </h2>
  ) : null;

  const leading = side === POSITION_RIGHT ? closeButton : titleNode;
  const trailing = side === POSITION_RIGHT ? titleNode : closeButton;

  return (
    <div className="Bear-Drawer__header" dir={direction}>
      {leading}
      {trailing}
    </div>
  );
};
