import { createPortal } from 'react-dom';
import { useBearDirectionOptional } from '@context/BearProvider';
import { cn, resolveBearId, useBearId } from '@utils';
import {
  BOOLEAN_TRUE,
  COMPONENT_NAME_DRAWER,
} from '@const';
import { Backdrop } from '../Backdrop';
import { Box } from '../Box';
import type { DrawerProps, DrawerSide } from './Drawer.types';
import { DRAWER_ANIMATION_MS, DRAWER_DEFAULT_SIDE, DRAWER_DEFAULT_SIZE } from './Drawer.const';
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
    variant: _variant = 'temporary',
    size = DRAWER_DEFAULT_SIZE,
    showCloseButton = BOOLEAN_TRUE,
    closeOnBackdrop = BOOLEAN_TRUE,
    closeOnEscape = BOOLEAN_TRUE,
    className,
    container,
    id,
    testId,
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_DRAWER);
  const domId = resolveBearId(id, generatedId);
  const { direction } = useBearDirectionOptional();
  const resolvedSide: DrawerSide = anchor ?? side;
  const { isMounted, isPanelOpen } = useDrawer({
    isOpen,
    onClose,
    closeOnEscape,
  });

  if (!isMounted) {
    return null;
  }

  const showHeader = Boolean(title) || showCloseButton;
  const titleId = `${domId}-title`;
  const handleBackdropClick = closeOnBackdrop ? () => onClose() : undefined;
  const labelledBy = title ? titleId : undefined;

  const drawerContent = (
    <Box id={domId} testId={testId} className="Bear-Drawer">
      <Backdrop
        open={isPanelOpen}
        keepMounted
        blur
        nested
        transitionDuration={DRAWER_ANIMATION_MS}
        className="Bear-Drawer__backdrop"
        onClick={handleBackdropClick}
      />

      <Box
        role="dialog"
        aria-modal={BOOLEAN_TRUE}
        aria-labelledby={labelledBy}
        className={cn(
          'Bear-Drawer__panel',
          `Bear-Drawer__panel--${resolvedSide}`,
          `Bear-Drawer__panel--${size}`,
          isPanelOpen && 'Bear-Drawer__panel--open',
          className
        )}
      >
        <DrawerOptionalHeader
          showHeader={showHeader}
          side={resolvedSide}
          title={title}
          titleId={titleId}
          showCloseButton={showCloseButton}
          onClose={onClose}
          direction={direction}
        />

        <Box className="Bear-Drawer__body">{children}</Box>
      </Box>
    </Box>
  );

  return createPortal(drawerContent, container ?? document.body);
};
