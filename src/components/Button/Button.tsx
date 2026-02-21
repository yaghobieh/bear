import { forwardRef, useRef, useState, useCallback, useMemo, useContext } from 'react';
import { cn } from '@utils';
import { Spinner } from '../Spinner';
import { Typography } from '../Typography';
import { useBearStyles } from '@hooks';
import { BearContext } from '../../context/BearProvider';
import type { ButtonProps } from './Button.types';
import { BUTTON_SIZE, BUTTON_VARIANT, VARIANT_DEFAULTS } from './Button.constants';
import type { BearVariant } from '../../types';

/** Check if variant is a built-in variant */
const isBuiltInVariant = (variant: string): variant is BearVariant => {
  return variant in BUTTON_VARIANT;
};

/**
 * Button component with multiple variants, sizes, states, and effects.
 * 
 * Features:
 * - Fully themeable via BearProvider
 * - Mouse-follow spotlight hover effect
 * - CSS variable-based colors for easy customization
 * - Component overrides via useBearComponent
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * 
 * // With spotlight hover effect
 * <Button variant="primary" spotlight>
 *   Hover me
 * </Button>
 * 
 * // With icons
 * <Button variant="outline" leftIcon={<Icon />}>
 *   With Icon
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      leftIcon: leftIconProp,
      rightIcon: rightIconProp,
      textVariant = 'inherit',
      spotlight = false,
      spotlightColor = 'rgba(255, 255, 255, 0.35)',
      spotlightSize = 150,
      disabled,
      className,
      children,
      testId,
      bis,
      style,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...rest
    } = props;

    const isDisabled = disabled || loading;
    const mergedStyle = useBearStyles(bis, style);
    const leftIcon = leftIconProp ?? (icon && iconPosition === 'left' ? icon : undefined);
    const rightIcon = rightIconProp ?? (icon && iconPosition === 'right' ? icon : undefined);

    // Get component overrides and custom variants from context
    const context = useContext(BearContext);
    const componentStyles = context?.components?.Button?.root || {};
    const customVariants = context?.customVariants || {};
    
    // Check if using a custom variant
    const isCustomVariant = !isBuiltInVariant(variant) && variant in customVariants;
    const customVariantConfig = isCustomVariant ? customVariants[variant] : null;

    // Spotlight state
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [spotlightPos, setSpotlightPos] = useState({ x: -1000, y: -1000 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (spotlight && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setSpotlightPos({ x, y });
      }
      onMouseMove?.(e);
    }, [spotlight, onMouseMove]);

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (spotlight) {
        setIsHovered(true);
        // Set initial position on enter
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          setSpotlightPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
      }
      onMouseEnter?.(e);
    }, [spotlight, onMouseEnter]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      setSpotlightPos({ x: -1000, y: -1000 });
      onMouseLeave?.(e);
    }, [onMouseLeave]);

    // Get variant colors from CSS variables or defaults
    const variantColors = VARIANT_DEFAULTS[variant as keyof typeof VARIANT_DEFAULTS] || VARIANT_DEFAULTS.primary;

    // Build dynamic styles based on variant (built-in or custom)
    const dynamicStyles = useMemo(() => {
      // Custom variant styling
      if (isCustomVariant && customVariantConfig) {
        return {
          backgroundColor: `var(--bear-${variant}-bg, ${customVariantConfig.bg})`,
          color: customVariantConfig.text || '#ffffff',
          borderColor: customVariantConfig.border,
          '--bear-ring-color': customVariantConfig.ring || customVariantConfig.bg,
          ...componentStyles,
          ...mergedStyle,
        } as React.CSSProperties;
      }
      
      // Built-in variant styling
      const styles: React.CSSProperties = {
        backgroundColor: `var(--bear-btn-${variant}-bg, ${variantColors.bg})`,
        color: variant === 'outline' || variant === 'ghost' 
          ? `var(--bear-btn-${variant}-text, ${variantColors.text || 'inherit'})`
          : 'white',
        borderColor: variant === 'outline' 
          ? `var(--bear-btn-${variant}-border, ${variantColors.border || variantColors.bg})`
          : undefined,
        '--bear-ring-color': `var(--bear-btn-${variant}-ring, ${variantColors.ring})`,
        ...componentStyles,
        ...mergedStyle,
      } as React.CSSProperties;

      return styles;
    }, [variant, variantColors, componentStyles, mergedStyle, isCustomVariant, customVariantConfig]);

    // Combine refs
    const setRefs = useCallback((node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);

    return (
      <button
        ref={setRefs}
        disabled={isDisabled}
        style={dynamicStyles}
        className={cn(
          'Bear-Button',
          'bear-inline-flex bear-items-center bear-justify-center bear-font-medium bear-rounded-lg bear-transition-all bear-duration-200 bear-outline-none bear-relative bear-overflow-hidden',
          BUTTON_SIZE[size],
          // Use built-in variant classes or custom variant base classes
          isBuiltInVariant(variant) 
            ? BUTTON_VARIANT[variant]
            : `bear-btn-custom bear-text-white focus:bear-ring-2 focus:bear-ring-offset-2 disabled:bear-opacity-50 disabled:bear-cursor-not-allowed hover:bear-brightness-110 active:bear-brightness-95`,
          fullWidth && 'bear-w-full',
          loading && 'bear-cursor-wait',
          className
        )}
        data-testid={testId}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {/* Spotlight overlay - follows mouse cursor */}
        {spotlight && (
          <span
            className="Bear-Button__spotlight"
            aria-hidden="true"
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              left: 0,
              top: 0,
              width: spotlightSize,
              height: spotlightSize,
              borderRadius: '50%',
              background: `radial-gradient(circle at center, ${spotlightColor} 0%, transparent 70%)`,
              opacity: isHovered ? 1 : 0,
              transform: `translate(${spotlightPos.x - spotlightSize / 2}px, ${spotlightPos.y - spotlightSize / 2}px)`,
              transition: 'opacity 0.15s ease-out',
              zIndex: 1,
              mixBlendMode: 'overlay',
            }}
          />
        )}

        {loading && (
          <Spinner size={size === 'xs' ? 'xs' : 'sm'} className="Bear-Button__spinner bear-absolute" />
        )}

        <span 
          className={cn(
            'Bear-Button__content bear-inline-flex bear-items-center bear-gap-inherit bear-relative bear-z-10',
            loading && 'bear-invisible'
          )}
        >
          {leftIcon && (
            <span className="Bear-Button__icon Bear-Button__icon--left bear-inline-flex bear-shrink-0 [&_svg]:bear-w-[1em] [&_svg]:bear-h-[1em] [&_svg]:bear-min-w-[1em]">
              {leftIcon}
            </span>
          )}
          <Typography variant={textVariant} className="Bear-Button__text">
            {children}
          </Typography>
          {rightIcon && (
            <span className="Bear-Button__icon Bear-Button__icon--right bear-inline-flex bear-shrink-0 [&_svg]:bear-w-[1em] [&_svg]:bear-h-[1em] [&_svg]:bear-min-w-[1em]">
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
