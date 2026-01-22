/**
 * Media Icons - Play, pause, volume, camera
 */
import { FC } from 'react';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon.types';

type IconComponent = FC<Omit<IconProps, 'children'>>;

// Play/Pause/Stop
export const PlayIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="5 3 19 12 5 21 5 3" /></Icon>
);

export const PlayCircleIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></Icon>
);

export const PlayArrowIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="5 3 19 12 5 21 5 3" /></Icon>
);

export const PauseIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></Icon>
);

export const PauseCircleIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="10" y1="15" x2="10" y2="9" /><line x1="14" y1="15" x2="14" y2="9" /></Icon>
);

export const StopIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></Icon>
);

export const StopCircleIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><rect x="9" y="9" width="6" height="6" /></Icon>
);

// Skip/Rewind
export const SkipForwardIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" /></Icon>
);

export const SkipBackIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" /></Icon>
);

export const FastForwardIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="13 19 22 12 13 5 13 19" /><polygon points="2 19 11 12 2 5 2 19" /></Icon>
);

export const RewindIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="11 19 2 12 11 5 11 19" /><polygon points="22 19 13 12 22 5 22 19" /></Icon>
);

export const Replay10Icon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6" /><path d="M10.5 13v3" /><path d="M14 13v3" /><path d="M14 13a1 1 0 0 0-2 0v3a1 1 0 0 0 2 0" /></Icon>
);

export const Forward10Icon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 5V1l5 5-5 5V7a6 6 0 1 0 6 6" /><path d="M10.5 13v3" /><path d="M14 13v3" /><path d="M14 13a1 1 0 0 0-2 0v3a1 1 0 0 0 2 0" /></Icon>
);

// Shuffle/Repeat
export const ShuffleIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></Icon>
);

export const RepeatIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></Icon>
);

export const RepeatOneIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /><line x1="12" y1="9" x2="12" y2="15" /></Icon>
);

// Volume
export const VolumeHighIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></Icon>
);

export const VolumeLowIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></Icon>
);

export const VolumeMuteIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /></Icon>
);

export const VolumeOffIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></Icon>
);

export const VolumeUpIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></Icon>
);

export const VolumeDownIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></Icon>
);

// Microphone
export const MicIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></Icon>
);

export const MicOffIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="1" y1="1" x2="23" y2="23" /><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" /><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></Icon>
);

export const MicNoneIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></Icon>
);

// Camera
export const CameraIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></Icon>
);

export const CameraAltIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></Icon>
);

export const CameraOffIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="1" y1="1" x2="23" y2="23" /><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56" /></Icon>
);

export const PhotoCameraIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></Icon>
);

export const SwitchCameraIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M16 3h5v5" /><path d="M8 21H3v-5" /><path d="M21 3 3 21" /><path d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /></Icon>
);

// Video
export const VideoIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></Icon>
);

export const VideoOffIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" /><line x1="1" y1="1" x2="23" y2="23" /></Icon>
);

export const VideocamIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></Icon>
);

// Screen/Cast
export const ScreenShareIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="3" width="20" height="14" rx="2" /><polyline points="8 21 16 21" /><line x1="12" y1="17" x2="12" y2="21" /><polyline points="9 10 12 7 15 10" /><line x1="12" y1="7" x2="12" y2="14" /></Icon>
);

export const StopScreenShareIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="3" width="20" height="14" rx="2" /><polyline points="8 21 16 21" /><line x1="12" y1="17" x2="12" y2="21" /><line x1="2" y1="3" x2="22" y2="17" /></Icon>
);

export const CastIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" /><line x1="2" y1="20" x2="2.01" y2="20" /></Icon>
);

export const CastConnectedIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" /><line x1="2" y1="20" x2="2.01" y2="20" /><rect x="13" y="9" width="8" height="6" /></Icon>
);

// Audio
export const HeadphonesIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></Icon>
);

export const HeadsetIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></Icon>
);

export const SpeakerIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><circle cx="12" cy="14" r="4" /><line x1="12" y1="6" x2="12.01" y2="6" /></Icon>
);

export const RadioIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" /></Icon>
);

// Music
export const MusicNoteIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></Icon>
);

export const MusicOffIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /><line x1="1" y1="1" x2="23" y2="23" /></Icon>
);

export const LibraryMusicIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M9 3h12v4H9z" /><path d="M9 11h12v4H9z" /><path d="M3 3h2v18H3z" /><path d="M9 19a2 2 0 1 0 4 0" /></Icon>
);

export const QueueMusicIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" /></Icon>
);

// Playlist
export const PlaylistPlayIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="3" y1="6" x2="15" y2="6" /><line x1="3" y1="10" x2="15" y2="10" /><line x1="3" y1="14" x2="9" y2="14" /><polygon points="14 14 14 20 19 17 14 14" /></Icon>
);

export const PlaylistAddIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="3" y1="6" x2="15" y2="6" /><line x1="3" y1="10" x2="15" y2="10" /><line x1="3" y1="14" x2="9" y2="14" /><line x1="14" y1="17" x2="20" y2="17" /><line x1="17" y1="14" x2="17" y2="20" /></Icon>
);

export const PlaylistAddCheckIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="3" y1="6" x2="15" y2="6" /><line x1="3" y1="10" x2="15" y2="10" /><line x1="3" y1="14" x2="9" y2="14" /><polyline points="13 17 15 19 20 14" /></Icon>
);

// Equalizer
export const EqualizerIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="4" y="4" width="4" height="16" /><rect x="10" y="9" width="4" height="11" /><rect x="16" y="13" width="4" height="7" /></Icon>
);

export const GraphicEqIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="10" width="2" height="4" /><rect x="6" y="6" width="2" height="12" /><rect x="10" y="3" width="2" height="18" /><rect x="14" y="6" width="2" height="12" /><rect x="18" y="9" width="2" height="6" /></Icon>
);

// Movie/Film
export const MovieIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /></Icon>
);

export const FilmIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /></Icon>
);

export const TheatersIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /></Icon>
);

// TV
export const TvIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></Icon>
);

export const MonitorIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></Icon>
);

// Subtitles
export const SubtitlesIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 12h4" /><path d="M14 12h4" /><path d="M6 16h12" /></Icon>
);

export const ClosedCaptionIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M10 12a2 2 0 1 0-2-2" /><path d="M16 12a2 2 0 1 0-2-2" /></Icon>
);

// Brightness
export const BrightnessHighIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></Icon>
);

export const BrightnessLowIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="5" /></Icon>
);

export const BrightnessAutoIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="5" /><path d="M12 1v2" /><path d="M12 21v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" /><path d="M1 12h2" /><path d="M21 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" /><path d="M11 8h2l1 4-1.5 1h-1L10 12l1-4z" /></Icon>
);

