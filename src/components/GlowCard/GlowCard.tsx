import { FC, useRef, useState, useCallback } from 'react';
import { cn } from '@utils';
import type { GlowCardProps } from './GlowCard.types';
import {
  DEFAULT_GLOW_COLOR,
  DEFAULT_GLOW_INTENSITY,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_EFFECT,
  DEFAULT_BORDER_WIDTH,
  CENTER_POSITION,
  HEX_OPACITY_BORDER,
  HEX_OPACITY_AMBIENT,
  HEX_OPACITY_SHADOW,
  HEX_OPACITY_BORDER_SHADOW,
} from './GlowCard.const';

export const GlowCard: FC<GlowCardProps> = ({
  children,
  glowColor = DEFAULT_GLOW_COLOR,
  glowIntensity = DEFAULT_GLOW_INTENSITY,
  followMouse = true,
  borderRadius = DEFAULT_BORDER_RADIUS,
  disabled = false,
  effect = DEFAULT_EFFECT,
  borderWidth = DEFAULT_BORDER_WIDTH,
  testId,
  className,
  style,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: CENTER_POSITION, y: CENTER_POSITION });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!followMouse || disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    [followMouse, disabled]
  );

  const active = hovering && !disabled;
  const resolvedRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

  const renderGlowLayers = () => {
    switch (effect) {
      case 'border':
        return (
          <div
            className="Bear-GlowCard__border absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: active ? 1 : 0,
              background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${glowColor}${HEX_OPACITY_BORDER}, transparent ${glowIntensity}%)`,
              mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              padding: borderWidth,
            }}
          />
        );

      case 'spotlight':
        return (
          <>
            <div
              className="Bear-GlowCard__spot absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: active ? 0.8 : 0,
                background: `radial-gradient(300px circle at ${pos.x}% ${pos.y}%, ${glowColor}${HEX_OPACITY_AMBIENT}, transparent 60%)`,
              }}
            />
            <div
              className="Bear-GlowCard__spot-border absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
              style={{
                opacity: active ? 1 : 0,
                boxShadow: `inset 0 0 0 ${borderWidth}px ${glowColor}${HEX_OPACITY_BORDER}`,
              }}
            />
          </>
        );

      case 'pulse':
        return (
          <>
            {/* Inner glow that pulses */}
            <div
              className="Bear-GlowCard__pulse-inner absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
              style={{
                opacity: active ? 1 : 0,
                background: `radial-gradient(ellipse at 50% 50%, ${glowColor}${HEX_OPACITY_AMBIENT}, transparent 70%)`,
                animation: active ? 'bear-glow-pulse 2s ease-in-out infinite' : 'none',
              }}
            />
            {/* Outer shadow that pulses */}
            <div
              className="Bear-GlowCard__pulse-outer absolute -inset-1 pointer-events-none rounded-[inherit]"
              style={{
                boxShadow: `0 0 ${glowIntensity}px ${glowIntensity / 2}px ${glowColor}${HEX_OPACITY_SHADOW}`,
                animation: active ? 'bear-glow-pulse 2s ease-in-out infinite' : 'none',
                opacity: active ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
            />
            {/* Border ring */}
            <div
              className="Bear-GlowCard__pulse-ring absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{
                boxShadow: `inset 0 0 0 ${borderWidth}px ${glowColor}${HEX_OPACITY_BORDER}`,
                animation: active ? 'bear-glow-pulse 2s ease-in-out infinite 0.5s' : 'none',
                opacity: active ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
            />
          </>
        );

      case 'wave':
        return (
          <>
            {/* Wave sweep that moves across the card */}
            <div
              className="Bear-GlowCard__wave absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{
                opacity: active ? 1 : 0,
                transition: 'opacity 0.3s',
                background: `linear-gradient(90deg, transparent 0%, ${glowColor}${HEX_OPACITY_AMBIENT} 50%, transparent 100%)`,
                backgroundSize: '200% 100%',
                animation: active ? 'bear-glow-wave 2.5s ease-in-out infinite' : 'none',
              }}
            />
            {/* Top edge highlight */}
            <div
              className="Bear-GlowCard__wave-edge absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{
                opacity: active ? 1 : 0,
                transition: 'opacity 0.3s',
                boxShadow: `inset 0 ${borderWidth}px 0 ${glowColor}${HEX_OPACITY_BORDER}, 0 0 ${glowIntensity / 2}px ${glowColor}${HEX_OPACITY_SHADOW}`,
                animation: active ? 'bear-glow-wave-shadow 2.5s ease-in-out infinite' : 'none',
              }}
            />
          </>
        );

      default:
        return (
          <>
            <div
              className="Bear-GlowCard__ambient absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: active ? 0.6 : 0,
                background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${glowColor}${HEX_OPACITY_AMBIENT}, transparent ${glowIntensity}%)`,
              }}
            />
            <div
              className="Bear-GlowCard__shadow absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
              style={{
                opacity: active ? 0.6 : 0,
                boxShadow: `inset 0 0 0 1px ${glowColor}${HEX_OPACITY_BORDER_SHADOW}, 0 0 ${glowIntensity}px ${glowColor}${HEX_OPACITY_SHADOW}`,
              }}
            />
          </>
        );
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'Bear-GlowCard relative overflow-hidden transition-shadow duration-300',
        'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700',
        active && 'shadow-xl',
        className
      )}
      style={{ borderRadius: resolvedRadius, ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      data-testid={testId}
      {...rest}
    >
      {renderGlowLayers()}
      <div className="Bear-GlowCard__content relative z-10">{children}</div>
    </div>
  );
};
