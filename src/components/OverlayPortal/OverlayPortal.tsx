import { useState } from 'react';
import type { CSSProperties } from 'react';
import { BOOLEAN_FALSE, BOOLEAN_TRUE, ZERO } from '@const';
import {
  OVERLAY_OPEN_EFFECT_NONE,
  VISIBILITY_VISIBLE,
  resolveOverlayEffects,
} from '@hooks/useFixedAnchorPosition';
import { Portal } from '../Portal';
import { Transition } from '../Transition';
import { DEFAULT_DURATION } from '../Transition/Transition.const';
import { OVERLAY_EFFECT_TRANSITION } from './OverlayPortal.const';
import type { OverlayPortalProps } from './OverlayPortal.types';

export const OverlayPortal = (props: OverlayPortalProps) => {
  const {
    open,
    ready,
    style,
    zIndex,
    className,
    testId,
    attributes,
    panelRef,
    children,
  } = props;

  const { openEffect, closeEffect } = resolveOverlayEffects(props, OVERLAY_OPEN_EFFECT_NONE);
  const [shouldRender, setShouldRender] = useState(BOOLEAN_FALSE);
  const hasMotion = openEffect !== OVERLAY_OPEN_EFFECT_NONE || closeEffect !== OVERLAY_OPEN_EFFECT_NONE;

  if (open && ready && !shouldRender) {
    setShouldRender(BOOLEAN_TRUE);
  }

  if (!open && shouldRender && !hasMotion) {
    setShouldRender(BOOLEAN_FALSE);
  }

  if (!shouldRender) {
    return null;
  }

  const activeEffect = open ? openEffect : closeEffect;
  const transitionName =
    activeEffect === OVERLAY_OPEN_EFFECT_NONE
      ? undefined
      : OVERLAY_EFFECT_TRANSITION[activeEffect];
  const motionName =
    transitionName ??
    (openEffect === OVERLAY_OPEN_EFFECT_NONE
      ? undefined
      : OVERLAY_EFFECT_TRANSITION[openEffect]) ??
    (closeEffect === OVERLAY_OPEN_EFFECT_NONE
      ? undefined
      : OVERLAY_EFFECT_TRANSITION[closeEffect]);
  const skipDuration =
    (open && openEffect === OVERLAY_OPEN_EFFECT_NONE) ||
    (!open && closeEffect === OVERLAY_OPEN_EFFECT_NONE);
  const panelStyle: CSSProperties = {
    ...style,
    zIndex,
    visibility: VISIBILITY_VISIBLE,
  };

  const handleLeft = () => {
    if (!open) {
      setShouldRender(BOOLEAN_FALSE);
    }
  };

  const panel = (
    <div ref={panelRef} className={className} style={panelStyle} data-testid={testId} {...attributes}>
      {hasMotion && motionName ? (
        <Transition
          show={open}
          name={motionName}
          duration={skipDuration ? ZERO : DEFAULT_DURATION}
          onLeft={handleLeft}
        >
          {children}
        </Transition>
      ) : (
        children
      )}
    </div>
  );

  return <Portal>{panel}</Portal>;
};
