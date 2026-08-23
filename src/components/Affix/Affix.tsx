import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AFFIX_DEFAULT_Z_INDEX, BOOLEAN_FALSE, POSITION_TOP, ZERO } from '@const';
import { useWindowLayout } from '@hooks';
import { cn } from '@utils';
import type { AffixProps } from './Affix.types';
import { resolveAffixHeight, resolveAffixLayoutChange } from './Affix.utils';

export const Affix = (props: AffixProps) => {
  const {
    children,
    position = POSITION_TOP,
    offset = ZERO,
    zIndex = AFFIX_DEFAULT_Z_INDEX,
    withinPortal = BOOLEAN_FALSE,
    className,
    testId,
    ...rest
  } = props;

  const [isFixed, setIsFixed] = useState(BOOLEAN_FALSE);
  const [placeholderHeight, setPlaceholderHeight] = useState(ZERO);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const checkScroll = useCallback(() => {
    const placeholderEl = placeholderRef.current;
    const contentEl = contentRef.current;
    if (!placeholderEl) {
      return;
    }

    const rect = placeholderEl.getBoundingClientRect();
    const next = resolveAffixLayoutChange({
      position,
      isFixed,
      offset,
      rectTop: rect.top,
      rectBottom: rect.bottom,
      viewportBottom: window.innerHeight,
      measuredHeight: resolveAffixHeight(contentEl, placeholderEl),
    });
    if (!next) {
      return;
    }
    setIsFixed(next.isFixed);
    setPlaceholderHeight(next.placeholderHeight);
  }, [offset, position, isFixed]);

  useWindowLayout({ onLayout: checkScroll });

  const content = (
    <div className="Bear-Affix">
      <div
        ref={placeholderRef}
        style={isFixed ? { height: placeholderHeight } : undefined}
        className={cn('Bear-Affix__placeholder', !isFixed && 'bear-contents')}
        aria-hidden={isFixed}
      >
        {!isFixed && (
          <div
            ref={contentRef}
            className={cn(
              'Bear-Affix__content bear-bg-white dark:bear-bg-zinc-900 bear-transition-[top,bottom] bear-duration-200',
              position === POSITION_TOP ? 'bear-top-0 bear-left-0 bear-right-0' : 'bear-bottom-0 bear-left-0 bear-right-0',
              className
            )}
            data-testid={testId}
            {...rest}
          >
            {children}
          </div>
        )}
      </div>
      {isFixed && (
        <div
          className={cn(
            'Bear-Affix__content bear-bg-white dark:bear-bg-zinc-900 bear-transition-[top,bottom] bear-duration-200 bear-fixed',
            position === POSITION_TOP ? 'bear-top-0 bear-left-0 bear-right-0' : 'bear-bottom-0 bear-left-0 bear-right-0',
            className
          )}
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
    </div>
  );

  if (withinPortal) {
    return createPortal(<div className="Bear-Affix__portal">{content}</div>, document.body);
  }

  return content;
};

export default Affix;
