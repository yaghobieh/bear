import React, { FC, useState } from 'react';
import { cn } from '@utils';
import type { AvatarProps, AvatarGroupProps } from './Avatar.types';
import { AVATAR_SIZE, AVATAR_VARIANT, AVATAR_STATUS, AVATAR_DEFAULTS } from './Avatar.const';

/**
 * Avatar - User profile image with fallback
 * 
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="John Doe" size="md" status="online" />
 * <Avatar initials="JD" size="lg" variant="rounded" />
 * ```
 */
export const Avatar: FC<AvatarProps> = (props) => {
  const {
    src,
    alt = AVATAR_DEFAULTS.ALT,
    initials,
    size = AVATAR_DEFAULTS.SIZE,
    variant = AVATAR_DEFAULTS.VARIANT,
    status,
    bordered = false,
    className,
    testId,
    ...rest
  } = props;

  const [hasError, setHasError] = useState(false);
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
      {showFallback ? (
        initials ? (
          <span className="Bear-Avatar__initials bear-font-medium bear-text-gray-600 dark:bear-text-gray-300 bear-uppercase">
            {initials.slice(0, AVATAR_DEFAULTS.MAX_INITIALS)}
          </span>
        ) : (
          <svg className="Bear-Avatar__placeholder bear-w-3/5 bear-h-3/5 bear-text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="Bear-Avatar__image bear-w-full bear-h-full bear-object-cover"
          {...rest}
        />
      )}
      
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

/**
 * AvatarGroup - Stack of overlapping avatars
 */
export const AvatarGroup: FC<AvatarGroupProps> = (props) => {
  const {
    children,
    max,
    size = AVATAR_DEFAULTS.SIZE,
    className,
  } = props;

  const avatars = React.Children.toArray(children);
  const visible = max ? avatars.slice(0, max) : avatars;
  const remaining = max ? avatars.length - max : 0;
  
  return (
    <div className={cn('Bear-AvatarGroup bear-flex bear--space-x-2', className)}>
      {visible.map((child, index) => (
        <div key={index} className="Bear-AvatarGroup__item bear-relative" style={{ zIndex: visible.length - index }}>
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'Bear-AvatarGroup__overflow',
            'bear-relative bear-inline-flex bear-items-center bear-justify-center',
            'bear-bg-gray-200 dark:bear-bg-gray-700 bear-rounded-full',
            'bear-ring-2 bear-ring-white dark:bear-ring-gray-900',
            'bear-text-gray-600 dark:bear-text-gray-300 bear-font-medium',
            AVATAR_SIZE[size]
          )}
          style={{ zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};
