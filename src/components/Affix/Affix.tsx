import { FC, useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import type { AffixProps } from './Affix.types';
import {
  ROOT_CLASS,
  DEFAULT_OFFSET,
  DEFAULT_Z_INDEX,
  WRAPPER_CLASSES,
  POSITION_TOP_CLASSES,
  POSITION_BOTTOM_CLASSES,
} from './Affix.const';

export const Affix: FC<AffixProps> = (props) => {
  const {
    children,
    position = 'top',
    offset = DEFAULT_OFFSET,
    zIndex = DEFAULT_Z_INDEX,
    withinPortal = false,
    className,
    testId,
    ...rest
  } = props;

  const [isFixed, setIsFixed] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const checkScroll = useCallback(() => {
    const placeholderEl = placeholderRef.current;
    const contentEl = contentRef.current;
    if (!placeholderEl) return;

    const rect = placeholderEl.getBoundingClientRect();

    if (position === 'top') {
      if (!isFixed) {
        if (rect.top <= offset) {
          const height = contentEl?.offsetHeight ?? placeholderEl.offsetHeight ?? 0;
          setPlaceholderHeight(height);
          setIsFixed(true);
        }
      } else {
        if (rect.top > offset) {
          setIsFixed(false);
          setPlaceholderHeight(0);
        }
      }
    } else {
      const viewportBottom = window.innerHeight;
      if (!isFixed) {
        if (rect.bottom >= viewportBottom - offset) {
          const height = contentEl?.offsetHeight ?? placeholderEl.offsetHeight ?? 0;
          setPlaceholderHeight(height);
          setIsFixed(true);
        }
      } else {
        if (rect.bottom < viewportBottom - offset) {
          setIsFixed(false);
          setPlaceholderHeight(0);
        }
      }
    }
  }, [offset, position, isFixed]);

  useEffect(() => {
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const positionClasses = position === 'top' ? POSITION_TOP_CLASSES : POSITION_BOTTOM_CLASSES;

  const content = (
    <>
      <div
        ref={placeholderRef}
        style={isFixed ? { height: placeholderHeight } : undefined}
        className={cn(!isFixed && 'bear-contents')}
        aria-hidden={isFixed}
      >
        {!isFixed && (
          <div ref={contentRef} className={cn(ROOT_CLASS, WRAPPER_CLASSES, positionClasses, className)} data-testid={testId} {...rest}>
            {children}
          </div>
        )}
      </div>
      {isFixed && (
        <div
          className={cn(ROOT_CLASS, WRAPPER_CLASSES, positionClasses, 'bear-fixed', className)}
          style={{
            [position]: offset,
            zIndex,
          }}
          data-testid={testId}
          {...rest}
        >
          {children}
        </div>
      )}
    </>
  );

  if (withinPortal) {
    return createPortal(<div className="Bear-Affix__portal">{content}</div>, document.body);
  }

  return content;
};

export default Affix;
