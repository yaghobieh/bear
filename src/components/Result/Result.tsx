import { cn } from '@utils';
import { Typography } from '../Typography';
import type { ResultProps } from './Result.types';
import { STATUS_ICON_COLORS } from './Result.const';
import { getStatusIcon, isTextStatus } from './Result.utils';

export const Result = (props: ResultProps) => {
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

  const statusIcon = icon ?? getStatusIcon(status);
  const colorClass = STATUS_ICON_COLORS[status];

  return (
    <div
      className={cn(
        'Bear-Result bear-flex bear-flex-col bear-items-center bear-justify-center bear-text-center bear-py-16 bear-px-6',
        className
      )}
      data-testid={testId}
      {...rest}
    >
      <div
        className={cn(
          'bear-mb-4 bear-flex bear-items-center bear-justify-center',
          !isTextStatus(status) && 'bear-w-16 bear-h-16',
          colorClass
        )}
      >
        {statusIcon}
      </div>
      <Typography variant="h4" className="bear-mb-2">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="secondary" className="bear-mb-6 bear-max-w-md">
          {subtitle}
        </Typography>
      )}
      {extra && (
        <div className="bear-flex bear-flex-wrap bear-gap-2 bear-justify-center">{extra}</div>
      )}
    </div>
  );
};
