import { FC } from 'react';
import { cn } from '../../utils/cn';
import type { DividerProps } from './Divider.types';

const VARIANT_STYLES = {
  solid: 'ember-border-solid',
  dashed: 'ember-border-dashed',
  dotted: 'ember-border-dotted',
};

const TEXT_ALIGN_CLASSES = {
  left: 'before:ember-w-4 after:ember-flex-1',
  center: 'before:ember-flex-1 after:ember-flex-1',
  right: 'before:ember-flex-1 after:ember-w-4',
};

/**
 * Divider component for separating content
 * 
 * @example
 * ```tsx
 * // Simple divider
 * <Divider />
 * 
 * // With text
 * <Divider>OR</Divider>
 * 
 * // Vertical divider
 * <Divider orientation="vertical" />
 * 
 * // Dashed with custom color
 * <Divider variant="dashed" color="#ec4899" />
 * ```
 */
export const Divider: FC<DividerProps> = ({
  children,
  orientation = 'horizontal',
  variant = 'solid',
  color,
  textAlign = 'center',
  thickness = 1,
  spacing = 4,
  className,
  testId,
  style,
  ...props
}) => {
  const isHorizontal = orientation === 'horizontal';

  // If no children, render simple divider
  if (!children) {
    return (
      <hr
        className={cn(
          'ember-border-0',
          isHorizontal ? 'ember-w-full' : 'ember-h-full ember-w-px',
          VARIANT_STYLES[variant],
          className
        )}
        style={{
          borderTopWidth: isHorizontal ? thickness : 0,
          borderLeftWidth: !isHorizontal ? thickness : 0,
          borderColor: color || '#e5e7eb',
          marginTop: isHorizontal ? `${spacing * 0.25}rem` : 0,
          marginBottom: isHorizontal ? `${spacing * 0.25}rem` : 0,
          marginLeft: !isHorizontal ? `${spacing * 0.25}rem` : 0,
          marginRight: !isHorizontal ? `${spacing * 0.25}rem` : 0,
          ...style,
        }}
        data-testid={testId}
        {...props}
      />
    );
  }

  // With children, render divider with text
  return (
    <div
      className={cn(
        'ember-flex ember-items-center ember-gap-4',
        isHorizontal ? 'ember-w-full' : 'ember-flex-col ember-h-full',
        TEXT_ALIGN_CLASSES[textAlign],
        className
      )}
      role="separator"
      style={{
        marginTop: isHorizontal ? `${spacing * 0.25}rem` : 0,
        marginBottom: isHorizontal ? `${spacing * 0.25}rem` : 0,
        ...style,
      }}
      data-testid={testId}
    >
      <span
        className={cn(
          'ember-flex-shrink-0',
          VARIANT_STYLES[variant]
        )}
        style={{
          borderTopWidth: isHorizontal ? thickness : 0,
          borderLeftWidth: !isHorizontal ? thickness : 0,
          borderColor: color || '#e5e7eb',
        }}
      />
      <span className="ember-text-sm ember-text-gray-500 ember-whitespace-nowrap ember-px-2">
        {children}
      </span>
      <span
        className={cn(
          'ember-flex-shrink-0',
          VARIANT_STYLES[variant]
        )}
        style={{
          borderTopWidth: isHorizontal ? thickness : 0,
          borderLeftWidth: !isHorizontal ? thickness : 0,
          borderColor: color || '#e5e7eb',
        }}
      />
    </div>
  );
};

export default Divider;

