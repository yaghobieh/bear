import { Flex } from '../../../Flex';
import { POSITION_RIGHT } from '@const';
import { cn } from '@utils';
import { DrawerHeaderClose } from './DrawerHeaderClose';
import { DrawerHeaderTitle } from './DrawerHeaderTitle';
import type { DrawerHeaderProps } from './DrawerHeader.types';

export const DrawerHeader = (props: DrawerHeaderProps) => {
  const { side, title, titleId, showCloseButton, onClose, direction } = props;
  const closeLeading = side === POSITION_RIGHT;

  return (
    <Flex
      className={cn('Bear-Drawer__header', closeLeading && 'Bear-Drawer__header--close-start')}
      align="center"
      justify="between"
      dir={direction}
    >
      <DrawerHeaderTitle title={title} titleId={titleId} />
      <DrawerHeaderClose showCloseButton={showCloseButton} onClose={onClose} />
    </Flex>
  );
};
