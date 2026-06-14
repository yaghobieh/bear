import type { HTMLAttributes } from 'react';

export interface AnchorLink {
  id: string;
  label: string;
  children?: AnchorLink[];
}

export interface AnchorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  id?: string;
  links: AnchorLink[];
  offset?: number;
  affix?: boolean;
  affixTop?: number;
  targetOffset?: number;
  onClick?: (id: string) => void;
  activeColor?: string;
  testId?: string;
}
