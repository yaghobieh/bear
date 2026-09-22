import React, { FC, useState, useEffect } from 'react';
import { BearIcons, Badge, Button } from '@forgedevstack/bear';

const CHAPTERS = [
  {
    id: 1,
    time: '0:00',
    title: 'Lotso Theme & Design Tokens',
    desc: 'Deep magenta pink (#db2777), warm strawberry accents, and seamless dark mode tokens.',
    badge: 'Design System',
  },
  {
    id: 2,
    time: '0:45',
    title: 'ToggleGroup & Atomic Controls',
    desc: 'MUI & Radix-inspired single and multiple segment selection with full keyboard navigation.',
    badge: 'New Component',
  },
  {
    id: 3,
    time: '1:30',
    title: 'Overlay Effects & Focus Traps',
    desc: 'Standardized openEffect, closeEffect, and WCAG-compliant tab cycle across all dialogs.',
    badge: 'Accessibility',
  },
  {
    id: 4,
    time: '2:15',
    title: 'Density Parity & AeroCraft CSS',
    desc: 'Compact, normal, and comfortable density states across Select, ChipGroup, and AppBar.',
    badge: 'Performance',
  },
];

export const BearVideoShowcase: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          const chapterIdx = Math.min(
            CHAPTERS.length - 1,
            Math.floor((next / 100) * CHAPTERS.length)
          );
          setActiveChapter(chapterIdx);
          return next;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectChapter = (index: number) => {
    setActiveChapter(index);
    setProgress((index / CHAPTERS.length) * 100 + 5);
    setIsPlaying(true);
  };

  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
          🎬 Feature Showcase
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
          See Bear UI in Motion
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
          Explore v1.3.4 release highlights: new ToggleGroup, smooth overlay transitions, Lotso design language, and density parity.
        </p>
      </div>

      <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-950 shadow-2xl relative">
        {/* Top Video Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800/80 bg-gray-900/60 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-mono text-gray-400">
              bear-ui-v1.3.4-showcase.mp4
            </span>
          </div>
          <Badge variant="primary" className="text-xs bg-pink-600 text-white font-medium">
            HD 1080p · Lotso Edition
          </Badge>
        </div>

        {/* Video Canvas / Screen Area */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-gray-900 via-gray-950 to-pink-950/40 flex items-center justify-center overflow-hidden">
          {/* Ambient Lotso Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pink-600/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

          {/* Interactive Screen Overlay */}
          <div className="z-10 text-center px-6 max-w-xl transition-all duration-500">
            <div className="inline-block mb-4 p-4 rounded-3xl bg-pink-500/10 border border-pink-500/20 backdrop-blur-md shadow-lg shadow-pink-500/10">
              <img
                src="/bear-icon.svg"
                alt="Lotso Bear"
                className={`w-20 h-20 mx-auto select-none transition-transform duration-500 ${
                  isPlaying ? 'scale-110 animate-pulse' : 'scale-100 hover:scale-105'
                }`}
              />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-2">
              {CHAPTERS[activeChapter].badge}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
              {CHAPTERS[activeChapter].title}
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              {CHAPTERS[activeChapter].desc}
            </p>

            <div className="flex items-center justify-center gap-3">
              <Button
                variant="primary"
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-pink-600 hover:bg-pink-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-pink-600/30 flex items-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <BearIcons.CloseIcon size={16} /> Pause Demo
                  </>
                ) : (
                  <>
                    <BearIcons.ArrowRightIcon size={16} /> Play Showcase
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Scrubber & Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent p-4 pt-10">
            {/* Progress track */}
            <div
              className="w-full h-1.5 bg-gray-800 rounded-full cursor-pointer overflow-hidden relative mb-3"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                setProgress(pct);
                const chapterIdx = Math.min(
                  CHAPTERS.length - 1,
                  Math.floor((pct / 100) * CHAPTERS.length)
                );
                setActiveChapter(chapterIdx);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Video Controls */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-pink-400 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
                <span>
                  {CHAPTERS[activeChapter].time} / 3:00
                </span>
                <span className="hidden sm:inline text-gray-500">|</span>
                <span className="hidden sm:inline text-pink-400 font-medium">
                  {CHAPTERS[activeChapter].title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-mono">1080p 60fps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Chapters Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-800 bg-gray-900/90 border-t border-gray-800">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => handleSelectChapter(idx)}
              className={`p-3.5 text-left transition-all ${
                activeChapter === idx
                  ? 'bg-pink-950/40 text-pink-400 border-b-2 md:border-b-0 md:border-t-2 border-pink-500'
                  : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono text-gray-500">{ch.time}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-300">
                  {ch.badge}
                </span>
              </div>
              <div className="text-xs font-semibold text-white truncate">
                {ch.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BearVideoShowcase;
