import type { CSSProperties } from 'react';
import { Portal } from '../Portal';
import { Transition } from '../Transition';
import { OVERLAY_EFFECT_TRANSITION, OVERLAY_OPEN_EFFECT_NONE } from './OverlayPortal.const';
import type { OverlayPortalProps } from './OverlayPortal.types';

export const OverlayPortal = (props: OverlayPortalProps) => {
  const {
    open,
    ready,
    style,
    zIndex,
    openEffect = OVERLAY_OPEN_EFFECT_NONE,
    className,
    testId,
    attributes,
    panelRef,
    children,
  } = props;

  if (!open) {
    return null;
  }

  const panelStyle: CSSProperties = {
    ...style,
    zIndex,
  };

  const skipMotion = openEffect === OVERLAY_OPEN_EFFECT_NONE || !ready;
  const transitionName =
    openEffect === OVERLAY_OPEN_EFFECT_NONE ? undefined : OVERLAY_EFFECT_TRANSITION[openEffect];
  const panel = (
    <div ref={panelRef} className={className} style={panelStyle} data-testid={testId} {...attributes}>
      {skipMotion || !transitionName ? children : (
        <Transition show name={transitionName}>
          {children}
        </Transition>
      )}
    </div>
  );

  return <Portal>{panel}</Portal>;
};
