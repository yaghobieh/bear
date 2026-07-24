import { Children, FC, isValidElement } from 'react';
import type { ChipGroupProps } from './ChipGroup.types';
import {
  CHIP_GROUP_ROOT_CLASS,
  CHIP_GROUP_BASE_CLASSES,
  CHIP_GROUP_SPACING_CLASSES,
  CHIP_GROUP_OVERFLOW_CLASSES,
} from './ChipGroup.const';
import { cn, resolveBearId, useBearId } from '@utils';

export const ChipGroup: FC<ChipGroupProps> = (props) => {
  const {
    id,
    testId,
    children,
    max,
    spacing = 'md',
    className,
    ...rest
  } = props;

  const generatedId = useBearId('ChipGroup');
  const domId = resolveBearId(id, generatedId);
  const childArray = Children.toArray(children).filter(isValidElement);
  const visible = typeof max === 'number' ? childArray.slice(0, max) : childArray;
  const overflow = typeof max === 'number' ? Math.max(0, childArray.length - max) : 0;

  return (
    <div
      {...rest}
      id={domId}
      data-testid={testId}
      className={cn(
        CHIP_GROUP_ROOT_CLASS,
        CHIP_GROUP_BASE_CLASSES,
        CHIP_GROUP_SPACING_CLASSES[spacing],
        className
      )}
    >
      {visible}
      {overflow > 0 && (
        <span className={cn(`${CHIP_GROUP_ROOT_CLASS}__overflow`, CHIP_GROUP_OVERFLOW_CLASSES)}>
          +{overflow}
        </span>
      )}
    </div>
  );
};
