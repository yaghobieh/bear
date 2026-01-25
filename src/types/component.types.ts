/**
 * Bear Component Types
 * Shared types used across all Bear components
 */

import { ReactNode, CSSProperties } from 'react';

// Size variants
export type EmberSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// BearSize is exported from theme.types.ts

// Color variants
export type EmberVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info' 
  | 'ghost' 
  | 'outline'
  | 'error'; // Added error variant

export type BearVariant = EmberVariant; // Alias for Bear

import type { BisProp } from './bis.types';

// Common props shared across components
export interface EmberBaseProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Bear Inner Style - sx-like overrides (object or (theme) => object) */
  bis?: BisProp;
  /** Children elements */
  children?: ReactNode;
  /** Test ID for testing */
  testId?: string;
}

// Disabled state
export interface EmberDisableableProps {
  /** Whether the component is disabled */
  disabled?: boolean;
}

// Loading state
export interface EmberLoadingProps {
  /** Whether the component is in loading state */
  loading?: boolean;
}

// Responsive props helper
export type ResponsiveProp<T> = T | {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

// Polymorphic component helper
export type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = object
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = object
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

