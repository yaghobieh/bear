import { ZERO } from '@const';
import type { ReactNode } from 'react';
import { Children } from 'react';

export const resolveAvatarGroupItems = (children: ReactNode, max?: number) => {
  const avatars = Children.toArray(children);
  const visible = max ? avatars.slice(ZERO, max) : avatars;
  const remaining = max ? avatars.length - max : ZERO;
  return { visible, remaining };
};
