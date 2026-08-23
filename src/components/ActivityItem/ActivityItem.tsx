import { ACTIVITY_ICON_BG } from '@const';
import { cn } from '@utils';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import type { ActivityItemProps } from './ActivityItem.types';

export const ActivityItem = (props: ActivityItemProps) => {
  const {
    icon,
    iconBg = ACTIVITY_ICON_BG,
    title,
    description,
    user,
    time,
    onClick,
    className,
    ...rest
  } = props;

  return (
    <Flex
      className={cn(
        'Bear-ActivityItem bear-items-start bear-gap-4 bear-p-4 hover:bear-bg-slate-700/30 dark:hover:bear-bg-slate-700/30 bear-rounded-xl bear-transition-colors bear-cursor-pointer',
        className
      )}
      onClick={onClick}
      {...rest}
    >
      <Flex
        className="Bear-ActivityItem__icon bear-items-center bear-justify-center bear-w-10 bear-h-10 bear-rounded-xl bear-flex-shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </Flex>
      <Box className="Bear-ActivityItem__body bear-flex-1 bear-min-w-0">
        <Typography className="Bear-ActivityItem__title bear-text-gray-900 dark:bear-text-white bear-font-medium bear-truncate">
          {title}
        </Typography>
        <Typography className="Bear-ActivityItem__description bear-text-gray-500 dark:bear-text-slate-400 bear-text-sm bear-truncate">
          {description}
        </Typography>
      </Box>
      <Box className="Bear-ActivityItem__meta bear-text-right bear-flex-shrink-0">
        <Typography className="Bear-ActivityItem__time bear-text-gray-500 dark:bear-text-slate-400 bear-text-sm">
          {time}
        </Typography>
        {user && (
          <Typography className="Bear-ActivityItem__user bear-text-gray-400 dark:bear-text-slate-500 bear-text-xs">
            {user}
          </Typography>
        )}
      </Box>
    </Flex>
  );
};
