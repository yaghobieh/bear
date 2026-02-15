import { FC, useState, useEffect, useRef, createElement } from 'react';
import { cn } from '@utils';
import type { TransitionProps, MotionProps } from './Transition.types';
import { DEFAULT_DURATION, DEFAULT_EASING, TRANSITION_PRESETS } from './Transition.const';

/**
 * Transition - Declarative enter/leave transitions
 *
 * @description
 * Wraps children with CSS transitions for show/hide animations.
 * Supports built-in presets and custom enter/leave styles.
 *
 * @example
 * ```tsx
 * <Transition show={isOpen} name="slide-up" duration={300}>
 *   <div>Content</div>
 * </Transition>
 * ```
 */
export const Transition: FC<TransitionProps> = ({
  show,
  name = 'fade',
  duration = DEFAULT_DURATION,
  delay = 0,
  easing = DEFAULT_EASING,
  enterFrom,
  enterTo,
  leaveFrom,
  leaveTo,
  unmountOnHide = true,
  onEnter,
  onEntered,
  onLeave,
  onLeft,
  children,
  className,
  as = 'div',
}) => {
  const [mounted, setMounted] = useState(show);
  const [phase, setPhase] = useState<'enter' | 'enter-active' | 'exit' | 'exit-active' | 'idle'>(
    show ? 'idle' : 'exit-active'
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (show) {
      setMounted(true);
      setPhase('enter');
      onEnter?.();
      // Force reflow then transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('enter-active');
          timerRef.current = setTimeout(() => {
            setPhase('idle');
            onEntered?.();
          }, duration + delay);
        });
      });
    } else {
      setPhase('exit');
      onLeave?.();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('exit-active');
          timerRef.current = setTimeout(() => {
            if (unmountOnHide) setMounted(false);
            onLeft?.();
          }, duration + delay);
        });
      });
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [show]);

  if (!mounted && unmountOnHide) return null;

  const preset = TRANSITION_PRESETS[name];

  let styles: React.CSSProperties = {
    transition: `all ${duration}ms ${easing} ${delay}ms`,
  };

  switch (phase) {
    case 'enter':
      styles = { ...styles, ...(enterFrom ?? preset?.enter) };
      break;
    case 'enter-active':
    case 'idle':
      styles = { ...styles, ...(enterTo ?? preset?.enterActive) };
      break;
    case 'exit':
      styles = { ...styles, ...(leaveFrom ?? preset?.exit) };
      break;
    case 'exit-active':
      styles = { ...styles, ...(leaveTo ?? preset?.exitActive) };
      break;
  }

  return createElement(
    as,
    { className: cn(className), style: styles },
    children
  );
};

/**
 * Motion - Framer Motion-inspired declarative animation component
 *
 * @description
 * Animates between initial, animate, and exit states with
 * optional hover and tap interactions.
 *
 * @example
 * ```tsx
 * <Motion
 *   initial={{ opacity: 0, y: 20 }}
 *   animate={{ opacity: 1, y: 0 }}
 *   whileHover={{ scale: 1.05 }}
 *   transition={{ duration: 500 }}
 * >
 *   <Card>Content</Card>
 * </Motion>
 * ```
 */
export const Motion: FC<MotionProps> = ({
  children,
  initial,
  animate,
  exit,
  transition = {},
  whileHover,
  whileTap,
  inView = true,
  as = 'div',
  className,
  testId,
}) => {
  const [currentStyles, setCurrentStyles] = useState<React.CSSProperties>(initial ?? {});
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const mounted = useRef(false);

  const { duration = 300, delay = 0, easing: easingProp = DEFAULT_EASING } = transition;

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      // Apply initial immediately, then animate
      requestAnimationFrame(() => {
        if (inView && animate) {
          setCurrentStyles(animate);
        }
      });
    } else if (inView && animate) {
      setCurrentStyles(animate);
    } else if (!inView && exit) {
      setCurrentStyles(exit);
    }
  }, [inView]);

  let mergedStyles: React.CSSProperties = {
    ...currentStyles,
    transition: `all ${duration}ms ${easingProp} ${delay}ms`,
  };

  if (isPressed && whileTap) {
    mergedStyles = { ...mergedStyles, ...whileTap };
  } else if (isHovered && whileHover) {
    mergedStyles = { ...mergedStyles, ...whileHover };
  }

  return createElement(
    as,
    {
      className: cn(className),
      style: mergedStyles,
      'data-testid': testId,
      onMouseEnter: whileHover ? () => setIsHovered(true) : undefined,
      onMouseLeave: whileHover
        ? () => {
            setIsHovered(false);
            setIsPressed(false);
          }
        : undefined,
      onMouseDown: whileTap ? () => setIsPressed(true) : undefined,
      onMouseUp: whileTap ? () => setIsPressed(false) : undefined,
    },
    children
  );
};
