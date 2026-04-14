import React from 'react';
import { Typography, CardCompound as Card, MediaPlayer, BearIcons } from '@forgedevstack/bear';
import type { PlaylistItem } from '@forgedevstack/bear';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import type { EditablePropsConfig } from '@/components/PropsControls/PropsControls.types';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';

const PROPS = [
  { name: 'src', type: 'string', description: 'Media source URL (required)' },
  { name: 'type', type: "'video' | 'audio'", default: "'video'", description: 'Media type' },
  { name: 'poster', type: 'string', description: 'Poster image (video only)' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Player size preset — controls aspect ratio and UI density' },
  { name: 'autoPlay', type: 'boolean', default: 'false', description: 'Auto-play on mount' },
  { name: 'loop', type: 'boolean', default: 'false', description: 'Loop playback' },
  { name: 'muted', type: 'boolean', default: 'false', description: 'Mute audio' },
  { name: 'nativeControls', type: 'boolean', default: 'false', description: 'Show native browser controls' },
  { name: 'width', type: 'number | string', description: 'Video width' },
  { name: 'height', type: 'number | string', description: 'Video height' },
  { name: 'accentColor', type: 'string', default: "'#ec4899'", description: 'Accent color for progress bar and controls' },
  { name: 'centerOverlay', type: 'boolean', default: 'false', description: 'Show large centered play/pause button over the video' },
  { name: 'sticky', type: 'boolean', default: 'false', description: 'Follow the scroll — player scrolls alongside the page' },
  { name: 'stickyPosition', type: "'left' | 'right'", default: "'right'", description: 'Which side the sticky player appears on' },
  { name: 'stickySize', type: 'number', default: '320', description: 'Sticky player width in px' },
  { name: 'airPlay', type: 'boolean', default: 'false', description: 'Show AirPlay/cast button (when supported)' },
  { name: 'playlist', type: 'PlaylistItem[]', description: 'Playlist items — enables gallery mode with skip/prev/next' },
  { name: 'onTrackChange', type: '(index, item) => void', description: 'Called when active track changes' },
  { name: 'bis', type: 'BisProp', description: 'Bear Inner Style overrides (object or theme callback)' },
  { name: 'playIcon', type: 'ReactNode', description: 'Custom play icon' },
  { name: 'pauseIcon', type: 'ReactNode', description: 'Custom pause icon' },
  { name: 'muteIcon', type: 'ReactNode', description: 'Custom mute icon' },
  { name: 'unmuteIcon', type: 'ReactNode', description: 'Custom unmute icon' },
  { name: 'fullscreenIcon', type: 'ReactNode', description: 'Custom fullscreen icon' },
];

const PLAYLIST_ITEM_PROPS = [
  { name: 'src', type: 'string', description: 'Media source URL (required)' },
  { name: 'title', type: 'string', description: 'Track title' },
  { name: 'artist', type: 'string', description: 'Artist or subtitle' },
  { name: 'poster', type: 'string', description: 'Cover art / poster image' },
  { name: 'type', type: "'video' | 'audio'", description: 'Media type override per track' },
];

const PLAYGROUND_CONFIG: EditablePropsConfig = {
  size: { type: 'select', default: 'md', options: [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ]},
  centerOverlay: { type: 'boolean', default: true },
  sticky: { type: 'boolean', default: false },
  stickyPosition: { type: 'select', default: 'right', options: [
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
  ]},
  stickySize: { type: 'number', default: 320, min: 200, max: 500 },
  airPlay: { type: 'boolean', default: true },
  loop: { type: 'boolean', default: false },
  muted: { type: 'boolean', default: false },
  accentColor: { type: 'string', default: '#ec4899', placeholder: '#ec4899' },
};

const VIDEO_PLAYLIST: PlaylistItem[] = [
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'Big Buck Bunny',
    artist: 'Blender Foundation',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  },
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'Elephants Dream',
    artist: 'Blender Foundation',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
  },
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'For Bigger Blazes',
    artist: 'Google',
  },
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'For Bigger Escapes',
    artist: 'Google',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
  },
];

const AUDIO_PLAYLIST: PlaylistItem[] = [
  {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    title: 'SoundHelix Song 1',
    artist: 'T. Schürger',
    type: 'audio',
  },
  {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    title: 'SoundHelix Song 2',
    artist: 'T. Schürger',
    type: 'audio',
  },
  {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    title: 'SoundHelix Song 3',
    artist: 'T. Schürger',
    type: 'audio',
  },
];

const MediaPlayerPage: React.FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Typography variant="h1">MediaPlayer</Typography>
          <LinesOfCode lines={237} />
        </div>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          {t.mediaPlayerDesc}
        </Typography>
      </div>

      <Card className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <BearIcons.PlayCircleIcon size={24} className="text-pink-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t.comingSoonPlayer}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.comingSoonPlayerDesc}</p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="https://www.npmjs.com/package/@forgedevstack/bear"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium transition-colors"
            >
              <BearIcons.PackageIcon size={16} />
              npm
            </a>
            <a
              href="https://bearui.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors"
            >
              <BearIcons.GlobeIcon size={16} />
              bearui.com
            </a>
          </div>
        </div>
      </Card>

      <ComponentPreview
        title={t.playground}
        description="Adjust size, overlay, sticky, loop, and accent color live."
        code={`<MediaPlayer
  src="https://…/BigBuckBunny.mp4"
  size="md"
  centerOverlay
  airPlay
/>`}
        editableProps={PLAYGROUND_CONFIG}
        render={(props) => (
          <div className="flex justify-center">
            <MediaPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
              size={props.size as 'sm' | 'md' | 'lg'}
              centerOverlay={props.centerOverlay as boolean}
              sticky={props.sticky as boolean}
              stickyPosition={props.stickyPosition as 'left' | 'right'}
              stickySize={Number(props.stickySize)}
              airPlay={props.airPlay as boolean}
              loop={props.loop as boolean}
              muted={props.muted as boolean}
              accentColor={String(props.accentColor)}
            />
          </div>
        )}
      />

      <Card>
        <Card.Header title={<Typography variant="h5">Size Variants</Typography>} />
        <Card.Body>
          <Typography variant="caption" className="block mb-4 text-gray-500">
            The size prop controls aspect ratio and UI density. sm = 4:3, md = 16:9 (default), lg = 21:9.
          </Typography>
          <div className="space-y-6">
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <div key={s}>
                <Typography variant="overline" className="mb-2 block text-gray-500">{s.toUpperCase()}</Typography>
                <MediaPlayer
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  size={s}
                  centerOverlay
                />
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">Video Playlist</Typography>} />
        <Card.Body>
          <Typography variant="caption" className="block mb-3 text-gray-500">
            Pass a playlist array to enable gallery mode with skip, prev/next, track info, and an animated "now playing" indicator.
          </Typography>
          <div className="flex justify-center">
            <MediaPlayer
              src={VIDEO_PLAYLIST[0].src}
              poster={VIDEO_PLAYLIST[0].poster}
              playlist={VIDEO_PLAYLIST}
              size="md"
              centerOverlay
              accentColor="#8b5cf6"
            />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">Audio Playlist (Spotify-style)</Typography>} />
        <Card.Body>
          <Typography variant="caption" className="block mb-3 text-gray-500">
            Works for audio too — shows cover art, track info, skip controls, loop toggle, and a scrollable track list.
          </Typography>
          <div className="max-w-sm mx-auto">
            <MediaPlayer
              src={AUDIO_PLAYLIST[0].src}
              type="audio"
              playlist={AUDIO_PLAYLIST}
              accentColor="#1DB954"
            />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.centerOverlayAirPlay}</Typography>} />
        <Card.Body>
          <div className="flex justify-center">
            <MediaPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg"
              size="md"
              centerOverlay
              airPlay
              accentColor="#8b5cf6"
            />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.stickyPlayer}</Typography>} />
        <Card.Body>
          <Typography variant="caption" className="block mb-3 text-gray-500">
            Scroll past this section — the player jumps to the side and follows your scroll. Use stickyPosition to choose left or right, and stickySize to control the floating width.
          </Typography>
          <div className="flex justify-center">
            <MediaPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              size="md"
              sticky
              stickyPosition="right"
              stickySize={300}
              centerOverlay
              accentColor="#06b6d4"
            />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.customIcons}</Typography>} />
        <Card.Body>
          <div className="flex justify-center">
            <MediaPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
              poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg"
              size="md"
              accentColor="#ea580c"
              playIcon={<BearIcons.PlayCircleIcon size={22} />}
              pauseIcon={<BearIcons.PauseCircleIcon size={22} />}
              centerOverlay
            />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.audioPlayer}</Typography>} />
        <Card.Body>
          <div className="max-w-sm mx-auto">
            <MediaPlayer
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
              type="audio"
              accentColor="#059669"
            />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">bis (Bear Inner Style)</Typography>} />
        <Card.Body>
          <Typography variant="caption" className="block mb-3 text-gray-500">
            Use bis for theme-aware inline styling — pass a plain object, or a callback that receives the Bear theme for dynamic values.
          </Typography>
          <div className="flex justify-center mb-6">
            <MediaPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
              size="md"
              centerOverlay
              bis={{ borderRadius: 24, boxShadow: '0 12px 40px rgba(236,72,153,0.3)' }}
            />
          </div>
          <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4">
            <Typography variant="overline" className="block mb-2 text-gray-500">Static object</Typography>
            <pre className="text-xs text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap mb-4">{`<MediaPlayer
  bis={{ borderRadius: 24, boxShadow: '0 12px 40px rgba(236,72,153,0.3)' }}
/>`}</pre>
            <Typography variant="overline" className="block mb-2 text-gray-500">Theme callback (useBearStyles)</Typography>
            <pre className="text-xs text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap">{`<MediaPlayer
  bis={(theme) => ({
    borderRadius: 24,
    boxShadow: \`0 12px 40px \${theme.colors?.primary ?? '#ec4899'}40\`,
  })}
/>`}</pre>
          </div>
        </Card.Body>
      </Card>

      <PropsTable title="MediaPlayer Props" rows={PROPS} />
      <PropsTable title="PlaylistItem" rows={PLAYLIST_ITEM_PROPS} showDefault={false} />

      <Card className="border-pink-200 dark:border-pink-800">
        <Card.Header title={<Typography variant="h5">What else can we add?</Typography>} />
        <Card.Body>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2"><BearIcons.CheckCircleIcon size={16} className="text-green-500 mt-0.5 shrink-0" /> Subtitles / Closed Captions (VTT track support)</li>
            <li className="flex items-start gap-2"><BearIcons.CheckCircleIcon size={16} className="text-green-500 mt-0.5 shrink-0" /> Picture-in-Picture mode (browser native PiP API)</li>
            <li className="flex items-start gap-2"><BearIcons.CheckCircleIcon size={16} className="text-green-500 mt-0.5 shrink-0" /> Playback speed control (0.5x, 1x, 1.5x, 2x)</li>
            <li className="flex items-start gap-2"><BearIcons.CheckCircleIcon size={16} className="text-green-500 mt-0.5 shrink-0" /> Volume slider (drag instead of just mute toggle)</li>
            <li className="flex items-start gap-2"><BearIcons.CheckCircleIcon size={16} className="text-green-500 mt-0.5 shrink-0" /> Keyboard shortcuts (Space = play/pause, M = mute, F = fullscreen, ← → = seek)</li>
            <li className="flex items-start gap-2"><BearIcons.CheckCircleIcon size={16} className="text-green-500 mt-0.5 shrink-0" /> Shuffle mode for playlists</li>
            <li className="flex items-start gap-2"><BearIcons.CheckCircleIcon size={16} className="text-green-500 mt-0.5 shrink-0" /> Waveform visualization for audio tracks</li>
            <li className="flex items-start gap-2"><BearIcons.CheckCircleIcon size={16} className="text-green-500 mt-0.5 shrink-0" /> Chapter markers on the progress bar</li>
            <li className="flex items-start gap-2"><BearIcons.CheckCircleIcon size={16} className="text-green-500 mt-0.5 shrink-0" /> Thumbnail preview on progress bar hover</li>
            <li className="flex items-start gap-2"><BearIcons.CheckCircleIcon size={16} className="text-green-500 mt-0.5 shrink-0" /> Mini-player mode (collapsed bar with just title + play/pause)</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MediaPlayerPage;
