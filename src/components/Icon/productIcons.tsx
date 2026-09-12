import { Icon } from '@forgedevstack/bear-icons';
import type { IconProps } from '@forgedevstack/bear-icons';
import type { FC } from 'react';

type ProductIcon = FC<Omit<IconProps, 'children'>>;

export const StorybookIcon: ProductIcon = (props) => (
  <Icon {...props}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 7h8" />
    <path d="M8 11h8" />
    <path d="M8 15h5" />
    <circle cx="17" cy="16.5" r="2.5" />
  </Icon>
);

export const SandboxIcon: ProductIcon = (props) => (
  <Icon {...props}>
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <path d="M12 12l8-4.5" />
    <path d="M12 12v9" />
    <path d="M12 12L4 7.5" />
    <path d="M9.5 14.5l1.5 1.5 3-3" />
  </Icon>
);

export const ComponentsIcon: ProductIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </Icon>
);
