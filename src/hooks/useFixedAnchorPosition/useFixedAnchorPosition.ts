import { useLayoutEffect, useState } from 'react';
import {
  ANCHOR_EDGE_PAD_PX,
  ANCHOR_OFFSET_PX,
  DEFAULT_PLACEMENT,
  POSITION_FIXED,
  RESIZE_EVENT,
  SCROLL_EVENT,
  VISIBILITY_HIDDEN,
  VISIBILITY_VISIBLE,
} from './useFixedAnchorPosition.const';
import type {
  OverlayCoords,
  UseFixedAnchorPositionOptions,
  UseFixedAnchorPositionReturn,
} from './useFixedAnchorPosition.types';
import { resolveOverlayCoords } from './useFixedAnchorPosition.utils';

const EMPTY_COORDS: OverlayCoords = { top: 0, left: 0 };

export const useFixedAnchorPosition = (
  options: UseFixedAnchorPositionOptions
): UseFixedAnchorPositionReturn => {
  const {
    anchorRef,
    open,
    offsetPx = ANCHOR_OFFSET_PX,
    edgePadPx = ANCHOR_EDGE_PAD_PX,
    estimatedHeightPx,
    placement = DEFAULT_PLACEMENT,
    matchWidth = false,
    minWidthPx,
  } = options;

  const [coords, setCoords] = useState<OverlayCoords>(EMPTY_COORDS);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!open) {
      setReady(false);
      return;
    }

    const update = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      setCoords(
        resolveOverlayCoords({
          rect,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          offsetPx,
          edgePadPx,
          estimatedHeightPx,
          placement,
          matchWidth,
          minWidthPx,
        })
      );
      setReady(true);
    };

    update();
    window.addEventListener(RESIZE_EVENT, update);
    window.addEventListener(SCROLL_EVENT, update, true);
    return () => {
      window.removeEventListener(RESIZE_EVENT, update);
      window.removeEventListener(SCROLL_EVENT, update, true);
    };
  }, [
    open,
    anchorRef,
    offsetPx,
    edgePadPx,
    estimatedHeightPx,
    placement,
    matchWidth,
    minWidthPx,
  ]);

  return {
    coords,
    ready,
    style: {
      position: POSITION_FIXED,
      top: coords.top,
      left: coords.left,
      ...(coords.width === undefined ? {} : { width: coords.width }),
      ...(coords.minWidth === undefined ? {} : { minWidth: coords.minWidth }),
      visibility: ready ? VISIBILITY_VISIBLE : VISIBILITY_HIDDEN,
    },
  };
};
