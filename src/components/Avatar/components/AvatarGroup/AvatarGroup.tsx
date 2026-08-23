import { ZERO } from '@const';
import { cn } from '@utils';
import { Box } from '../../../Box';
import { AVATAR_DEFAULTS, AVATAR_SIZE } from './AvatarGroup.const';
import type { AvatarGroupProps } from './AvatarGroup.types';
import { resolveAvatarGroupItems } from './AvatarGroup.utils';

export const AvatarGroup = (props: AvatarGroupProps) => {
  const {
    children,
    max,
    size = AVATAR_DEFAULTS.SIZE,
    className,
  } = props;

  const { visible, remaining } = resolveAvatarGroupItems(children, max);

  return (
    <div className={cn('Bear-AvatarGroup bear-flex bear--space-x-2', className)}>
      {visible.map((child, index) => (
        <Box key={index} className="Bear-AvatarGroup__item bear-relative" style={{ zIndex: visible.length - index }}>
          {child}
        </Box>
      ))}
      {remaining > ZERO && (
        <Box
          className={cn(
            'Bear-AvatarGroup__overflow',
            'bear-relative bear-inline-flex bear-items-center bear-justify-center',
            'bear-bg-gray-200 dark:bear-bg-gray-700 bear-rounded-full',
            'bear-ring-2 bear-ring-white dark:bear-ring-gray-900',
            'bear-text-gray-600 dark:bear-text-gray-300 bear-font-medium',
            AVATAR_SIZE[size]
          )}
          style={{ zIndex: ZERO }}
        >
          +{remaining}
        </Box>
      )}
    </div>
  );
};
