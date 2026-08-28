import type { PropRow } from '@/components/PropsTable';
import type { DrawerSide, DrawerSize } from './Drawer.types';

export const DRAWER_SIDES: DrawerSide[] = ['left', 'right', 'top', 'bottom'];

export const DRAWER_SIDE_LABELS: Record<DrawerSide, string> = {
  left: 'Left',
  right: 'Right',
  top: 'Top',
  bottom: 'Bottom',
};

export const DRAWER_TITLE_PREFIX = 'Drawer — ';

export const DRAWER_SIZES: DrawerSize[] = ['sm', 'md', 'lg', 'xl'];

export const DRAWER_EFFECTS = ['slide-down', 'fade', 'scale', 'none'] as const;

export const DRAWER_PROPS: PropRow[] = [
  { name: 'isOpen', type: 'boolean', description: 'Whether the drawer is visible' },
  { name: 'onClose', type: '() => void', description: 'Close handler' },
  { name: 'title', type: 'string', description: 'Header title' },
  { name: 'children', type: 'ReactNode', description: 'Drawer body content' },
  { name: 'side', type: "'left' | 'right' | 'top' | 'bottom'", default: 'right', description: 'Slide-in edge' },
  { name: 'anchor', type: "'left' | 'right' | 'top' | 'bottom'", description: 'Alias for side' },
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: 'md', description: 'Drawer dimension for the active axis' },
  { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Show close button in header' },
  { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Close when backdrop is clicked' },
  { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Close on Escape key' },
  { name: 'container', type: 'Element | DocumentFragment | null', default: 'document.body', description: 'createPortal mount target' },
  { name: 'openEffect', type: "'none' | 'fade' | 'slide-down' | 'scale'", default: 'slide-down', description: 'Open motion' },
  { name: 'closeEffect', type: "'none' | 'fade' | 'slide-down' | 'scale'", description: 'Close motion (defaults to openEffect)' },
  { name: 'effect', type: '{ open?: OverlayMotionEffect; close?: OverlayMotionEffect }', description: 'Open and close motion together' },
  { name: 'className', type: 'string', description: 'Additional classes on the panel' },
];
