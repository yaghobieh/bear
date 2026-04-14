import type { HTMLAttributes } from 'react';

export type TagCloudLayout = 'flow' | 'circle';

export interface TagCloudItem {
  text: string;
  value: number;
  color?: string;
  href?: string;
}

export interface TagCloudProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Tags with text and weight value */
  tags: TagCloudItem[];
  /** Minimum font size in px */
  minFontSize?: number;
  /** Maximum font size in px */
  maxFontSize?: number;
  /** Color palette (cycled through) */
  colors?: string[];
  /** Layout mode */
  layout?: TagCloudLayout;
  /** Responsive: collapse to scrollable list on mobile */
  mobileCompact?: boolean;
  /** Callback when a tag is clicked */
  onTagClick?: (tag: TagCloudItem) => void;
  /** Test ID */
  testId?: string;
}
