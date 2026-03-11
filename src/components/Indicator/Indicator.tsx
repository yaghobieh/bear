import { FC } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { IndicatorProps } from './Indicator.types';
import {
  DEFAULT_SIZE,
  DEFAULT_COLOR,
  POSITION_MAP,
  RADIUS_MAP,
  ROOT_CLASS,
  ROOT_INLINE_CLASS,
  INDICATOR_CLASS,
  BORDER_CLASS,
  PROCESSING_CLASS,
} from './Indicator.const';

export const Indicator: FC<IndicatorProps> = ({
  children,
  label,
  color,
  size = DEFAULT_SIZE,
  position = 'top-end',
  radius = 'full',
  processing = false,
  disabled = false,
  offset,
  withBorder = false,
  inline = false,
  className,
  testId,
  ...rest
}) => {
  const positionClass = POSITION_MAP[position];
  const radiusClass = RADIUS_MAP[radius];
  const isCustomColor = typeof color === 'string' && !color.startsWith('bear-');
  const bgClass = isCustomColor ? undefined : (color ?? DEFAULT_COLOR);

  const sizeStyle = typeof size === 'number' ? { width: size, height: size, minWidth: size } : undefined;
  const offsetStyle = typeof offset === 'number' ? { margin: offset } : undefined;

  return (
    <div
      className={cn(ROOT_CLASS, inline && ROOT_INLINE_CLASS, className)}
      data-testid={testId}
      {...rest}
    >
      {children}
      {!disabled && (
        <span
          className={cn(
            INDICATOR_CLASS,
            positionClass,
            radiusClass,
            bgClass,
            withBorder && BORDER_CLASS,
            processing && PROCESSING_CLASS
          )}
          style={{
            ...sizeStyle,
            ...offsetStyle,
            ...(isCustomColor ? { backgroundColor: color } : undefined),
          }}
        >
          {label !== undefined && label !== null && (
            <Typography variant="caption" className="bear-text-white dark:bear-text-zinc-100 bear-font-medium">
              {typeof label === 'string' ? label : label}
            </Typography>
          )}
        </span>
      )}
    </div>
  );
};

export default Indicator;
