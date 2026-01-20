import type { HTMLAttributes } from 'react';
import type { ResponsiveProp } from '../../types';

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
export type GridFlow = 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  cols?: ResponsiveProp<GridCols>;
  /** Gap between items */
  gap?: ResponsiveProp<GridGap>;
  /** Row gap */
  rowGap?: ResponsiveProp<GridGap>;
  /** Column gap */
  colGap?: ResponsiveProp<GridGap>;
  /** Grid flow */
  flow?: GridFlow;
  /** Test ID */
  testId?: string;
}

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Column span */
  colSpan?: ResponsiveProp<GridCols | 'full'>;
  /** Row span */
  rowSpan?: ResponsiveProp<1 | 2 | 3 | 4 | 5 | 6>;
  /** Column start */
  colStart?: ResponsiveProp<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 'auto'>;
  /** Column end */
  colEnd?: ResponsiveProp<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 'auto'>;
}

