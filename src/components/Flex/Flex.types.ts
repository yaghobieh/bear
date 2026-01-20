import type { HTMLAttributes } from 'react';
import type { ResponsiveProp } from '../../types';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /** Flex direction */
  direction?: ResponsiveProp<FlexDirection>;
  /** Flex wrap */
  wrap?: ResponsiveProp<FlexWrap>;
  /** Align items */
  align?: ResponsiveProp<FlexAlign>;
  /** Justify content */
  justify?: ResponsiveProp<FlexJustify>;
  /** Gap between items */
  gap?: ResponsiveProp<FlexGap>;
  /** Whether to use inline-flex */
  inline?: boolean;
  /** Test ID */
  testId?: string;
}

