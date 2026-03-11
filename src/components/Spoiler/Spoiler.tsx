import { FC, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { SpoilerProps } from './Spoiler.types';
import {
  DEFAULT_SHOW_LABEL,
  DEFAULT_HIDE_LABEL,
  TRANSITION_DURATION,
  ROOT_CLASS,
  CONTENT_CLASS,
  BUTTON_CLASS,
} from './Spoiler.const';

export const Spoiler: FC<SpoilerProps> = ({
  maxHeight,
  showLabel = DEFAULT_SHOW_LABEL,
  hideLabel = DEFAULT_HIDE_LABEL,
  children,
  initialExpanded = false,
  transitionDuration = TRANSITION_DURATION,
  className,
  testId,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [showToggle, setShowToggle] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const checkHeight = () => {
      setShowToggle(el.scrollHeight > maxHeight);
    };

    checkHeight();

    const observer = new ResizeObserver(checkHeight);
    observer.observe(el);

    return () => observer.disconnect();
  }, [maxHeight, children]);

  useLayoutEffect(() => {
    if (expanded && contentRef.current) {
      setMeasuredHeight(contentRef.current.scrollHeight);
    } else {
      setMeasuredHeight(null);
    }
  }, [expanded, children]);

  const contentHeight = showToggle
    ? expanded
      ? (measuredHeight ?? contentRef.current?.scrollHeight ?? maxHeight)
      : maxHeight
    : undefined;

  return (
    <div className={cn(ROOT_CLASS, className)} data-testid={testId} {...rest}>
      <div
        ref={contentRef}
        className={CONTENT_CLASS}
        style={{
          maxHeight: contentHeight,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        {children}
      </div>
      {showToggle && (
        <button
          type="button"
          className={BUTTON_CLASS}
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          <Typography variant="body2" component="span">
            {expanded ? hideLabel : showLabel}
          </Typography>
        </button>
      )}
    </div>
  );
};

export default Spoiler;
