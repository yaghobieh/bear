import { KEY_ENTER, KEY_SPACE } from '@const';
import type { KeyboardEvent } from 'react';

export const handleStatCardKeyDown = (
  event: KeyboardEvent<HTMLDivElement>,
  onClick?: () => void
) => {
  if (!onClick) {
    return;
  }
  if (event.key !== KEY_ENTER && event.key !== KEY_SPACE) {
    return;
  }
  event.preventDefault();
  onClick();
};
