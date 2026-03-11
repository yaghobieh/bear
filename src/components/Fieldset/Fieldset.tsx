import { FC } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { FieldsetProps } from './Fieldset.types';
import {
  VARIANT_CLASSES,
  RADIUS_MAP,
  LEGEND_CLASSES,
  DESCRIPTION_CLASSES,
  ROOT_CLASS,
} from './Fieldset.const';

export const Fieldset: FC<FieldsetProps> = ({
  legend,
  description,
  variant = 'default',
  radius = 'md',
  disabled = false,
  children,
  testId,
  className,
  ...rest
}) => {
  return (
    <fieldset
      disabled={disabled}
      className={cn(
        ROOT_CLASS,
        VARIANT_CLASSES[variant],
        RADIUS_MAP[radius],
        disabled && 'bear-opacity-50 bear-pointer-events-none',
        className
      )}
      data-testid={testId}
      {...rest}
    >
      {legend && (
        <legend className={LEGEND_CLASSES}>
          <Typography variant="body2" weight="medium">
            {legend}
          </Typography>
        </legend>
      )}
      {description && (
        <Typography
          variant="caption"
          color="secondary"
          className={legend ? DESCRIPTION_CLASSES : 'bear-mb-3 bear-block'}
        >
          {description}
        </Typography>
      )}
      {children}
    </fieldset>
  );
};

Fieldset.displayName = 'Fieldset';

export default Fieldset;
