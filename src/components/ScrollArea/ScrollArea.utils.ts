import { TYPE_NUMBER, UNIT_PX } from '@const';

export const applyScrollAreaLimits = (
  element: HTMLDivElement | null,
  maxHeight?: number | string,
  maxWidth?: number | string
) => {
  if (!element) {
    return;
  }
  if (maxHeight !== undefined) {
    element.style.maxHeight = typeof maxHeight === TYPE_NUMBER ? `${maxHeight}${UNIT_PX}` : String(maxHeight);
  }
  if (maxWidth !== undefined) {
    element.style.maxWidth = typeof maxWidth === TYPE_NUMBER ? `${maxWidth}${UNIT_PX}` : String(maxWidth);
  }
};
