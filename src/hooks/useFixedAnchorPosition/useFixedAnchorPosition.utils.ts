import {
  PLACEMENT_BOTTOM,
  PLACEMENT_END,
  PLACEMENT_TOP,
} from './useFixedAnchorPosition.const';
import type { OverlayCoords, OverlayPlacement } from './useFixedAnchorPosition.types';

export const resolveOverlayCoords = (params: {
  rect: DOMRect;
  viewportWidth: number;
  viewportHeight: number;
  offsetPx: number;
  edgePadPx: number;
  estimatedHeightPx?: number;
  placement: OverlayPlacement;
  matchWidth: boolean;
  minWidthPx?: number;
}): OverlayCoords => {
  const {
    rect,
    viewportWidth,
    viewportHeight,
    offsetPx,
    edgePadPx,
    estimatedHeightPx,
    placement,
    matchWidth,
    minWidthPx,
  } = params;

  const preferredWidth = matchWidth ? rect.width : (minWidthPx ?? rect.width);
  const placeEnd = placement.endsWith(PLACEMENT_END);
  const placeCenter = placement === PLACEMENT_TOP || placement === PLACEMENT_BOTTOM;
  const baseLeft = placeEnd
    ? rect.right - preferredWidth
    : placeCenter
      ? rect.left + rect.width / 2 - preferredWidth / 2
      : rect.left;
  const maxLeft = Math.max(edgePadPx, viewportWidth - preferredWidth - edgePadPx);
  const left = Math.min(Math.max(edgePadPx, baseLeft), maxLeft);

  const forceAbove = placement.startsWith(PLACEMENT_TOP);
  const spaceBelow = viewportHeight - rect.bottom;
  const flipAbove =
    !forceAbove &&
    estimatedHeightPx !== undefined &&
    spaceBelow < estimatedHeightPx &&
    rect.top > estimatedHeightPx;
  const openUp = forceAbove || flipAbove;
  const rawTop = openUp
    ? rect.top - (estimatedHeightPx ?? 0) - offsetPx
    : rect.bottom + offsetPx;
  const top =
    estimatedHeightPx === undefined
      ? rawTop
      : Math.max(edgePadPx, Math.min(rawTop, viewportHeight - estimatedHeightPx - edgePadPx));

  const coords: OverlayCoords = { top, left };
  if (matchWidth) {
    coords.width = rect.width;
  }
  if (minWidthPx !== undefined) {
    coords.minWidth = preferredWidth;
  }
  return coords;
};
