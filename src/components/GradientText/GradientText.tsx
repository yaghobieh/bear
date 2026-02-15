import { FC, useMemo } from 'react';
import { cn } from '@utils';
import type { GradientTextProps, GradientPreset } from './GradientText.types';
import {
  GRADIENT_PRESETS,
  DIRECTION_MAP,
  DEFAULT_ANIMATION_SPEED,
  ANIMATED_BG_SIZE,
  WEIGHT_MAP,
  DEFAULT_WEIGHT,
  COLOR_REPEAT_COUNT,
} from './GradientText.const';

/**
 * GradientText - Text with gradient colors.
 * 10 built-in presets, custom colors, animation, and theme integration via BearProvider.
 */
export const GradientText: FC<GradientTextProps> = (props) => {
  const {
    children,
    preset = 'primary',
    colors: customColors,
    direction = 'to-r',
    animate = false,
    animationSpeed = DEFAULT_ANIMATION_SPEED,
    as: Tag = 'span',
    weight = 'bold',
    className,
    style,
    testId,
  } = props;

  const colors = useMemo(() => {
    if (customColors && customColors.length > 0) return customColors;
    return GRADIENT_PRESETS[preset as GradientPreset] ?? GRADIENT_PRESETS.primary;
  }, [customColors, preset]);

  const gradientCSS = useMemo(() => {
    const dir = DIRECTION_MAP[direction] ?? 'to right';
    if (!animate) return `linear-gradient(${dir}, ${colors.join(', ')})`;
    // Repeat colors for seamless animation
    const repeated = Array.from({ length: COLOR_REPEAT_COUNT }, () => colors).flat();
    return `linear-gradient(${dir}, ${repeated.join(', ')})`;
  }, [colors, direction, animate]);

  return (
    <Tag
      className={cn(
        'Bear-GradientText',
        'bear-inline-block',
        animate && 'Bear-GradientText--animated',
        className,
      )}
      style={{
        background: gradientCSS,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: WEIGHT_MAP[weight] ?? DEFAULT_WEIGHT,
        ...(animate && {
          backgroundSize: ANIMATED_BG_SIZE,
          animation: `bear-gradient-shift ${animationSpeed}s ease infinite`,
        }),
        ...style,
      }}
      data-testid={testId}
    >
      {children}
    </Tag>
  );
};
