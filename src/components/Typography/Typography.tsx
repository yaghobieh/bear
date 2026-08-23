import { useContext } from 'react';
import type { ElementType } from 'react';
import { BearContext } from '@context/BearProvider';
import { BOOLEAN_FALSE, BOOLEAN_TRUE } from '@const';
import { Typewriter } from '../Typewriter/Typewriter';
import {
  DEFAULT_VARIANT,
  DEFAULT_COLOR,
  VARIANT_MAP,
  VARIANT_CLASSES,
  WEIGHT_CLASSES,
  ALIGN_CLASSES,
  COLOR_CLASSES,
  LINE_HEIGHT_CLASSES,
  BUILT_IN_VARIANTS,
} from './Typography.const';
import type { TypographyProps, BuiltInTypographyVariant } from './Typography.types';
import {
  resolveCustomTypographyStyles,
  resolveGradientPair,
  wrapTypographyGradient,
} from './Typography.utils';
import { cn } from '@utils';

export const Typography = (props: TypographyProps) => {
  const {
    variant = DEFAULT_VARIANT,
    component,
    align,
    weight,
    color = DEFAULT_COLOR,
    truncate = BOOLEAN_FALSE,
    maxLines,
    italic = BOOLEAN_FALSE,
    underline = BOOLEAN_FALSE,
    strikethrough = BOOLEAN_FALSE,
    noWrap = BOOLEAN_FALSE,
    inline = BOOLEAN_FALSE,
    paragraph = BOOLEAN_FALSE,
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
  const isBuiltIn = BUILT_IN_VARIANTS.includes(variant as BuiltInTypographyVariant);
  const customTypo = isBuiltIn ? undefined : context?.customTypography?.[variant];
  const Component: ElementType =
    component ?? customTypo?.component ?? (isBuiltIn ? VARIANT_MAP[variant as BuiltInTypographyVariant] : 'span');
  const isCustomColor = Boolean(color && !(color in COLOR_CLASSES));
  const customStyles = resolveCustomTypographyStyles(customTypo);
  const innerContent = typewriter ? (
    <Typewriter
      text={typewriter.texts}
      loop={typewriter.loop ?? BOOLEAN_TRUE}
      speed={typewriter.speed}
      deleteSpeed={typewriter.deleteSpeed}
      cursor={typewriter.cursor ?? BOOLEAN_TRUE}
      cursorChar={typewriter.cursorChar}
      as="span"
    />
  ) : (
    children
  );
  const wrappedContent = wrapTypographyGradient(innerContent, resolveGradientPair(gradient), inline);

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
        className,
      )}
      style={{
        ...customStyles,
        ...style,
        ...(isCustomColor ? { color } : {}),
        ...(truncate && maxLines
          ? {
              display: '-webkit-box',
              WebkitLineClamp: maxLines,
              WebkitBoxOrient: 'vertical',
            }
          : {}),
      }}
      data-testid={testId}
      {...rest}
    >
      {wrappedContent}
    </Component>
  );
};

export default Typography;
