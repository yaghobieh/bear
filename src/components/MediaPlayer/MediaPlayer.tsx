import { FC, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@utils';
import { BearIcons } from '../Icon';
import type { MediaPlayerProps, PlaylistItem } from './MediaPlayer.types';
import { DEFAULT_ACCENT, PROGRESS_HEIGHT, CENTER_ICON_SIZE, SIZE_MAP } from './MediaPlayer.const';
import { formatTime } from './MediaPlayer.utils';
import { useBearStyles } from '../../hooks/useBearStyles';

const DEFAULT_STICKY_SIZE = 320;
const STICKY_GAP = 16;

export const MediaPlayer: FC<MediaPlayerProps> = ({
  src,
  type = 'video',
  poster,
  autoPlay = false,
  loop: loopProp = false,
  muted = false,
  nativeControls = false,
  width,
  height,
  size = 'md',
  accentColor = DEFAULT_ACCENT,
  playIcon,
  pauseIcon,
  muteIcon,
  unmuteIcon,
  fullscreenIcon,
  centerOverlay = false,
  sticky = false,
  stickyPosition = 'right',
  stickySize = DEFAULT_STICKY_SIZE,
  airPlay = false,
  playlist,
  onTrackChange,
  bis,
  testId,
  className,
  style: styleProp,
  ...rest
}) => {
  const mediaRef = useRef<HTMLVideoElement & HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(muted);
  const [loop, setLoop] = useState(loopProp);
  const [stickyActive, setStickyActive] = useState(false);
  const [stickyY, setStickyY] = useState(0);
  const [showOverlay, setShowOverlay] = useState(!autoPlay);
  const [trackIndex, setTrackIndex] = useState(0);

  const bisStyle = useBearStyles(bis, styleProp);

  const tracks = useMemo((): PlaylistItem[] => {
    if (playlist && playlist.length > 0) return playlist;
    return [{ src, poster, type, title: undefined, artist: undefined }];
  }, [playlist, src, poster, type]);

  const activeTrack = tracks[trackIndex];
  const activeSrc = activeTrack.src;
  const activePoster = activeTrack.poster ?? poster;
  const activeType = activeTrack.type ?? type;
  const hasPlaylist = tracks.length > 1;

  const sizeConfig = SIZE_MAP[size];

  useEffect(() => { setLoop(loopProp); }, [loopProp]);

  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;
    const onTime = () => setCurrentTime(el.currentTime);
    const onMeta = () => setDuration(el.duration);
    const onEnd = () => {
      if (hasPlaylist && trackIndex < tracks.length - 1) {
        goToTrack(trackIndex + 1);
      } else if (loop) {
        if (hasPlaylist) goToTrack(0);
      } else {
        setPlaying(false);
        setShowOverlay(true);
      }
    };
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('ended', onEnd);
    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('ended', onEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, hasPlaylist, trackIndex, tracks.length]);

  // Scroll-following sticky: once the sentinel leaves the viewport top, the player
  // becomes fixed and tracks the scroll position so it visually "moves with" the page.
  useEffect(() => {
    if (!sticky || activeType !== 'video') return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const onScroll = () => {
      const rect = sentinel.getBoundingClientRect();
      const pastSentinel = rect.bottom < 0;
      setStickyActive(pastSentinel);
      if (pastSentinel) {
        setStickyY(STICKY_GAP);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sticky, activeType]);

  const goToTrack = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(tracks.length - 1, idx));
    setTrackIndex(clamped);
    setCurrentTime(0);
    setDuration(0);
    setShowOverlay(false);
    onTrackChange?.(clamped, tracks[clamped]);
    setTimeout(() => {
      const el = mediaRef.current;
      if (el) {
        el.load();
        el.play().catch(() => {});
        setPlaying(true);
      }
    }, 50);
  }, [tracks, onTrackChange]);

  const togglePlay = useCallback(() => {
    const el = mediaRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setShowOverlay(true);
    } else {
      el.play().catch(() => {});
      setShowOverlay(false);
    }
    setPlaying(!playing);
  }, [playing]);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = mediaRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    el.currentTime = ratio * duration;
  }, [duration]);

  const toggleMute = useCallback(() => {
    const el = mediaRef.current;
    if (!el) return;
    el.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleLoop = useCallback(() => {
    const next = !loop;
    setLoop(next);
    const el = mediaRef.current;
    if (el) el.loop = next;
  }, [loop]);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  }, []);

  const requestAirPlay = useCallback(() => {
    const el = mediaRef.current as HTMLVideoElement & { webkitShowPlaybackTargetPicker?: () => void };
    if (el?.webkitShowPlaybackTargetPicker) el.webkitShowPlaybackTargetPicker();
  }, []);

  const skipPrev = useCallback(() => {
    if (currentTime > 3) {
      const el = mediaRef.current;
      if (el) el.currentTime = 0;
    } else if (trackIndex > 0) {
      goToTrack(trackIndex - 1);
    }
  }, [currentTime, trackIndex, goToTrack]);

  const skipNext = useCallback(() => {
    if (trackIndex < tracks.length - 1) goToTrack(trackIndex + 1);
  }, [trackIndex, tracks.length, goToTrack]);

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const iconSm = sizeConfig.iconSm;
  const iconMd = sizeConfig.iconMd;
  const PlayIconEl = playing ? (pauseIcon ?? <BearIcons.PauseIcon size={iconMd} />) : (playIcon ?? <BearIcons.PlayIcon size={iconMd} />);
  const MuteIconEl = isMuted ? (muteIcon ?? <BearIcons.VolumeOffIcon size={iconSm} />) : (unmuteIcon ?? <BearIcons.VolumeUpIcon size={iconSm} />);
  const FullscreenIconEl = fullscreenIcon ?? <BearIcons.MaximizeIcon size={iconSm} />;

  const MediaTag = activeType === 'video' ? 'video' : 'audio';

  const containerStyle = useMemo(() => {
    if (stickyActive && activeType === 'video') {
      return {
        ...bisStyle,
        position: 'fixed' as const,
        top: stickyY,
        [stickyPosition === 'left' ? 'left' : 'right']: STICKY_GAP,
        width: stickySize,
        zIndex: 50,
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
        borderRadius: 12,
        transition: 'top 0.15s ease-out',
      };
    }
    return {
      ...bisStyle,
      width: width ?? '100%',
      height,
      maxWidth: width ? undefined : sizeConfig.maxWidth,
    };
  }, [stickyActive, activeType, bisStyle, width, height, sizeConfig.maxWidth, stickyY, stickyPosition, stickySize]);

  const videoStyle = useMemo(() => {
    if (stickyActive) return undefined;
    return { aspectRatio: sizeConfig.aspectRatio };
  }, [stickyActive, sizeConfig.aspectRatio]);

  // Active color for playlist highlights
  const activeTrackBg = `${accentColor}20`;

  return (
    <>
      {sticky && <div ref={sentinelRef} style={{ height: 1 }} />}
      <div
        ref={containerRef}
        className={cn('Bear-MediaPlayer relative rounded-xl overflow-hidden bg-black', className)}
        style={containerStyle}
        data-testid={testId}
        {...rest}
      >
        <MediaTag
          ref={mediaRef as React.Ref<HTMLVideoElement>}
          src={activeSrc}
          poster={activePoster}
          autoPlay={autoPlay}
          loop={loop && !hasPlaylist}
          muted={muted}
          controls={nativeControls}
          playsInline
          className={cn(activeType === 'video' ? 'Bear-MediaPlayer__video w-full object-cover' : 'hidden')}
          style={activeType === 'video' ? videoStyle : undefined}
          onClick={activeType === 'video' ? togglePlay : undefined}
        />

        {centerOverlay && activeType === 'video' && showOverlay && !nativeControls && (
          <button
            type="button"
            onClick={togglePlay}
            className="Bear-MediaPlayer__overlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              {playing
                ? (pauseIcon ?? <BearIcons.PauseIcon size={CENTER_ICON_SIZE} className="text-gray-900" />)
                : (playIcon ?? <BearIcons.PlayIcon size={CENTER_ICON_SIZE} className="text-gray-900" />)
              }
            </div>
          </button>
        )}

        {!nativeControls && activeType === 'video' && (
          <div className={cn('Bear-MediaPlayer__controls absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-8', sizeConfig.padding)}>
            <div
              className="Bear-MediaPlayer__progress w-full cursor-pointer mb-2 group"
              style={{ height: PROGRESS_HEIGHT }}
              onClick={seek}
            >
              <div className="w-full h-full bg-white/30 rounded-full relative overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: accentColor }} />
              </div>
            </div>

            <div className={cn('Bear-MediaPlayer__bar flex items-center', sizeConfig.gap)}>
              {hasPlaylist && (
                <button type="button" onClick={skipPrev} className="text-white hover:text-pink-400 transition-colors">
                  <BearIcons.SkipBackIcon size={iconSm} />
                </button>
              )}
              <button type="button" onClick={togglePlay} className="text-white hover:text-pink-400 transition-colors">
                {PlayIconEl}
              </button>
              {hasPlaylist && (
                <button type="button" onClick={skipNext} className="text-white hover:text-pink-400 transition-colors">
                  <BearIcons.SkipForwardIcon size={iconSm} />
                </button>
              )}
              <button type="button" onClick={toggleMute} className="text-white hover:text-pink-400 transition-colors">
                {MuteIconEl}
              </button>
              <span className={cn('Bear-MediaPlayer__time text-white font-mono', sizeConfig.text)}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <div className="flex-1" />
              <button
                type="button"
                onClick={toggleLoop}
                className="transition-colors"
                style={{ color: loop ? accentColor : undefined }}
                title="Loop"
              >
                <BearIcons.RepeatIcon size={iconSm} className={loop ? undefined : 'text-white/60 hover:text-white'} />
              </button>
              {airPlay && (
                <button type="button" onClick={requestAirPlay} className="text-white hover:text-pink-400 transition-colors" title="AirPlay">
                  <BearIcons.CastIcon size={iconSm} />
                </button>
              )}
              <button type="button" onClick={toggleFullscreen} className="text-white hover:text-pink-400 transition-colors">
                {FullscreenIconEl}
              </button>
            </div>

            {hasPlaylist && activeTrack.title && (
              <div className="mt-1 flex items-center gap-2 truncate">
                <span className="text-white text-xs font-medium truncate">{activeTrack.title}</span>
                {activeTrack.artist && <span className="text-white/50 text-xs truncate">— {activeTrack.artist}</span>}
              </div>
            )}
          </div>
        )}

        {activeType === 'audio' && !nativeControls && (
          <div className={cn('Bear-MediaPlayer__audio bg-gray-100 dark:bg-zinc-800 rounded-xl', sizeConfig.padding)}>
            {hasPlaylist && (activePoster || activeTrack.title) && (
              <div className="flex items-center gap-3 mb-3">
                {activePoster && (
                  <img src={activePoster} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  {activeTrack.title && <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{activeTrack.title}</p>}
                  {activeTrack.artist && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{activeTrack.artist}</p>}
                </div>
              </div>
            )}

            <div className="Bear-MediaPlayer__progress w-full cursor-pointer mb-1" style={{ height: PROGRESS_HEIGHT }} onClick={seek}>
              <div className="w-full h-full bg-gray-300 dark:bg-zinc-600 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: accentColor }} />
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <span className={cn('text-gray-500 font-mono', sizeConfig.text)}>{formatTime(currentTime)}</span>
              <span className={cn('text-gray-500 font-mono', sizeConfig.text)}>{formatTime(duration)}</span>
            </div>

            <div className={cn('flex items-center justify-center', sizeConfig.gap)}>
              <button
                type="button"
                onClick={toggleLoop}
                className="transition-colors"
                style={{ color: loop ? accentColor : undefined }}
                title="Loop"
              >
                <BearIcons.RepeatIcon size={iconSm} className={loop ? undefined : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'} />
              </button>
              {hasPlaylist && (
                <button type="button" onClick={skipPrev} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <BearIcons.SkipBackIcon size={iconMd} />
                </button>
              )}
              <button
                type="button"
                onClick={togglePlay}
                className="Bear-MediaPlayer__play w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ backgroundColor: accentColor }}
              >
                {PlayIconEl}
              </button>
              {hasPlaylist && (
                <button type="button" onClick={skipNext} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <BearIcons.SkipForwardIcon size={iconMd} />
                </button>
              )}
              <button type="button" onClick={toggleMute} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                {MuteIconEl}
              </button>
            </div>
          </div>
        )}

        {hasPlaylist && !nativeControls && (
          <div className="Bear-MediaPlayer__playlist bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 max-h-48 overflow-y-auto">
            {tracks.map((track, i) => {
              const isActive = i === trackIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToTrack(i)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 text-left transition-colors',
                    !isActive && 'hover:bg-gray-100 dark:hover:bg-zinc-800',
                  )}
                  style={isActive ? { backgroundColor: activeTrackBg } : undefined}
                >
                  {track.poster && (
                    <img src={track.poster} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-xs font-medium truncate"
                      style={isActive ? { color: accentColor } : undefined}
                    >
                      {track.title ?? `Track ${i + 1}`}
                    </p>
                    {track.artist && <p className="text-[10px] text-gray-400 truncate">{track.artist}</p>}
                  </div>
                  {isActive && playing && (
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 rounded-full animate-pulse" style={{ height: '60%', backgroundColor: accentColor }} />
                      <span className="w-0.5 rounded-full animate-pulse" style={{ height: '100%', backgroundColor: accentColor, animationDelay: '0.2s' }} />
                      <span className="w-0.5 rounded-full animate-pulse" style={{ height: '40%', backgroundColor: accentColor, animationDelay: '0.4s' }} />
                    </div>
                  )}
                  <span className="text-[10px] text-gray-400 tabular-nums shrink-0">{i + 1}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
