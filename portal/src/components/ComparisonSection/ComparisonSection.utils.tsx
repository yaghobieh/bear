import type { ReactNode } from 'react';
import { CheckIcon, XIcon } from '@forgedevstack/bear';
import type { ComparisonStatus } from './ComparisonSection.types';
import {
  COMPARISON_STATUS_ICON_SIZE,
  COMPARISON_STATUS_SOON_CLASSES,
  COMPARISON_STATUS_PARTIAL_CLASSES,
  COMPARISON_ICON_SUCCESS_CLASSES,
  COMPARISON_ICON_FAILURE_CLASSES,
} from './ComparisonSection.const';

const STATUS_LABEL_MAP: Record<string, () => ReactNode> = {
  soon: () => <span className={COMPARISON_STATUS_SOON_CLASSES}>Soon</span>,
  partial: () => <span className={COMPARISON_STATUS_PARTIAL_CLASSES}>Partial</span>,
};

export const renderComparisonStatus = (value: unknown): ReactNode => {
  if (value === true) {
    return <CheckIcon size={COMPARISON_STATUS_ICON_SIZE} className={COMPARISON_ICON_SUCCESS_CLASSES} />;
  }
  if (typeof value === 'string' && STATUS_LABEL_MAP[value]) {
    return STATUS_LABEL_MAP[value]();
  }
  return <XIcon size={COMPARISON_STATUS_ICON_SIZE} className={COMPARISON_ICON_FAILURE_CLASSES} />;
};

export const getComparisonRowId = (row: { id: number }): number => row.id;
