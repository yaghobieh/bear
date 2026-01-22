/**
 * TransferList Component Types
 */
import type { HTMLAttributes, ReactNode } from 'react';

export interface TransferListItem {
  /** Unique identifier */
  id: string | number;
  /** Display label */
  label: string;
  /** Secondary text */
  secondary?: string;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Custom icon */
  icon?: ReactNode;
}

export interface TransferListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Available items on the left side */
  leftItems: TransferListItem[];
  /** Selected items on the right side */
  rightItems: TransferListItem[];
  /** Left panel title */
  leftTitle?: string;
  /** Right panel title */
  rightTitle?: string;
  /** Show search filter */
  searchable?: boolean;
  /** Left search placeholder */
  leftSearchPlaceholder?: string;
  /** Right search placeholder */
  rightSearchPlaceholder?: string;
  /** Show item count */
  showCount?: boolean;
  /** Whether to show checkboxes */
  showCheckboxes?: boolean;
  /** Max height of panels */
  maxHeight?: number | string;
  /** Handler when items change */
  onChange?: (left: TransferListItem[], right: TransferListItem[]) => void;
  /** Handler when items move to right */
  onMoveRight?: (items: TransferListItem[]) => void;
  /** Handler when items move to left */
  onMoveLeft?: (items: TransferListItem[]) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Test ID */
  testId?: string;
}

