import { FC, useState, useRef, useEffect, Children, TouchEvent, useCallback, KeyboardEvent } from 'react';
import { cn } from '@utils';
import type { CarouselProps } from './Carousel.types';
import {
  DEFAULT_TRANSITION_DURATION,
  MIN_SWIPE_DISTANCE,
  DEFAULT_THUMBNAIL_SIZE,
  DEFAULT_ACTIVE_COLOR,
  ARROW_BUTTON_SIZE,
  PROGRESS_BAR_HEIGHT,
} from './Carousel.const';

/**
 * Carousel - Feature-rich sliding content carousel
 *
 * @description
 * Supports slide, fade, zoom, and flip transitions, thumbnail indicators,
 * keyboard navigation, drag/swipe, progress bar, and counter.
 *
 * @example
 * ```tsx
 * <Carousel
 *   autoPlay={5000}
 *   transition="fade"
 *   indicator="thumbnails"
 *   thumbnails={['/img1.jpg', '/img2.jpg']}
 *   showArrows
 *   showProgress
 *   keyboard
 * >
 *   <div>Slide 1</div>
 *   <div>Slide 2</div>
 * </Carousel>
 * ```
 */
export const Carousel: FC<CarouselProps> = ({
  children,
  autoPlay = 0,
  showDots = true,
  showArrows = true,
  loop = true,
  slidesToShow = 1,
  gap = 16,
  pauseOnHover = true,
  onSlideChange,
  transition = 'slide',
  transitionDuration = DEFAULT_TRANSITION_DURATION,
  indicator = 'dots',
  thumbnails,
  thumbnailSize = DEFAULT_THUMBNAIL_SIZE,
  keyboard = true,
  draggable = true,
  showProgress = false,
  showCounter = false,
  activeColor = DEFAULT_ACTIVE_COLOR,
  className,
  style,
  testId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = Children.toArray(children);
  const totalSlides = slides.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      let newIndex = index;
      if (loop) {
        if (index < 0) newIndex = maxIndex;
        else if (index > maxIndex) newIndex = 0;
      } else {
        newIndex = Math.max(0, Math.min(maxIndex, index));
      }
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      onSlideChange?.(newIndex);
      setTimeout(() => setIsTransitioning(false), transitionDuration);
    },
    [isTransitioning, loop, maxIndex, onSlideChange, transitionDuration]
  );

  const goToNext = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const goToPrev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  // Auto-play
  useEffect(() => {
    if (autoPlay > 0 && !isPaused) {
      autoPlayTimer.current = setInterval(goToNext, autoPlay);
      return () => {
        if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      };
    }
  }, [autoPlay, isPaused, goToNext]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!keyboard) return;
      if (e.key === 'ArrowLeft') goToPrev();
      else if (e.key === 'ArrowRight') goToNext();
    },
    [keyboard, goToPrev, goToNext]
  );

  // Touch/swipe handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > MIN_SWIPE_DISTANCE) goToNext();
    else if (distance < -MIN_SWIPE_DISTANCE) goToPrev();
  };

  // Mouse drag
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseStart, setMouseStart] = useState(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!draggable) return;
      setMouseDown(true);
      setMouseStart(e.clientX);
    },
    [draggable]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!mouseDown) return;
      setMouseDown(false);
      const distance = mouseStart - e.clientX;
      if (distance > MIN_SWIPE_DISTANCE) goToNext();
      else if (distance < -MIN_SWIPE_DISTANCE) goToPrev();
    },
    [mouseDown, mouseStart, goToNext, goToPrev]
  );

  const slideWidth = `calc((100% - ${gap * (slidesToShow - 1)}px) / ${slidesToShow})`;

  // Transition styles for each slide
  const getSlideStyle = (index: number): React.CSSProperties => {
    const isActive = index === currentIndex;
    const dur = `${transitionDuration}ms`;

    switch (transition) {
      case 'fade':
        return {
          position: 'absolute',
          inset: 0,
          opacity: isActive ? 1 : 0,
          transition: `opacity ${dur} ease-in-out`,
          zIndex: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
        };
      case 'zoom':
        return {
          position: 'absolute',
          inset: 0,
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'scale(1)' : 'scale(0.85)',
          transition: `opacity ${dur} ease, transform ${dur} ease`,
          zIndex: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
        };
      case 'flip':
        return {
          position: 'absolute',
          inset: 0,
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'rotateY(0deg)' : 'rotateY(90deg)',
          transition: `opacity ${dur} ease, transform ${dur} ease`,
          zIndex: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
          backfaceVisibility: 'hidden',
        };
      case 'slide':
      default:
        return {};
    }
  };

  const isStackedTransition = transition === 'fade' || transition === 'zoom' || transition === 'flip';

  return (
    <div
      ref={containerRef}
      className={cn('bear-relative bear-overflow-hidden bear-outline-none', className)}
      style={style}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => {
        pauseOnHover && setIsPaused(false);
        mouseDown && setMouseDown(false);
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      tabIndex={keyboard ? 0 : undefined}
      data-testid={testId}
      role="region"
      aria-label="Carousel"
      aria-roledescription="carousel"
    >
      {/* Progress bar */}
      {showProgress && autoPlay > 0 && (
        <div
          className="bear-absolute bear-top-0 bear-left-0 bear-right-0 bear-z-20"
          style={{ height: PROGRESS_BAR_HEIGHT }}
        >
          <div
            className="bear-h-full bear-transition-all bear-ease-linear"
            style={{
              width: `${((currentIndex + 1) / totalSlides) * 100}%`,
              background: activeColor,
              transition: `width ${transitionDuration}ms ease`,
            }}
          />
        </div>
      )}

      {/* Slides container */}
      {isStackedTransition ? (
        <div className="bear-relative" style={{ minHeight: 200 }}>
          {slides.map((slide, index) => (
            <div key={index} style={getSlideStyle(index)}>
              {slide}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="bear-flex"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(-${currentIndex} * (${slideWidth} + ${gap}px)))`,
            transition: `transform ${transitionDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="bear-shrink-0" style={{ width: slideWidth }}>
              {slide}
            </div>
          ))}
        </div>
      )}

      {/* Arrows */}
      {showArrows && totalSlides > slidesToShow && (
        <>
          <button
            onClick={goToPrev}
            disabled={!loop && currentIndex === 0}
            className={cn(
              'bear-absolute bear-left-2 bear-top-1/2 bear--translate-y-1/2',
              'bear-rounded-full bear-flex bear-items-center bear-justify-center',
              'bear-bg-white/90 dark:bear-bg-gray-800/90 bear-shadow-lg',
              'bear-text-gray-700 dark:bear-text-gray-200',
              'hover:bear-bg-white dark:hover:bear-bg-gray-700',
              'bear-transition-all bear-z-10',
              'disabled:bear-opacity-50 disabled:bear-cursor-not-allowed'
            )}
            style={{ width: ARROW_BUTTON_SIZE, height: ARROW_BUTTON_SIZE }}
            aria-label="Previous slide"
          >
            <svg className="bear-w-5 bear-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            disabled={!loop && currentIndex === maxIndex}
            className={cn(
              'bear-absolute bear-right-2 bear-top-1/2 bear--translate-y-1/2',
              'bear-rounded-full bear-flex bear-items-center bear-justify-center',
              'bear-bg-white/90 dark:bear-bg-gray-800/90 bear-shadow-lg',
              'bear-text-gray-700 dark:bear-text-gray-200',
              'hover:bear-bg-white dark:hover:bear-bg-gray-700',
              'bear-transition-all bear-z-10',
              'disabled:bear-opacity-50 disabled:bear-cursor-not-allowed'
            )}
            style={{ width: ARROW_BUTTON_SIZE, height: ARROW_BUTTON_SIZE }}
            aria-label="Next slide"
          >
            <svg className="bear-w-5 bear-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Counter */}
      {showCounter && (
        <div className="bear-absolute bear-top-3 bear-right-3 bear-z-10 bear-bg-black/50 bear-text-white bear-text-xs bear-font-medium bear-px-2.5 bear-py-1 bear-rounded-full">
          {currentIndex + 1} / {totalSlides}
        </div>
      )}

      {/* Indicators */}
      {showDots && indicator !== 'none' && totalSlides > slidesToShow && (
        <div className="bear-flex bear-justify-center bear-gap-2 bear-mt-4">
          {indicator === 'thumbnails' && thumbnails ? (
            thumbnails.map((thumb, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  'bear-rounded bear-overflow-hidden bear-border-2 bear-transition-all',
                  index === currentIndex
                    ? 'bear-opacity-100 bear-scale-110'
                    : 'bear-opacity-60 hover:bear-opacity-80'
                )}
                style={{
                  width: thumbnailSize,
                  height: thumbnailSize,
                  borderColor: index === currentIndex ? activeColor : 'transparent',
                }}
                aria-label={`Go to slide ${index + 1}`}
              >
                <img src={thumb} alt="" className="bear-w-full bear-h-full bear-object-cover" />
              </button>
            ))
          ) : indicator === 'numbers' ? (
            Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  'bear-w-7 bear-h-7 bear-rounded-full bear-text-xs bear-font-medium bear-transition-all',
                  'bear-flex bear-items-center bear-justify-center',
                  index === currentIndex
                    ? 'bear-text-white bear-shadow-md'
                    : 'bear-bg-gray-200 dark:bear-bg-gray-600 bear-text-gray-600 dark:bear-text-gray-300 hover:bear-bg-gray-300 dark:hover:bear-bg-gray-500'
                )}
                style={index === currentIndex ? { background: activeColor } : undefined}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index + 1}
              </button>
            ))
          ) : indicator === 'bars' ? (
            Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  'bear-h-1 bear-rounded-full bear-transition-all',
                  index === currentIndex
                    ? 'bear-w-8'
                    : 'bear-w-4 bear-bg-gray-300 dark:bear-bg-gray-600 hover:bear-bg-gray-400 dark:hover:bear-bg-gray-500'
                )}
                style={index === currentIndex ? { background: activeColor } : undefined}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))
          ) : (
            /* Default dots */
            Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  'bear-h-2.5 bear-rounded-full bear-transition-all',
                  index === currentIndex
                    ? 'bear-w-6'
                    : 'bear-w-2.5 bear-bg-gray-300 dark:bear-bg-gray-600 hover:bear-bg-gray-400 dark:hover:bear-bg-gray-500'
                )}
                style={index === currentIndex ? { background: activeColor } : undefined}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
