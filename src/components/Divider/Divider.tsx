import { FC } from 'react';
import { cn } from '@utils';
import type { DividerProps } from './Divider.types';

const VARIANT_STYLES = {
  solid: 'bear-border-solid',
  dashed: 'bear-border-dashed',
  dotted: 'bear-border-dotted',
};

const TEXT_ALIGN_CLASSES = {
  left: 'before:bear-w-4 after:bear-flex-1',
  center: 'before:bear-flex-1 after:bear-flex-1',
  right: 'before:bear-flex-1 after:bear-w-4',
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
          'bear-border-0',
          isHorizontal ? 'bear-w-full' : 'bear-h-full bear-w-px',
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
        'bear-flex bear-items-center bear-gap-4',
        isHorizontal ? 'bear-w-full' : 'bear-flex-col bear-h-full',
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
          'bear-flex-shrink-0',
          VARIANT_STYLES[variant]
        )}
        style={{
          borderTopWidth: isHorizontal ? thickness : 0,
          borderLeftWidth: !isHorizontal ? thickness : 0,
          borderColor: color || '#e5e7eb',
        }}
      />
      <span className="bear-text-sm bear-text-gray-500 bear-whitespace-nowrap bear-px-2">
        {children}
      </span>
      <span
        className={cn(
          'bear-flex-shrink-0',
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

