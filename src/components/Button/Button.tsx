import { forwardRef, useMemo, useContext, useCallback } from 'react';
import { cn } from '@utils';
import { Spinner } from '../Spinner';
import { Typography } from '../Typography';
import { useBearStyles } from '@hooks';
import { BearContext } from '../../context/BearProvider';
import type { ButtonProps } from './Button.types';
import { BUTTON_SIZE, BUTTON_ICON_SIZE, BUTTON_ICON_ONLY_SIZE, BUTTON_VARIANT, VARIANT_DEFAULTS } from './Button.constants';
import { isBuiltInVariant } from './Button.utils';
import { useSpotlight } from './useSpotlight';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      leftIcon: leftIconProp,
      rightIcon: rightIconProp,
      textVariant = 'inherit',
      iconOnly = false,
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

    const context = useContext(BearContext);
    const componentStyles = context?.components?.Button?.root || {};
    const customVariants = context?.customVariants || {};

    const isCustomVariant = !isBuiltInVariant(variant) && variant in customVariants;
    const customVariantConfig = isCustomVariant ? customVariants[variant] : null;

    const { spotlightRef, position, isHovered, handlers } = useSpotlight({
      enabled: spotlight,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
    });

    const variantColors = VARIANT_DEFAULTS[variant as keyof typeof VARIANT_DEFAULTS] || VARIANT_DEFAULTS.primary;

    const dynamicStyles = useMemo(() => {
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

    const setRefs = useCallback((node: HTMLButtonElement | null) => {
      spotlightRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref, spotlightRef]);

    return (
      <button
        ref={setRefs}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        style={dynamicStyles}
        className={cn(
          'Bear-Button',
          'bear-inline-flex bear-items-center bear-justify-center bear-font-medium bear-rounded-lg bear-transition-all bear-duration-200 bear-outline-none bear-relative bear-overflow-hidden',
          iconOnly ? BUTTON_ICON_ONLY_SIZE[size] : BUTTON_SIZE[size],
          iconOnly && 'bear-rounded-lg',
          isBuiltInVariant(variant)
            ? BUTTON_VARIANT[variant]
            : `bear-btn-custom bear-text-white focus:bear-ring-2 focus:bear-ring-offset-2 disabled:bear-opacity-50 disabled:bear-cursor-not-allowed hover:bear-brightness-110 active:bear-brightness-95`,
          fullWidth && 'bear-w-full',
          loading && 'bear-cursor-wait',
          className
        )}
        data-testid={testId}
        onMouseMove={handlers.handleMouseMove}
        onMouseEnter={handlers.handleMouseEnter}
        onMouseLeave={handlers.handleMouseLeave}
        {...rest}
      >
        {spotlight && (
          <span
            className={cn(
              'Bear-Button__spotlight',
              'bear-absolute bear-left-0 bear-top-0 bear-rounded-full bear-pointer-events-none bear-z-[1]',
              'bear-transition-opacity bear-duration-150 bear-ease-out',
              isHovered ? 'bear-opacity-100' : 'bear-opacity-0',
            )}
            aria-hidden="true"
            style={{
              width: spotlightSize,
              height: spotlightSize,
              background: `radial-gradient(circle at center, ${spotlightColor} 0%, transparent 70%)`,
              transform: `translate(${position.x - spotlightSize / 2}px, ${position.y - spotlightSize / 2}px)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}

        {loading && (
          <span className={cn(
            'Bear-Button__loading bear-inline-flex bear-items-center bear-gap-2 bear-relative bear-z-10',
            !loadingText && 'bear-absolute'
          )}>
            <Spinner size={size === 'xs' ? 'xs' : 'sm'} className="Bear-Button__spinner" />
            {loadingText && (
              <Typography variant={textVariant} className="Bear-Button__text">
                {loadingText}
              </Typography>
            )}
          </span>
        )}

        <span
          className={cn(
            'Bear-Button__content bear-inline-flex bear-items-center bear-gap-inherit bear-relative bear-z-10',
            loading && 'bear-invisible'
          )}
        >
          {leftIcon && (
            <span className={cn('Bear-Button__icon Bear-Button__icon--left bear-inline-flex bear-shrink-0', BUTTON_ICON_SIZE[size])}>
              {leftIcon}
            </span>
          )}
          <Typography variant={textVariant} className="Bear-Button__text">
            {children}
          </Typography>
          {rightIcon && (
            <span className={cn('Bear-Button__icon Bear-Button__icon--right bear-inline-flex bear-shrink-0', BUTTON_ICON_SIZE[size])}>
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
