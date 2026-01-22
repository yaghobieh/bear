import { FC, ElementType } from 'react';
import { cn } from '../../utils/cn';
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
  h1: 'ember-text-5xl ember-font-bold ember-tracking-tight',
  h2: 'ember-text-4xl ember-font-bold ember-tracking-tight',
  h3: 'ember-text-3xl ember-font-semibold',
  h4: 'ember-text-2xl ember-font-semibold',
  h5: 'ember-text-xl ember-font-medium',
  h6: 'ember-text-lg ember-font-medium',
  subtitle1: 'ember-text-lg ember-font-normal',
  subtitle2: 'ember-text-base ember-font-medium',
  body1: 'ember-text-base ember-font-normal',
  body2: 'ember-text-sm ember-font-normal',
  caption: 'ember-text-xs',
  overline: 'ember-text-xs ember-uppercase ember-tracking-wider',
  code: 'ember-text-sm ember-font-mono ember-bg-gray-100 dark:ember-bg-gray-800 ember-px-1.5 ember-py-0.5 ember-rounded',
};

const WEIGHT_CLASSES = {
  thin: 'ember-font-thin',
  light: 'ember-font-light',
  normal: 'ember-font-normal',
  medium: 'ember-font-medium',
  semibold: 'ember-font-semibold',
  bold: 'ember-font-bold',
  extrabold: 'ember-font-extrabold',
};

const ALIGN_CLASSES = {
  left: 'ember-text-left',
  center: 'ember-text-center',
  right: 'ember-text-right',
  justify: 'ember-text-justify',
};

const COLOR_CLASSES = {
  primary: 'ember-text-gray-900 dark:ember-text-gray-100',
  secondary: 'ember-text-gray-600 dark:ember-text-gray-400',
  muted: 'ember-text-gray-400 dark:ember-text-gray-500',
  success: 'ember-text-green-600 dark:ember-text-green-400',
  danger: 'ember-text-red-600 dark:ember-text-red-400',
  warning: 'ember-text-amber-600 dark:ember-text-amber-400',
};

const LINE_HEIGHT_CLASSES = {
  tight: 'ember-leading-tight',
  normal: 'ember-leading-normal',
  relaxed: 'ember-leading-relaxed',
  loose: 'ember-leading-loose',
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
        VARIANT_CLASSES[variant],
        weight && WEIGHT_CLASSES[weight],
        align && ALIGN_CLASSES[align],
        !isCustomColor && color && COLOR_CLASSES[color as keyof typeof COLOR_CLASSES],
        lineHeight && LINE_HEIGHT_CLASSES[lineHeight],
        italic && 'ember-italic',
        underline && 'ember-underline',
        strikethrough && 'ember-line-through',
        noWrap && 'ember-whitespace-nowrap',
        inline && 'ember-inline',
        paragraph && 'ember-mb-4',
        truncate && !maxLines && 'ember-truncate',
        truncate && maxLines && 'ember-overflow-hidden',
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

