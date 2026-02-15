import { useRef, useCallback, useState, useEffect } from 'react';

/**
 * Animation preset names
 */
export type AnimationPreset =
  | 'fadeIn'
  | 'fadeOut'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInUp'
  | 'slideInDown'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'slideOutUp'
  | 'slideOutDown'
  | 'scaleIn'
  | 'scaleOut'
  | 'rotateIn'
  | 'rotateOut'
  | 'flipX'
  | 'flipY'
  | 'bounceIn'
  | 'bounceOut'
  | 'pulse'
  | 'shake'
  | 'swing'
  | 'rubberBand'
  | 'tada'
  | 'wobble'
  | 'jello';

/**
 * Keyframe definition
 */
export interface AnimationKeyframe {
  [property: string]: string | number;
}

export interface UseAnimateOptions {
  /** Duration in ms */
  duration?: number;
  /** Delay in ms */
  delay?: number;
  /** Easing function */
  easing?: string;
  /** Number of iterations (Infinity for infinite) */
  iterations?: number;
  /** Fill mode */
  fill?: FillMode;
  /** Direction */
  direction?: PlaybackDirection;
  /** Auto-play on mount */
  autoPlay?: boolean;
}

export interface UseAnimateReturn {
  /** Ref to attach to the element */
  ref: React.RefObject<HTMLElement | null>;
  /** Play the animation */
  play: (keyframes?: AnimationKeyframe[] | AnimationPreset, options?: UseAnimateOptions) => Animation | undefined;
  /** Pause the animation */
  pause: () => void;
  /** Cancel the animation */
  cancel: () => void;
  /** Reverse the animation */
  reverse: () => void;
  /** Whether animation is playing */
  isPlaying: boolean;
  /** Whether animation is finished */
  isFinished: boolean;
}

/** Built-in animation presets */
const PRESETS: Record<AnimationPreset, Keyframe[]> = {
  fadeIn: [{ opacity: 0 }, { opacity: 1 }],
  fadeOut: [{ opacity: 1 }, { opacity: 0 }],
  slideInLeft: [{ transform: 'translateX(-100%)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }],
  slideInRight: [{ transform: 'translateX(100%)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }],
  slideInUp: [{ transform: 'translateY(100%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
  slideInDown: [{ transform: 'translateY(-100%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
  slideOutLeft: [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(-100%)', opacity: 0 }],
  slideOutRight: [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(100%)', opacity: 0 }],
  slideOutUp: [{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-100%)', opacity: 0 }],
  slideOutDown: [{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(100%)', opacity: 0 }],
  scaleIn: [{ transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],
  scaleOut: [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }],
  rotateIn: [{ transform: 'rotate(-180deg) scale(0)', opacity: 0 }, { transform: 'rotate(0) scale(1)', opacity: 1 }],
  rotateOut: [{ transform: 'rotate(0) scale(1)', opacity: 1 }, { transform: 'rotate(180deg) scale(0)', opacity: 0 }],
  flipX: [{ transform: 'perspective(400px) rotateX(90deg)', opacity: 0 }, { transform: 'perspective(400px) rotateX(0)', opacity: 1 }],
  flipY: [{ transform: 'perspective(400px) rotateY(90deg)', opacity: 0 }, { transform: 'perspective(400px) rotateY(0)', opacity: 1 }],
  bounceIn: [
    { transform: 'scale(0.3)', opacity: 0 },
    { transform: 'scale(1.05)' },
    { transform: 'scale(0.9)' },
    { transform: 'scale(1)', opacity: 1 },
  ],
  bounceOut: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(0.9)' },
    { transform: 'scale(1.05)' },
    { transform: 'scale(0.3)', opacity: 0 },
  ],
  pulse: [
    { transform: 'scale(1)' },
    { transform: 'scale(1.05)' },
    { transform: 'scale(1)' },
  ],
  shake: [
    { transform: 'translateX(0)' },
    { transform: 'translateX(-10px)' },
    { transform: 'translateX(10px)' },
    { transform: 'translateX(-10px)' },
    { transform: 'translateX(10px)' },
    { transform: 'translateX(0)' },
  ],
  swing: [
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(15deg)' },
    { transform: 'rotate(-10deg)' },
    { transform: 'rotate(5deg)' },
    { transform: 'rotate(-5deg)' },
    { transform: 'rotate(0deg)' },
  ],
  rubberBand: [
    { transform: 'scale(1)' },
    { transform: 'scaleX(1.25) scaleY(0.75)' },
    { transform: 'scaleX(0.75) scaleY(1.25)' },
    { transform: 'scaleX(1.15) scaleY(0.85)' },
    { transform: 'scaleX(0.95) scaleY(1.05)' },
    { transform: 'scale(1)' },
  ],
  tada: [
    { transform: 'scale(1) rotate(0deg)' },
    { transform: 'scale(0.9) rotate(-3deg)' },
    { transform: 'scale(1.1) rotate(3deg)' },
    { transform: 'scale(1.1) rotate(-3deg)' },
    { transform: 'scale(1.1) rotate(3deg)' },
    { transform: 'scale(1) rotate(0deg)' },
  ],
  wobble: [
    { transform: 'translateX(0) rotate(0deg)' },
    { transform: 'translateX(-25%) rotate(-5deg)' },
    { transform: 'translateX(20%) rotate(3deg)' },
    { transform: 'translateX(-15%) rotate(-3deg)' },
    { transform: 'translateX(10%) rotate(2deg)' },
    { transform: 'translateX(0) rotate(0deg)' },
  ],
  jello: [
    { transform: 'skewX(0deg) skewY(0deg)' },
    { transform: 'skewX(-12.5deg) skewY(-12.5deg)' },
    { transform: 'skewX(6.25deg) skewY(6.25deg)' },
    { transform: 'skewX(-3.125deg) skewY(-3.125deg)' },
    { transform: 'skewX(1.5625deg) skewY(1.5625deg)' },
    { transform: 'skewX(0deg) skewY(0deg)' },
  ],
};

/**
 * useAnimate - Programmatic animation hook using Web Animations API
 *
 * @description
 * Provides a ref-based animation system with built-in presets
 * and full control over play, pause, cancel, and reverse.
 *
 * @example
 * ```tsx
 * const { ref, play, isPlaying } = useAnimate({ duration: 500 });
 *
 * return (
 *   <div ref={ref} onClick={() => play('bounceIn')}>
 *     Animate me!
 *   </div>
 * );
 * ```
 */
export const useAnimate = (defaultOptions: UseAnimateOptions = {}): UseAnimateReturn => {
  const ref = useRef<HTMLElement | null>(null);
  const animationRef = useRef<Animation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const play = useCallback(
    (keyframesOrPreset?: AnimationKeyframe[] | AnimationPreset, opts?: UseAnimateOptions) => {
      const el = ref.current;
      if (!el) return undefined;

      // Cancel previous
      animationRef.current?.cancel();

      const options = { ...defaultOptions, ...opts };
      let keyframes: Keyframe[];

      if (typeof keyframesOrPreset === 'string') {
        keyframes = PRESETS[keyframesOrPreset] ?? PRESETS.fadeIn;
      } else if (Array.isArray(keyframesOrPreset)) {
        keyframes = keyframesOrPreset as Keyframe[];
      } else {
        keyframes = PRESETS.fadeIn;
      }

      const animation = el.animate(keyframes, {
        duration: options.duration ?? 300,
        delay: options.delay ?? 0,
        easing: options.easing ?? 'ease',
        iterations: options.iterations ?? 1,
        fill: options.fill ?? 'forwards',
        direction: options.direction ?? 'normal',
      });

      animationRef.current = animation;
      setIsPlaying(true);
      setIsFinished(false);

      animation.onfinish = () => {
        setIsPlaying(false);
        setIsFinished(true);
      };

      animation.oncancel = () => {
        setIsPlaying(false);
      };

      return animation;
    },
    [defaultOptions]
  );

  const pause = useCallback(() => {
    animationRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const cancel = useCallback(() => {
    animationRef.current?.cancel();
    setIsPlaying(false);
    setIsFinished(false);
  }, []);

  const reverse = useCallback(() => {
    animationRef.current?.reverse();
  }, []);

  // Auto-play on mount
  useEffect(() => {
    if (defaultOptions.autoPlay) {
      play();
    }
  }, []);

  return { ref, play, pause, cancel, reverse, isPlaying, isFinished };
};
