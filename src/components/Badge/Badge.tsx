import { BOOLEAN_FALSE, SIZE_SM, VARIANT_NEUTRAL } from '@const';
import { cn } from '@utils';
import type { BadgeProps } from './Badge.types';
import { sizeClasses, variantClasses, dotVariantColors } from './Badge.constants';

export const Badge = (props: BadgeProps) => {
  const {
    variant = VARIANT_NEUTRAL,
    size = SIZE_SM,
    pill = BOOLEAN_FALSE,
    dot = BOOLEAN_FALSE,
    className,
    children,
    testId,
    ...rest
  } = props;

  return (
    <span
      className={cn(
        'Bear-Badge',
        'bear-inline-flex bear-items-center bear-gap-1.5 bear-font-medium',
        sizeClasses[size],
        variantClasses[variant],
        pill ? 'Bear-Badge--pill bear-rounded-full' : 'bear-rounded-md',
        className
      )}
      data-testid={testId}
      {...rest}
    >
      {dot && (
        <span
          className={cn(
            'Bear-Badge__dot',
            'bear-w-1.5 bear-h-1.5',
            'bear-rounded-full',
            dotVariantColors[variant]
          )}
        />
      )}
      <span className="Bear-Badge__content">{children}</span>
    </span>
  );
};
