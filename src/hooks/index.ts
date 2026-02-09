export { 
  useMediaQuery, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop, 
  usePrefersReducedMotion,
  usePrefersDark,
} from './useMediaQuery';
export { useClickOutside } from './useClickOutside';
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
