import { forwardRef } from 'react';
import { cn } from '@utils';
import type { HighlightProps } from './Highlight.types';
import { HIGHLIGHT_COLOR_CLASSES, DEFAULT_COLOR } from './Highlight.const';

/**
 * Highlight - Inline text highlight with theme-aware colors.
 * 'primary' color uses BearProvider's primary palette.
 */
export const Highlight = forwardRef<HTMLSpanElement, HighlightProps>(
  (props, ref) => {
    const {
      children,
      color = DEFAULT_COLOR,
      animated = false,
      className,
      testId,
      ...rest
    } = props;

    const colorCls = HIGHLIGHT_COLOR_CLASSES[color] ?? HIGHLIGHT_COLOR_CLASSES[DEFAULT_COLOR];

    return (
      <span
        ref={ref}
        className={cn(
          'Bear-Highlight',
          'bear-px-1 bear-rounded',
          colorCls,
          animated && 'bear-animate-pulse',
          className,
        )}
        data-testid={testId}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

Highlight.displayName = 'Highlight';
