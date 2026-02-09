import { FC, useState, useEffect, useCallback } from 'react';
import { cn } from '@utils';
import { Button } from '../Button';
import type { BackTopProps } from './BackTop.types';
import { BACKTOP_DEFAULTS, BACKTOP_SIZES } from './BackTop.const';

/**
 * BackTop - Scroll to top button
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <BackTop />
 * 
 * // Custom position and threshold
 * <BackTop bottom={60} right={20} visibleAt={200} />
 * 
 * // Custom content
 * <BackTop>
 *   <span>↑ Top</span>
 * </BackTop>
 * ```
 */
export const BackTop: FC<BackTopProps> = ({
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
}) => {
  const [visible, setVisible] = useState(false);

  const sizeConfig = BACKTOP_SIZES[size];

  // Get the scroll target element
  const getTarget = useCallback(() => {
    if (target) return target();
    return typeof window !== 'undefined' ? window : null;
  }, [target]);

  // Handle scroll visibility
  useEffect(() => {
    const scrollTarget = getTarget();
    if (!scrollTarget) return;

    const handleScroll = () => {
      const scrollTop = scrollTarget === window 
        ? window.scrollY || document.documentElement.scrollTop
        : (scrollTarget as HTMLElement).scrollTop;
      
      setVisible(scrollTop >= visibleAt);
    };

    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
    };
  }, [getTarget, visibleAt]);

  // Smooth scroll to top
  const scrollToTop = useCallback(() => {
    const scrollTarget = getTarget();
    if (!scrollTarget) return;

    onClick?.();

    if (scrollTarget === window) {
      window.scrollTo({
        top: 0,
        behavior: duration > 0 ? 'smooth' : 'auto',
      });
    } else {
      (scrollTarget as HTMLElement).scrollTo({
        top: 0,
        behavior: duration > 0 ? 'smooth' : 'auto',
      });
    }
  }, [getTarget, duration, onClick]);

  // Default arrow icon
  const defaultIcon = (
    <svg
      width={sizeConfig.iconSize}
      height={sizeConfig.iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );

  // Map BackTop size to Button size
  const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';

  return (
    <Button
      variant={variant}
      size={buttonSize}
      className={cn(
        'Bear-BackTop',
        '!bear-rounded-full !bear-p-0',
        '!bear-fixed !bear-shadow-lg',
        animated && 'bear-transition-all bear-duration-300 bear-ease-out',
        visible 
          ? 'bear-opacity-100 bear-translate-y-0 bear-scale-100' 
          : 'bear-opacity-0 bear-translate-y-5 bear-scale-75 bear-pointer-events-none',
        className
      )}
      style={{
        bottom: typeof bottom === 'number' ? `${bottom}px` : bottom,
        right: typeof right === 'number' ? `${right}px` : right,
        width: sizeConfig.width,
        height: sizeConfig.height,
        minWidth: sizeConfig.width,
        zIndex: 9999,
      }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      data-testid={testId}
      {...rest}
    >
      {children || defaultIcon}
    </Button>
  );
};

export default BackTop;
