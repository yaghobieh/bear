import { useRef } from 'react';
import { cn } from '@utils';
import { SIZE_MD } from '@const';
import type { ScrollAreaProps } from './ScrollArea.types';
import {
  SCROLLBAR_SIZE_CLASSES,
  SCROLLBAR_VARIANT_CLASSES,
  SCROLL_OVERFLOW_CLASSES,
} from './ScrollArea.const';
import { applyScrollAreaLimits } from './ScrollArea.utils';

export const ScrollArea = (props: ScrollAreaProps) => {
  const {
    children,
    className,
    orientation = 'vertical',
    scrollbarSize = SIZE_MD,
    scrollbarVariant = 'default',
    maxHeight,
    maxWidth,
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  applyScrollAreaLimits(rootRef.current, maxHeight, maxWidth);

  return (
    <div
      ref={rootRef}
      className={cn(
        'Bear-ScrollArea',
        SCROLL_OVERFLOW_CLASSES[orientation],
        SCROLLBAR_SIZE_CLASSES[scrollbarSize],
        SCROLLBAR_VARIANT_CLASSES[scrollbarVariant],
        className
      )}
    >
      {children}
    </div>
  );
};
