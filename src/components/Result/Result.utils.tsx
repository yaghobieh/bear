import type { ReactNode } from 'react';
import { SIXTY_FOUR, STATUS_FORBIDDEN, STATUS_NOT_FOUND, STATUS_SERVER_ERROR } from '@const';
import { CheckCircleIcon, ErrorIcon, InfoIcon, WarningIcon } from '../Icon';
import { Typography } from '../Typography';
import type { ResultStatus } from './Result.types';

const RESULT_STATUS_ICON_MAP: Partial<Record<ResultStatus, typeof CheckCircleIcon>> = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  info: InfoIcon,
  warning: WarningIcon,
};

const TEXT_STATUSES: ResultStatus[] = [
  STATUS_NOT_FOUND,
  STATUS_FORBIDDEN,
  STATUS_SERVER_ERROR,
];

export const isTextStatus = (status: ResultStatus): boolean => {
  return TEXT_STATUSES.includes(status);
};

export const getStatusIcon = (status: ResultStatus): ReactNode => {
  const IconComponent = RESULT_STATUS_ICON_MAP[status];
  if (IconComponent) {
    return <IconComponent size={SIXTY_FOUR} />;
  }
  return (
    <Typography variant="h2" className="bear-font-bold bear-leading-none">
      {status}
    </Typography>
  );
};
