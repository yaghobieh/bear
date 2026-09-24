import React, { FC } from 'react';
import { Badge } from '@forgedevstack/bear';
import { TorchPlayer } from '@forgedevstack/torch';

const DEMO_VIDEO_SRC = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const DEMO_VIDEO_POSTER = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg';

export const BearVideoShowcase: FC = () => {
  return (
    <section className="mb-14 sm:mb-20 md:mb-24 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
          🎬 Powered by @forgedevstack/torch
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
          See Bear UI in Motion
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
          High-performance media playback integrated seamlessly with Bear styling and ForgeStack's native Torch video engine.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-950 shadow-xl relative w-full">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 border-b border-gray-800/80 bg-gray-900/60 backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/80" />
            <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-mono text-gray-400 truncate max-w-[150px] sm:max-w-none">
              torch-media-player.mp4
            </span>
          </div>
          <Badge variant="primary" className="text-[10px] sm:text-xs bg-pink-600 text-white font-medium px-2 py-0.5">
            TorchPlayer · 1080p
          </Badge>
        </div>

        {/* Real Torch Player Container */}
        <div className="relative w-full overflow-hidden bg-black flex items-center justify-center">
          <TorchPlayer
            src={DEMO_VIDEO_SRC}
            poster={DEMO_VIDEO_POSTER}
            title="Bear UI & ForgeStack Ecosystem Showcase"
            accentColor="#db2777"
            centerOverlay
            loop
            className="w-full h-auto aspect-video max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default BearVideoShowcase;
