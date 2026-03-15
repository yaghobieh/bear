import { FC } from 'react';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon.types';

type IconComponent = FC<Omit<IconProps, 'children'>>;

export const HoneycombIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M12 2l2.5 4.3v4.3l2.5 1.5 2.5-1.5V6.3L20 2h-2.5l-2.5 4.3v4.3l-2.5 1.5-2.5-1.5V6.3L6.5 2H4l2.5 4.3v4.3l2.5 1.5 2.5-1.5V6.3L12 2z" />
    <path d="M4 11l2.5 4.3v4.3l2.5 1.5 2.5-1.5v-4.3L14 11h-2.5l-2.5 4.3v4.3l-2.5 1.5-2.5-1.5v-4.3L4 11z" />
    <path d="M20 11l-2.5 4.3v4.3l-2.5 1.5-2.5-1.5v-4.3L10 11h2.5l2.5 4.3v4.3l2.5 1.5 2.5-1.5v-4.3L20 11z" />
    <path d="M12 18l2.5 4.3v4.3l2.5 1.5 2.5-1.5v-4.3L20 18h-2.5l-2.5 4.3v4.3l-2.5 1.5-2.5-1.5v-4.3L12 18z" />
  </Icon>
);

export const ClawIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M12 5c-1.2 0-2 1.2-2 2.5s.8 2.5 2 2.5 2-1.2 2-2.5S13.2 5 12 5z" />
    <path d="M6.5 8.5c-.8 0-1.5 1-1.5 2s.7 2 1.5 2 1.5-1 1.5-2-.7-2-1.5-2z" />
    <path d="M17.5 8.5c.8 0 1.5 1 1.5 2s-.7 2-1.5 2-1.5-1-1.5-2 .7-2 1.5-2z" />
    <path d="M4 14c-.6 0-1.2.8-1.2 1.6s.6 1.6 1.2 1.6 1.2-.8 1.2-1.6S4.6 14 4 14z" />
    <path d="M20 14c.6 0 1.2.8 1.2 1.6s-.6 1.6-1.2 1.6-1.2-.8-1.2-1.6.6-1.6 1.2-1.6z" />
    <path d="M12 14v5M8 12v3M16 12v3M5 17v1.5M19 17v1.5" />
  </Icon>
);

export const ForestIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M12 3L8 9h2v4H6l4 6 4-6h-4V9h2L12 3z" />
    <path d="M4 21h16M7 21v-5l2.5 3 2.5-3v5M14.5 21v-3l1.5 2 1.5-2v3" />
    <path d="M2 21h3l1.5-2 1.5 2h3" />
  </Icon>
);

export const DenIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M4 20V10l8-6 8 6v10" />
    <path d="M4 10h16M9 20V14h6v6" />
    <path d="M12 10v4" />
  </Icon>
);

export const SalmonIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M4 12c0-3 2-6 6-6s6 3 6 6-2 6-6 6-6-3-6-6z" />
    <path d="M10 6v12M7 9l2 2.5-2 2.5M17 9l-2 2.5 2 2.5" />
    <path d="M6 11c1 .5 2 .5 3 0M6 13c1 .5 2 .5 3 0" />
  </Icon>
);

export const CampfireIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M12 3c1.5 1.5 3 4 3 6.5a3 3 0 0 1-6 0C9 7 10.5 4.5 12 3z" />
    <path d="M12 21c-2.5-1.5-5-4-5-7.5 0-1.5.8-3 2-4 1.2 1 2 2.5 2 4 0 3.5-2.5 6-5 7.5z" />
    <path d="M12 12v2" />
  </Icon>
);

export const PineTreeIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M12 2l1.5 5h-3l1.5 5h-3l1.5 5h-3l1.5-5H8l1.5-5h3L12 2z" />
    <path d="M12 22v-1.5" />
  </Icon>
);

export const MountainIcon: IconComponent = (props) => (
  <Icon {...props}>
    <path d="M4 20L12 4l8 16H4z" />
    <path d="M8 20l4-8 4 8" />
  </Icon>
);
