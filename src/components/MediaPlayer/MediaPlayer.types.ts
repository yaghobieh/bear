import type { HTMLAttributes, ReactNode } from 'react';
import type { BisProp } from '../../types/bis.types';

export type MediaType = 'video' | 'audio';

export type MediaPlayerSize = 'sm' | 'md' | 'lg';

export type StickyPosition = 'left' | 'right';

export interface PlaylistItem {
  /** Media source URL */
  src: string;
  /** Track title */
  title?: string;
  /** Artist or subtitle */
  artist?: string;
  /** Poster / cover art */
  poster?: string;
  /** Media type override */
  type?: MediaType;
}

export interface MediaPlayerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Media source URL */
  src: string;
  /** Media type */
  type?: MediaType;
  /** Poster image (video only) */
  poster?: string;
  /** Auto-play on mount */
  autoPlay?: boolean;
  /** Loop playback */
  loop?: boolean;
  /** Mute audio */
  muted?: boolean;
  /** Show native controls fallback */
  nativeControls?: boolean;
  /** Video width */
  width?: number | string;
  /** Video height */
  height?: number | string;
  /** Player size preset — controls aspect ratio and UI density */
  size?: MediaPlayerSize;
  /** Accent color for controls */
  accentColor?: string;
  /** Custom play icon */
  playIcon?: ReactNode;
  /** Custom pause icon */
  pauseIcon?: ReactNode;
  /** Custom mute icon */
  muteIcon?: ReactNode;
  /** Custom unmute icon */
  unmuteIcon?: ReactNode;
  /** Custom fullscreen icon */
  fullscreenIcon?: ReactNode;
  /** Show a large centered play/pause overlay on the video */
  centerOverlay?: boolean;
  /** Follow the scroll — player scrolls alongside the page at the given side */
  sticky?: boolean;
  /** Which side the sticky player appears on */
  stickyPosition?: StickyPosition;
  /** Sticky player width in px */
  stickySize?: number;
  /** Show AirPlay button (when browser supports it) */
  airPlay?: boolean;
  /** Playlist items — enables gallery mode */
  playlist?: PlaylistItem[];
  /** Called when active track changes */
  onTrackChange?: (index: number, item: PlaylistItem) => void;
  /** Bear Inner Style overrides */
  bis?: BisProp;
  /** Test ID */
  testId?: string;
}
