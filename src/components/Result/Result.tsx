import { FC } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { ResultProps } from './Result.types';
import {
  ROOT_CLASS,
  CONTAINER_CLASSES,
  ICON_WRAPPER_CLASSES,
  ICON_SIZE_CLASSES,
  STATUS_ICON_COLORS,
  STATUS_TEXT_CLASSES,
  TITLE_CLASSES,
  SUBTITLE_CLASSES,
  EXTRA_CLASSES,
} from './Result.const';
import { getStatusIcon } from './Result.icons';

export const Result: FC<ResultProps> = (props) => {
  const {
    status,
    title,
    subtitle,
    icon,
    extra,
    className,
    testId,
    ...rest
  } = props;

  const statusIcon = icon ?? getStatusIcon(status, STATUS_TEXT_CLASSES);
  const colorClass = STATUS_ICON_COLORS[status];
  const isTextStatus = status === '404' || status === '403' || status === '500';

  return (
    <div
      className={cn(ROOT_CLASS, CONTAINER_CLASSES, className)}
      data-testid={testId}
      {...rest}
    >
      <div className={cn(ICON_WRAPPER_CLASSES, !isTextStatus && ICON_SIZE_CLASSES, colorClass)}>
        {statusIcon}
      </div>
      <Typography variant="h4" className={cn(TITLE_CLASSES, 'bear-text-gray-900 dark:bear-text-zinc-100')}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="secondary" className={SUBTITLE_CLASSES}>
          {subtitle}
        </Typography>
      )}
      {extra && <div className={EXTRA_CLASSES}>{extra}</div>}
    </div>
  );
};

export default Result;
