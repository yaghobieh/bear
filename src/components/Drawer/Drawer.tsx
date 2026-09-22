import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useBearDirectionOptional } from '@context/BearProvider';
import { cn, resolveBearId, useBearId } from '@utils';
import { useFocusTrap } from '@hooks/useFocusTrap';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  COMPONENT_NAME_DRAWER,
  DRAWER_VARIANT_PERMANENT,
  DRAWER_VARIANT_TEMPORARY,
} from '@const';
import {
  OVERLAY_OPEN_EFFECT_DEFAULT,
  resolveOverlayEffects,
} from '@hooks/useFixedAnchorPosition';
import { Backdrop } from '../Backdrop';
import { Box } from '../Box';
import type { DrawerProps, DrawerSide } from './Drawer.types';
import { DRAWER_ANIMATION_MS, DRAWER_DEFAULT_SIDE, DRAWER_DEFAULT_SIZE, DRAWER_DEFAULT_VARIANT } from './Drawer.const';
import { DrawerOptionalHeader } from './helpers';
import { useDrawer } from './hooks';

export const Drawer = (props: DrawerProps) => {
  const {
    isOpen,
    onClose,
    title,
    children,
    side = DRAWER_DEFAULT_SIDE,
    anchor,
    variant = DRAWER_DEFAULT_VARIANT,
    size = DRAWER_DEFAULT_SIZE,
    showCloseButton = BOOLEAN_TRUE,
    closeOnBackdrop = BOOLEAN_TRUE,
    closeOnEscape = BOOLEAN_TRUE,
    className,
    container,
    id,
    testId,
  } = props;

  const isPermanent = variant === DRAWER_VARIANT_PERMANENT;
  const isTemporary = variant === DRAWER_VARIANT_TEMPORARY;
  const { openEffect, closeEffect } = resolveOverlayEffects(props, OVERLAY_OPEN_EFFECT_DEFAULT);
  const generatedId = useBearId(COMPONENT_NAME_DRAWER);
  const domId = resolveBearId(id, generatedId);
  const { direction } = useBearDirectionOptional();
  const resolvedSide: DrawerSide = anchor ?? side;
  const { isMounted, isPanelOpen } = useDrawer({
    isOpen: isPermanent ? BOOLEAN_TRUE : isOpen,
    onClose,
    closeOnEscape: isPermanent ? BOOLEAN_FALSE : closeOnEscape,
    openEffect,
    closeEffect,
    lockScroll: isTemporary,
    alwaysMounted: isPermanent,
  });
  const activeEffect = isPanelOpen ? openEffect : closeEffect;
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, {
    enabled: isTemporary && isPanelOpen,
    onEscape: closeOnEscape ? onClose : undefined,
  });

  if (!isMounted) {
    return null;
  }

  const showHeader = Boolean(title) || showCloseButton;
  const titleId = `${domId}-title`;
  const handleBackdropClick = closeOnBackdrop && isTemporary ? () => onClose() : undefined;
  const labelledBy = title ? titleId : undefined;
  const panelRole = isPermanent ? 'complementary' : 'dialog';

  const drawerContent = (
    <Box
      id={domId}
      data-testid={testId}
      className={cn('Bear-Drawer', `Bear-Drawer--${variant}`)}
    >
      {isTemporary && (
        <Backdrop
          open={isPanelOpen}
          keepMounted
          blur
          nested
          transitionDuration={DRAWER_ANIMATION_MS}
          className="Bear-Drawer__backdrop"
          onClick={handleBackdropClick}
        />
      )}

      <Box
        ref={panelRef}
        role={panelRole}
        tabIndex={-1}
        aria-modal={isTemporary ? BOOLEAN_TRUE : BOOLEAN_FALSE}
        aria-labelledby={labelledBy}
        className={cn(
          'Bear-Drawer__panel',
          `Bear-Drawer__panel--${resolvedSide}`,
          `Bear-Drawer__panel--${size}`,
          `Bear-Drawer__panel--effect-${activeEffect}`,
          isPanelOpen && 'Bear-Drawer__panel--open',
          className
        )}
      >
        <DrawerOptionalHeader
          showHeader={showHeader}
          side={resolvedSide}
          title={title}
          titleId={titleId}
          showCloseButton={isPermanent ? BOOLEAN_FALSE : showCloseButton}
          onClose={onClose}
          direction={direction}
        />

        <Box className="Bear-Drawer__body">{children}</Box>
      </Box>
    </Box>
  );

  if (isPermanent) {
    return drawerContent;
  }

  return createPortal(drawerContent, container ?? document.body);
};
