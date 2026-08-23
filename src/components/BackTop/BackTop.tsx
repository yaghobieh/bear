import { useState, useEffect, useCallback } from 'react';
import { SCROLL_BEHAVIOR_AUTO, SCROLL_BEHAVIOR_SMOOTH, UNIT_PX, ZERO } from '@const';
import { cn } from '@utils';
import { Button } from '../Button';
import { ChevronsUpIcon } from '../Icon';
import type { BackTopProps } from './BackTop.types';
import { BACKTOP_BUTTON_SIZE, BACKTOP_DEFAULTS, BACKTOP_SIZES } from './BackTop.const';

export const BackTop = (props: BackTopProps) => {
  const {
    bottom = BACKTOP_DEFAULTS.BOTTOM,
    right = BACKTOP_DEFAULTS.RIGHT,
    visibleAt = BACKTOP_DEFAULTS.VISIBLE_AT,
    duration = BACKTOP_DEFAULTS.DURATION,
    target,
    children,
    size = BACKTOP_DEFAULTS.SIZE,
    variant = BACKTOP_DEFAULTS.VARIANT,
    animated = BACKTOP_DEFAULTS.ANIMATED,
    className,
    testId,
    onClick,
    ...rest
  } = props;

  const [visible, setVisible] = useState(false);
  const sizeConfig = BACKTOP_SIZES[size];

  const getTarget = useCallback(() => {
    if (target) {
      return target();
    }
    return typeof window !== 'undefined' ? window : null;
  }, [target]);

  useEffect(() => {
    const scrollTarget = getTarget();
    if (!scrollTarget) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = scrollTarget === window
        ? window.scrollY || document.documentElement.scrollTop
        : (scrollTarget as HTMLElement).scrollTop;
      setVisible(scrollTop >= visibleAt);
    };

    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
    };
  }, [getTarget, visibleAt]);

  const scrollToTop = useCallback(() => {
    const scrollTarget = getTarget();
    if (!scrollTarget) {
      return;
    }

    onClick?.();
    const behavior = duration > ZERO ? SCROLL_BEHAVIOR_SMOOTH : SCROLL_BEHAVIOR_AUTO;

    if (scrollTarget === window) {
      window.scrollTo({
        top: ZERO,
        behavior,
      });
      return;
    }

    (scrollTarget as HTMLElement).scrollTo({
      top: ZERO,
      behavior,
    });
  }, [getTarget, duration, onClick]);

  return (
    <Button
      variant={variant}
      size={BACKTOP_BUTTON_SIZE[size]}
      className={cn(
        'Bear-BackTop',
        '!bear-rounded-full !bear-p-0',
        '!bear-fixed !bear-shadow-lg bear-z-[9999]',
        animated && 'bear-transition-all bear-duration-300 bear-ease-out',
        visible
          ? 'bear-opacity-100 bear-translate-y-0 bear-scale-100'
          : 'bear-opacity-0 bear-translate-y-5 bear-scale-75 bear-pointer-events-none',
        className
      )}
      style={{
        bottom: typeof bottom === 'number' ? `${bottom}${UNIT_PX}` : bottom,
        right: typeof right === 'number' ? `${right}${UNIT_PX}` : right,
        width: sizeConfig.width,
        height: sizeConfig.height,
        minWidth: sizeConfig.width,
      }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      data-testid={testId}
      {...rest}
    >
      {children || <ChevronsUpIcon size={sizeConfig.iconSize} />}
    </Button>
  );
};

export default BackTop;
