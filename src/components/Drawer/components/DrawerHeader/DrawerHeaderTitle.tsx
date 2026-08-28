import { Typography } from '../../../Typography';
import type { DrawerHeaderTitleProps } from './DrawerHeader.types';

export const DrawerHeaderTitle = (props: DrawerHeaderTitleProps) => {
  const { title, titleId } = props;

  if (!title) {
    return null;
  }

  return (
    <Typography id={titleId} variant="h2" className="Bear-Drawer__title">
      {title}
    </Typography>
  );
};
