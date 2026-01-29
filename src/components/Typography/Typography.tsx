import { FC, ElementType } from 'react';
import { cn } from '@utils';
import type { TypographyProps, TypographyVariant } from './Typography.types';

const VARIANT_MAP: Record<TypographyVariant, ElementType> = {
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
};

const VARIANT_CLASSES: Record<TypographyVariant, string> = {
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

/**
 * Typography component for consistent text styling
 * 
 * @example
 * ```tsx
 * <Typography variant="h1">Heading 1</Typography>
 * <Typography variant="body1" color="secondary">Body text</Typography>
 * <Typography variant="caption" truncate maxLines={2}>Long text...</Typography>
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
  const Component = component || VARIANT_MAP[variant];
  
  const isCustomColor = color && !COLOR_CLASSES[color as keyof typeof COLOR_CLASSES];

  return (
    <Component
      className={cn(
        'Bear-Typography',
        `Bear-Typography--${variant}`,
        VARIANT_CLASSES[variant],
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
