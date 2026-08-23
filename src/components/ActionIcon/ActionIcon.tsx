import { BOOLEAN_FALSE, COLOR_DEFAULT, RADIUS_MD, SIZE_MD, VARIANT_DEFAULT } from '@const';
import { cn } from '@utils';
import { Box } from '../Box';
import { Spinner } from '../Spinner';
import type { ActionIconProps } from './ActionIcon.types';
import {
  SIZE_CLASSES,
  ICON_SIZE_MAP,
  RADIUS_MAP,
  VARIANT_CLASSES,
  SPINNER_SIZE_MAP,
} from './ActionIcon.const';

const renderActionIconBody = (props: Pick<ActionIconProps, 'loading' | 'size' | 'children'>) => {
  const { loading, size = SIZE_MD, children } = props;
  if (loading) {
    return <Spinner size={SPINNER_SIZE_MAP[size]} className={ICON_SIZE_MAP[size]} />;
  }
  return (
    <Box as="span" className={cn('bear-inline-flex bear-items-center bear-justify-center', ICON_SIZE_MAP[size])}>
      {children}
    </Box>
  );
};

export const ActionIcon = (props: ActionIconProps) => {
  const {
    children,
    variant = VARIANT_DEFAULT,
    color = COLOR_DEFAULT,
    size = SIZE_MD,
    radius = RADIUS_MD,
    loading = BOOLEAN_FALSE,
    disabled = BOOLEAN_FALSE,
    testId,
    className,
    ...rest
  } = props;

  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'Bear-ActionIcon bear-inline-flex bear-items-center bear-justify-center bear-transition-all bear-duration-200 bear-outline-none disabled:bear-opacity-50 disabled:bear-cursor-not-allowed',
        SIZE_CLASSES[size],
        RADIUS_MAP[radius],
        VARIANT_CLASSES[variant][color],
        loading && 'bear-cursor-wait',
        className
      )}
      data-testid={testId}
      {...rest}
    >
      {renderActionIconBody({ loading, size, children })}
    </button>
  );
};

ActionIcon.displayName = 'ActionIcon';

export default ActionIcon;
