import { POSITION_TOP, ZERO } from '@const';
import type { AffixLayoutInput, AffixLayoutResult } from './Affix.types';

export const resolveAffixHeight = (
  contentEl: HTMLElement | null,
  placeholderEl: HTMLElement
): number => contentEl?.offsetHeight ?? placeholderEl.offsetHeight ?? ZERO;

export const resolveAffixLayoutChange = (input: AffixLayoutInput): AffixLayoutResult | null => {
  const { position, isFixed, offset, rectTop, rectBottom, viewportBottom, measuredHeight } = input;

  if (position === POSITION_TOP) {
    if (!isFixed && rectTop <= offset) {
      return { isFixed: true, placeholderHeight: measuredHeight };
    }
    if (isFixed && rectTop > offset) {
      return { isFixed: false, placeholderHeight: ZERO };
    }
    return null;
  }

  if (!isFixed && rectBottom >= viewportBottom - offset) {
    return { isFixed: true, placeholderHeight: measuredHeight };
  }
  if (isFixed && rectBottom < viewportBottom - offset) {
    return { isFixed: false, placeholderHeight: ZERO };
  }
  return null;
};
