import { useState } from 'react';
import type { CSSProperties } from 'react';
import { BOOLEAN_FALSE, BOOLEAN_TRUE, ZERO } from '@const';
import { cn } from '@utils';
import {
  OVERLAY_OPEN_EFFECT_DEFAULT,
  OVERLAY_OPEN_EFFECT_NONE,
  VISIBILITY_VISIBLE,
  resolveOverlayEffects,
} from '@hooks/useFixedAnchorPosition';
import { Portal } from '../Portal';
import { Transition } from '../Transition';
import { DEFAULT_DURATION, DEFAULT_EASING } from '../Transition/Transition.const';
import { OVERLAY_EFFECT_TRANSITION, OVERLAY_ELASTIC_EASING, OVERLAY_EXPAND_MS, OVERLAY_PANEL_CLASS } from './OverlayPortal.const';
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

  const { openEffect, closeEffect } = resolveOverlayEffects(props, OVERLAY_OPEN_EFFECT_DEFAULT);
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

  const panelClassName = cn(OVERLAY_PANEL_CLASS, activeEffect && `${OVERLAY_PANEL_CLASS}--${activeEffect}`, className);
  const motionDuration = activeEffect === 'expand' || activeEffect === 'reveal' ? OVERLAY_EXPAND_MS : DEFAULT_DURATION;
  const motionEasing = activeEffect === 'elastic' ? OVERLAY_ELASTIC_EASING : DEFAULT_EASING;

  const panel = hasMotion && motionName ? (
    <Transition
      show={open}
      name={motionName}
      duration={skipDuration ? ZERO : motionDuration}
      easing={motionEasing}
      className={panelClassName}
      style={panelStyle}
      nodeRef={panelRef}
      onLeft={handleLeft}
      elementProps={{ ...attributes, 'data-testid': testId }}
    >
      {children}
    </Transition>
  ) : (
    <div ref={panelRef} className={className} style={panelStyle} data-testid={testId} {...attributes}>
      {children}
    </div>
  );

  return <Portal>{panel}</Portal>;
};
