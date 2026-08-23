import { useState } from 'react';
import { AVATAR_MAX_INITIALS, BOOLEAN_FALSE } from '@const';
import { cn } from '@utils';
import { Box } from '../Box';
import { UserIcon } from '../Icon';
import type { AvatarProps } from './Avatar.types';
import { AVATAR_SIZE, AVATAR_VARIANT, AVATAR_STATUS, AVATAR_DEFAULTS } from './Avatar.const';

const renderAvatarContent = (args: {
  showFallback: boolean;
  initials?: string;
  src?: string;
  alt: string;
  rest: Record<string, unknown>;
  onImageError: () => void;
}) => {
  const { showFallback, initials, src, alt, rest, onImageError } = args;

  if (!showFallback) {
    return (
      <img
        src={src}
        alt={alt}
        onError={onImageError}
        className="Bear-Avatar__image bear-w-full bear-h-full bear-object-cover"
        {...rest}
      />
    );
  }

  if (initials) {
    return (
      <Box as="span" className="Bear-Avatar__initials bear-font-medium bear-text-gray-600 dark:bear-text-gray-300 bear-uppercase">
        {initials.slice(0, AVATAR_MAX_INITIALS)}
      </Box>
    );
  }

  return <UserIcon className="Bear-Avatar__placeholder bear-w-3/5 bear-h-3/5 bear-text-gray-400" />;
};

export const Avatar = (props: AvatarProps) => {
  const {
    src,
    alt = AVATAR_DEFAULTS.ALT,
    initials,
    size = AVATAR_DEFAULTS.SIZE,
    variant = AVATAR_DEFAULTS.VARIANT,
    status,
    bordered = BOOLEAN_FALSE,
    className,
    testId,
    ...rest
  } = props;

  const [hasError, setHasError] = useState(BOOLEAN_FALSE);
  const showFallback = !src || hasError;

  return (
    <div
      className={cn(
        'Bear-Avatar',
        'bear-relative bear-inline-flex bear-items-center bear-justify-center',
        'bear-bg-gray-200 dark:bear-bg-gray-700',
        'bear-overflow-hidden',
        AVATAR_SIZE[size],
        AVATAR_VARIANT[variant],
        bordered && 'Bear-Avatar--bordered bear-ring-2 bear-ring-white dark:bear-ring-gray-900',
        className
      )}
      data-testid={testId}
    >
      {renderAvatarContent({
        showFallback,
        initials,
        src,
        alt,
        rest: rest as Record<string, unknown>,
        onImageError: () => setHasError(true),
      })}

      {status && (
        <span
          className={cn(
            'Bear-Avatar__status',
            `Bear-Avatar__status--${status}`,
            'bear-absolute bear-bottom-0 bear-right-0',
            'bear-w-1/4 bear-h-1/4 bear-min-w-[8px] bear-min-h-[8px]',
            'bear-rounded-full bear-ring-2 bear-ring-white dark:bear-ring-gray-900',
            AVATAR_STATUS[status]
          )}
        />
      )}
    </div>
  );
};
