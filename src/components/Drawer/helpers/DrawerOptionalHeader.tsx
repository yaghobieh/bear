import { DrawerHeader } from '../components/DrawerHeader';
import type { DrawerOptionalHeaderProps } from '../components/DrawerHeader/DrawerHeader.types';

export const DrawerOptionalHeader = (props: DrawerOptionalHeaderProps) => {
  const { showHeader, ...headerProps } = props;

  if (!showHeader) {
    return null;
  }

  return <DrawerHeader {...headerProps} />;
};
