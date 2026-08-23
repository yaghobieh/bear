import type { BearSize } from './theme.types';

export type CompactBearSize = Extract<BearSize, 'sm' | 'md' | 'lg'>;

export type ActiveBarVariant = 'default' | 'pills' | 'underline';

export type ActionIconVariant = 'default' | 'filled' | 'outline' | 'subtle' | 'transparent';

export type ActionIconColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

export type ActionIconRadius = 'sm' | 'md' | 'lg' | 'full';
