import React, { FC, useState } from 'react';
import { cn } from '../../utils/cn';
import type { AvatarProps, AvatarGroupProps } from './Avatar.types';

const sizeClasses = {
  xs: 'bear-w-6 bear-h-6 bear-text-xs',
  sm: 'bear-w-8 bear-h-8 bear-text-sm',
  md: 'bear-w-10 bear-h-10 bear-text-base',
  lg: 'bear-w-12 bear-h-12 bear-text-lg',
  xl: 'bear-w-16 bear-h-16 bear-text-xl',
  '2xl': 'bear-w-20 bear-h-20 bear-text-2xl',
};

const variantClasses = {
  circle: 'bear-rounded-full',
  rounded: 'bear-rounded-lg',
  square: 'bear-rounded-none',
};

const statusClasses = {
  online: 'bear-bg-green-500',
  offline: 'bear-bg-gray-400',
  away: 'bear-bg-yellow-500',
  busy: 'bear-bg-red-500',
};

/**
 * Avatar - User profile image with fallback
 * 
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="John Doe" size="md" status="online" />
 * <Avatar initials="JD" size="lg" variant="rounded" />
 * ```
 */
export const Avatar: FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  variant = 'circle',
  status,
  bordered = false,
  className,
  testId,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const showFallback = !src || hasError;
  
  return (
    <div
      className={cn(
        'bear-relative bear-inline-flex bear-items-center bear-justify-center',
        'bear-bg-gray-200 dark:bear-bg-gray-700',
        'bear-overflow-hidden',
        sizeClasses[size],
        variantClasses[variant],
        bordered && 'bear-ring-2 bear-ring-white dark:bear-ring-gray-900',
        className
      )}
      data-testid={testId}
    >
      {showFallback ? (
        initials ? (
          <span className="bear-font-medium bear-text-gray-600 dark:bear-text-gray-300 bear-uppercase">
            {initials.slice(0, 2)}
          </span>
        ) : (
          <svg className="bear-w-3/5 bear-h-3/5 bear-text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="bear-w-full bear-h-full bear-object-cover"
          {...props}
        />
      )}
      
      {status && (
        <span
          className={cn(
            'bear-absolute bear-bottom-0 bear-right-0',
            'bear-w-1/4 bear-h-1/4 bear-min-w-[8px] bear-min-h-[8px]',
            'bear-rounded-full bear-ring-2 bear-ring-white dark:bear-ring-gray-900',
            statusClasses[status]
          )}
        />
      )}
    </div>
  );
};

/**
 * AvatarGroup - Stack of overlapping avatars
 */
export const AvatarGroup: FC<AvatarGroupProps> = ({
  children,
  max,
  size = 'md',
  className,
}) => {
  const avatars = React.Children.toArray(children);
  const visible = max ? avatars.slice(0, max) : avatars;
  const remaining = max ? avatars.length - max : 0;
  
  return (
    <div className={cn('bear-flex bear--space-x-2', className)}>
      {visible.map((child, index) => (
        <div key={index} className="bear-relative" style={{ zIndex: visible.length - index }}>
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'bear-relative bear-inline-flex bear-items-center bear-justify-center',
            'bear-bg-gray-200 dark:bear-bg-gray-700 bear-rounded-full',
            'bear-ring-2 bear-ring-white dark:bear-ring-gray-900',
            'bear-text-gray-600 dark:bear-text-gray-300 bear-font-medium',
            sizeClasses[size]
          )}
          style={{ zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

