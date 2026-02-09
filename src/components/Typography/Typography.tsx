import { FC, ElementType, useContext, useMemo, CSSProperties } from 'react';
import { cn } from '@utils';
import type { TypographyProps, BuiltInTypographyVariant, CustomTypography } from './Typography.types';
import { BearContext } from '../../context/BearProvider';

const VARIANT_MAP: Record<BuiltInTypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  code: 'code',
  inherit: 'span',
};

const VARIANT_CLASSES: Record<BuiltInTypographyVariant, string> = {
  h1: 'bear-text-5xl bear-font-bold bear-tracking-tight',
  h2: 'bear-text-4xl bear-font-bold bear-tracking-tight',
  h3: 'bear-text-3xl bear-font-semibold',
  h4: 'bear-text-2xl bear-font-semibold',
  h5: 'bear-text-xl bear-font-medium',
  h6: 'bear-text-lg bear-font-medium',
  subtitle1: 'bear-text-lg bear-font-normal',
  subtitle2: 'bear-text-base bear-font-medium',
  body1: 'bear-text-base bear-font-normal',
  body2: 'bear-text-sm bear-font-normal',
  caption: 'bear-text-xs',
  overline: 'bear-text-xs bear-uppercase bear-tracking-wider',
  code: 'bear-text-sm bear-font-mono bear-bg-gray-100 dark:bear-bg-gray-800 bear-px-1.5 bear-py-0.5 bear-rounded',
  inherit: '', // Inherits all styles from parent
};

const WEIGHT_CLASSES = {
  thin: 'bear-font-thin',
  light: 'bear-font-light',
  normal: 'bear-font-normal',
  medium: 'bear-font-medium',
  semibold: 'bear-font-semibold',
  bold: 'bear-font-bold',
  extrabold: 'bear-font-extrabold',
};

const WEIGHT_VALUES: Record<string, number> = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

const ALIGN_CLASSES = {
  left: 'bear-text-left',
  center: 'bear-text-center',
  right: 'bear-text-right',
  justify: 'bear-text-justify',
};

const COLOR_CLASSES = {
  primary: 'bear-text-gray-900 dark:bear-text-gray-100',
  secondary: 'bear-text-gray-600 dark:bear-text-gray-400',
  muted: 'bear-text-gray-400 dark:bear-text-gray-500',
  success: 'bear-text-green-600 dark:bear-text-green-400',
  danger: 'bear-text-red-600 dark:bear-text-red-400',
  warning: 'bear-text-amber-600 dark:bear-text-amber-400',
};

const LINE_HEIGHT_CLASSES = {
  tight: 'bear-leading-tight',
  normal: 'bear-leading-normal',
  relaxed: 'bear-leading-relaxed',
  loose: 'bear-leading-loose',
};

/** Built-in variant names */
const BUILT_IN_VARIANTS: BuiltInTypographyVariant[] = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'subtitle1', 'subtitle2', 'body1', 'body2',
  'caption', 'overline', 'code', 'inherit'
];

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
export const Typography: FC<TypographyProps> = ({
  variant = 'body1',
  component,
  align,
  weight,
  color = 'primary',
  truncate = false,
  maxLines,
  italic = false,
  underline = false,
  strikethrough = false,
  noWrap = false,
  inline = false,
  paragraph = false,
  lineHeight,
  children,
  className,
  style,
  testId,
  ...props
}) => {
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
  
  const isCustomColor = color && !COLOR_CLASSES[color as keyof typeof COLOR_CLASSES];

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

  return (
    <Component
      className={cn(
        'Bear-Typography',
        `Bear-Typography--${variant}`,
        isBuiltIn && VARIANT_CLASSES[variant as BuiltInTypographyVariant],
        weight && WEIGHT_CLASSES[weight],
        align && ALIGN_CLASSES[align],
        !isCustomColor && color && COLOR_CLASSES[color as keyof typeof COLOR_CLASSES],
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
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
