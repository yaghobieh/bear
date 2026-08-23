export { 
  useMediaQuery, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop, 
  usePrefersReducedMotion,
  usePrefersDark,
} from './useMediaQuery';
export { useClickOutside, useClickOutsideMultiple } from './useClickOutside';
export { useResizeObserver } from './useResizeObserver';
export type { UseResizeObserverOptions, UseResizeObserverReturn } from './useResizeObserver';
export { useDisclosure } from './useDisclosure';
export { useBearStyles } from './useBearStyles';
export { bearStyled } from './bearStyled';

// Animation Hooks
export { useSlide } from './useSlide';
export type { UseSlideOptions, UseSlideReturn, SlideDirection } from './useSlide';

export { useParallax } from './useParallax';
export type { UseParallaxOptions, UseParallaxReturn } from './useParallax';

export { useBounce } from './useBounce';
export type { UseBounceOptions, UseBounceReturn } from './useBounce';

export { useFloat } from './useFloat';
export type { UseFloatOptions, UseFloatReturn } from './useFloat';

export { usePulse } from './usePulse';
export type { UsePulseOptions, UsePulseReturn } from './usePulse';

export { useShake } from './useShake';
export type { UseShakeOptions, UseShakeReturn } from './useShake';

// Utility Hooks
export { useClipboard } from './useClipboard';
export type { UseClipboardOptions, UseClipboardReturn } from './useClipboard';

export { useDebounce, useDebouncedCallback } from './useDebounce';
export type { UseDebounceOptions, UseDebouncedCallbackReturn } from './useDebounce';

export { useThrottle, useThrottledCallback } from './useThrottle';
export type { UseThrottleOptions } from './useThrottle';

export { useLocalStorage } from './useLocalStorage';
export type { UseLocalStorageOptions, UseLocalStorageReturn } from './useLocalStorage';

export { useKeyPress, useKeyPressState } from './useKeyPress';
export type { UseKeyPressOptions, KeyFilter } from './useKeyPress';

export { useIntersectionObserver, useInView } from './useIntersectionObserver';
export type { UseIntersectionObserverOptions, UseIntersectionObserverReturn } from './useIntersectionObserver';

export { useDragDrop } from './useDragDrop';
export type { UseDragDropOptions, UseDragDropReturn, DragDropId } from './useDragDrop';

export { useLazyLoad } from './useLazyLoad';
export type { UseLazyLoadOptions, UseLazyLoadReturn } from './useLazyLoad';

// Component Customization Hook
export { useBearComponent, useBC, BearComponentProvider, useBearComponentContext } from './useBearComponent';
export type { UseBearComponentReturn, BearComponentContextValue } from './useBearComponent';
export { useBearDefaultProps } from './useBearDefaultProps';

// Mouse Spotlight Hook
export { useSpotlight } from './useSpotlight';
export type { UseSpotlightOptions, UseSpotlightReturn } from './useSpotlight';

// Network & Connectivity Hooks
export { useOnline } from './useOnline';
export type { UseOnlineOptions, UseOnlineReturn } from './useOnline';

export { useWebSocket } from './useWebSocket';
export type { UseWebSocketOptions, UseWebSocketReturn, WebSocketStatus } from './useWebSocket';

// User Activity Hooks
export { useIdle } from './useIdle';
export type { UseIdleOptions, UseIdleReturn } from './useIdle';

export { usePageVisibility } from './usePageVisibility';
export type { UsePageVisibilityOptions, UsePageVisibilityReturn } from './usePageVisibility';

// Gesture Hooks
export { useLongPress } from './useLongPress';
export type { UseLongPressOptions, UseLongPressReturn } from './useLongPress';

// Animation Hooks
export { useAnimate } from './useAnimate';
export type { UseAnimateOptions, UseAnimateReturn, AnimationPreset, AnimationKeyframe } from './useAnimate';

// Responsive Hooks
export { useResponsive, useResponsiveProps } from './useResponsive';
export type { ResponsiveProp } from './useResponsive';

export { useBreakpoint } from './useBreakpoint';
export type { UseBreakpointResult, BearBreakpointKey } from './useBreakpoint';
export { DEFAULT_BREAKPOINTS_PX } from './useBreakpoint';

export { useDocumentDarkClass } from './useDocumentDarkClass';
export { usePointerDrag } from './usePointerDrag';
export type {
  PointerDragStart,
  UsePointerDragOptions,
  UsePointerDragReturn,
} from './usePointerDrag';
export { useWindowLayout } from './useWindowLayout';
export type { UseWindowLayoutOptions } from './useWindowLayout';

export {
  useFixedAnchorPosition,
  resolveOverlayEffects,
  ANCHOR_DEFAULT_Z_INDEX,
  ANCHOR_EDGE_PAD_PX,
  ANCHOR_OFFSET_PX,
  OVERLAY_OPEN_EFFECT_DEFAULT,
  OVERLAY_OPEN_EFFECT_FADE,
  OVERLAY_OPEN_EFFECT_NONE,
  OVERLAY_OPEN_EFFECT_SCALE,
  OVERLAY_OPEN_EFFECT_SLIDE_DOWN,
} from './useFixedAnchorPosition';
export type {
  OverlayCloseEffect,
  OverlayCoords,
  OverlayEffectConfig,
  OverlayEffectProps,
  OverlayMotionEffect,
  OverlayOpenEffect,
  OverlayPlacement,
  UseFixedAnchorPositionOptions,
  UseFixedAnchorPositionReturn,
} from './useFixedAnchorPosition';

export { useFormControl } from './useFormControl';
