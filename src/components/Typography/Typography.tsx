import { FC, ElementType, useContext, useMemo, CSSProperties } from 'react';
import type { TypographyProps, BuiltInTypographyVariant, CustomTypography } from './Typography.types';
import { BearContext } from '../../context/BearProvider';
import { GradientText } from '../GradientText/GradientText';
import { Typewriter } from '../Typewriter/Typewriter';
import {
  DEFAULT_VARIANT,
  DEFAULT_COLOR,
  VARIANT_MAP,
  VARIANT_CLASSES,
  WEIGHT_CLASSES,
  WEIGHT_VALUES,
  ALIGN_CLASSES,
  COLOR_CLASSES,
  LINE_HEIGHT_CLASSES,
  BUILT_IN_VARIANTS,
} from './Typography.const';
import { cn } from '@utils';

/**
 * Typography component for consistent text styling
 * 
 * @example
 * ```tsx
 * // Built-in variants
 * <Typography variant="h1">Heading 1</Typography>
 * <Typography variant="body1" color="secondary">Body text</Typography>
 * 
 * // Custom variants (defined in BearProvider)
 * <Typography variant="b250">Custom 25px text</Typography>
 * <Typography variant="display1">Large display text</Typography>
 * ```
 */
export const Typography: FC<TypographyProps> = (props) => {
  const {
    variant = DEFAULT_VARIANT,
    component,
    align,
    weight,
    color = DEFAULT_COLOR,
  truncate = false,
  maxLines,
  italic = false,
  underline = false,
  strikethrough = false,
  noWrap = false,
  inline = false,
  paragraph = false,
  lineHeight,
  gradient,
  typewriter,
  children,
  className,
  style,
  testId,
    ...rest
  } = props;
  const context = useContext(BearContext);
  
  // Check if this is a built-in variant
  const isBuiltIn = BUILT_IN_VARIANTS.includes(variant as BuiltInTypographyVariant);
  
  // Get custom typography config if it's a custom variant
  const customTypo: CustomTypography | undefined = useMemo(() => {
    if (isBuiltIn || !context?.customTypography) return undefined;
    return context.customTypography[variant];
  }, [isBuiltIn, context?.customTypography, variant]);
  
  // Determine the component to render
  const Component: ElementType = useMemo(() => {
    if (component) return component;
    if (customTypo?.component) return customTypo.component;
    if (isBuiltIn) return VARIANT_MAP[variant as BuiltInTypographyVariant];
    return 'span';
  }, [component, customTypo, isBuiltIn, variant]);
  
  const isCustomColor = color && !(color in COLOR_CLASSES);

  // Build custom styles for custom variants
  const customStyles: CSSProperties = useMemo(() => {
    if (!customTypo) return {};
    
    const styles: CSSProperties = {};
    if (customTypo.fontSize) styles.fontSize = customTypo.fontSize;
    if (customTypo.lineHeight) styles.lineHeight = customTypo.lineHeight;
    if (customTypo.letterSpacing) styles.letterSpacing = customTypo.letterSpacing;
    if (customTypo.textTransform) styles.textTransform = customTypo.textTransform;
    if (customTypo.fontFamily) styles.fontFamily = customTypo.fontFamily;
    if (customTypo.fontWeight) {
      styles.fontWeight = typeof customTypo.fontWeight === 'number' 
        ? customTypo.fontWeight 
        : WEIGHT_VALUES[customTypo.fontWeight] || 400;
    }
    
    return styles;
  }, [customTypo]);

  const innerContent = typewriter ? (
    <Typewriter
      text={typewriter.texts}
      loop={typewriter.loop ?? true}
      speed={typewriter.speed}
      deleteSpeed={typewriter.deleteSpeed}
      cursor={typewriter.cursor ?? true}
      cursorChar={typewriter.cursorChar}
      as="span"
    />
  ) : (
    children
  );

  const wrappedContent = gradient && (Array.isArray(gradient) && gradient.length >= 2) ? (
    <GradientText colors={gradient as [string, string]} className={inline ? 'bear-inline' : undefined}>
      {innerContent}
    </GradientText>
  ) : (
    innerContent
  );

  return (
    <Component
      className={cn(
        'Bear-Typography',
        `Bear-Typography--${variant}`,
        isBuiltIn && VARIANT_CLASSES[variant as BuiltInTypographyVariant],
        weight && WEIGHT_CLASSES[weight],
        align && ALIGN_CLASSES[align],
        !isCustomColor && color && COLOR_CLASSES[color],
        lineHeight && LINE_HEIGHT_CLASSES[lineHeight],
        italic && 'Bear-Typography--italic bear-italic',
        underline && 'Bear-Typography--underline bear-underline',
        strikethrough && 'Bear-Typography--strikethrough bear-line-through',
        noWrap && 'bear-whitespace-nowrap',
        inline && 'bear-inline',
        paragraph && 'bear-mb-4',
        truncate && !maxLines && 'Bear-Typography--truncate bear-truncate',
        truncate && maxLines && 'bear-overflow-hidden',
        className
      )}
      style={{
        ...customStyles,
        ...style,
        ...(isCustomColor && { color }),
        ...(truncate && maxLines && {
          display: '-webkit-box',
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: 'vertical' as const,
        }),
      }}
      data-testid={testId}
      {...rest}
    >
      {wrappedContent}
    </Component>
  );
};

export default Typography;
