import { FC, Children, cloneElement, isValidElement } from 'react';
import { cn } from '../../utils/cn';
import type { ButtonGroupProps } from './ButtonGroup.types';

/**
 * ButtonGroup component for grouping related buttons
 * 
 * @example
 * ```tsx
 * <ButtonGroup variant="outline">
 *   <Button>Left</Button>
 *   <Button>Middle</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup: FC<ButtonGroupProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  orientation = 'horizontal',
  disabled = false,
  fullWidth = false,
  className,
  testId,
  ...props
}) => {
  const isHorizontal = orientation === 'horizontal';

  const childArray = Children.toArray(children);
  const enhancedChildren = childArray.map((child, index) => {
    if (!isValidElement(child)) return child;

    const isFirst = index === 0;
    const isLast = index === childArray.length - 1;
    const isMiddle = !isFirst && !isLast;

    // Determine border radius classes based on position
    let borderRadiusClass = '';
    if (isHorizontal) {
      if (isFirst) {
        borderRadiusClass = 'ember-rounded-r-none';
      } else if (isLast) {
        borderRadiusClass = 'ember-rounded-l-none';
      } else if (isMiddle) {
        borderRadiusClass = 'ember-rounded-none';
      }
    } else {
      if (isFirst) {
        borderRadiusClass = 'ember-rounded-b-none';
      } else if (isLast) {
        borderRadiusClass = 'ember-rounded-t-none';
      } else if (isMiddle) {
        borderRadiusClass = 'ember-rounded-none';
      }
    }

    // Add negative margin to overlap borders
    let marginClass = '';
    if (isHorizontal && !isFirst) {
      marginClass = 'ember--ml-px';
    } else if (!isHorizontal && !isFirst) {
      marginClass = 'ember--mt-px';
    }

    return cloneElement(child as React.ReactElement, {
      size,
      variant,
      disabled: disabled || (child.props as { disabled?: boolean }).disabled,
      className: cn(
        borderRadiusClass,
        marginClass,
        fullWidth && 'ember-flex-1',
        (child.props as { className?: string }).className
      ),
    });
  });

  return (
    <div
      role="group"
      className={cn(
        'ember-inline-flex',
        isHorizontal ? 'ember-flex-row' : 'ember-flex-col',
        fullWidth && 'ember-w-full',
        className
      )}
      data-testid={testId}
      {...props}
    >
      {enhancedChildren}
    </div>
  );
};

export default ButtonGroup;

