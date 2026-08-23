import type { CSSProperties, ReactNode } from 'react';
import { ONE, TWO, ZERO } from '@const';
import { GradientText } from '../GradientText/GradientText';
import type { CustomTypography } from './Typography.types';
import { WEIGHT_VALUES } from './Typography.const';

const CUSTOM_STYLE_KEYS = [
  'fontSize',
  'lineHeight',
  'letterSpacing',
  'textTransform',
  'fontFamily',
] as const;

type CustomStyleKey = (typeof CUSTOM_STYLE_KEYS)[number];

export const resolveCustomTypographyStyles = (
  customTypo?: CustomTypography,
): CSSProperties => {
  if (!customTypo) return {};

  const styles = CUSTOM_STYLE_KEYS.reduce<CSSProperties>((accumulator, key: CustomStyleKey) => {
    const value = customTypo[key];
    if (value) {
      accumulator[key] = value;
    }
    return accumulator;
  }, {});

  if (customTypo.fontWeight === undefined) {
    return styles;
  }

  styles.fontWeight =
    typeof customTypo.fontWeight === 'number'
      ? customTypo.fontWeight
      : WEIGHT_VALUES[customTypo.fontWeight] ?? WEIGHT_VALUES.normal;

  return styles;
};

export const resolveGradientPair = (gradient?: string[]): [string, string] | undefined => {
  if (!Array.isArray(gradient) || gradient.length < TWO) {
    return undefined;
  }
  return [gradient[ZERO], gradient[ONE]];
};

export const wrapTypographyGradient = (
  content: ReactNode,
  gradient: [string, string] | undefined,
  inline: boolean,
): ReactNode => {
  if (!gradient) {
    return content;
  }
  return (
    <GradientText colors={gradient} className={inline ? 'bear-inline' : undefined}>
      {content}
    </GradientText>
  );
};
