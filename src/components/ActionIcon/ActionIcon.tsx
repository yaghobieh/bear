import { FC } from 'react';
import { cn } from '@utils';
import { Spinner } from '../Spinner';
import type { ActionIconProps } from './ActionIcon.types';
import {
  SIZE_CLASSES,
  ICON_SIZE_MAP,
  RADIUS_MAP,
  VARIANT_CLASSES,
  SPINNER_SIZE_MAP,
  ROOT_CLASS,
} from './ActionIcon.const';

export const ActionIcon: FC<ActionIconProps> = ({
  children,
  variant = 'default',
  color = 'default',
  size = 'md',
  radius = 'md',
  loading = false,
  disabled = false,
  testId,
  className,
  ...rest
}) => {
  const isDisabled = disabled || loading;
  const variantClasses = VARIANT_CLASSES[variant][color];

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        ROOT_CLASS,
        SIZE_CLASSES[size],
        RADIUS_MAP[radius],
        variantClasses,
        loading && 'bear-cursor-wait',
        className
      )}
      data-testid={testId}
      {...rest}
    >
      {loading ? (
        <Spinner size={SPINNER_SIZE_MAP[size]} className={ICON_SIZE_MAP[size]} />
      ) : (
        <span className={cn('bear-inline-flex bear-items-center bear-justify-center', ICON_SIZE_MAP[size])}>
          {children}
        </span>
      )}
    </button>
  );
};

ActionIcon.displayName = 'ActionIcon';

export default ActionIcon;
