import { FC, useState, useRef, useEffect, Children, TouchEvent } from 'react';
import { cn } from '../../utils/cn';
import type { CarouselProps } from './Carousel.types';

/**
 * Carousel - Sliding content carousel with touch support
 * 
 * @example
 * ```tsx
 * <Carousel autoPlay={5000} showDots showArrows>
 *   <div>Slide 1</div>
 *   <div>Slide 2</div>
 *   <div>Slide 3</div>
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
  className,
  testId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const slides = Children.toArray(children);
  const totalSlides = slides.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);
  
  // Auto-play
  useEffect(() => {
    if (autoPlay > 0 && !isPaused) {
      const interval = setInterval(() => {
        goToNext();
      }, autoPlay);
      return () => clearInterval(interval);
    }
  }, [autoPlay, isPaused, currentIndex]);
  
  const goTo = (index: number) => {
    let newIndex = index;
    if (loop) {
      if (index < 0) newIndex = maxIndex;
      else if (index > maxIndex) newIndex = 0;
    } else {
      newIndex = Math.max(0, Math.min(maxIndex, index));
    }
    setCurrentIndex(newIndex);
    onSlideChange?.(newIndex);
  };
  
  const goToNext = () => goTo(currentIndex + 1);
  const goToPrev = () => goTo(currentIndex - 1);
  
  // Touch handlers for swipe
  const minSwipeDistance = 50;
  
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
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) goToNext();
    else if (isRightSwipe) goToPrev();
  };
  
  const slideWidth = `calc((100% - ${gap * (slidesToShow - 1)}px) / ${slidesToShow})`;
  
  return (
    <div
      ref={containerRef}
      className={cn('bear-relative bear-overflow-hidden', className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      data-testid={testId}
    >
      {/* Slides container */}
      <div
        className="bear-flex bear-transition-transform bear-duration-500 bear-ease-out"
        style={{
          gap: `${gap}px`,
          transform: `translateX(calc(-${currentIndex} * (${slideWidth} + ${gap}px)))`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="bear-shrink-0"
            style={{ width: slideWidth }}
          >
            {slide}
          </div>
        ))}
      </div>
      
      {/* Arrow buttons */}
      {showArrows && totalSlides > slidesToShow && (
        <>
          <button
            onClick={goToPrev}
            disabled={!loop && currentIndex === 0}
            className={cn(
              'bear-absolute bear-left-2 bear-top-1/2 bear--translate-y-1/2',
              'bear-w-10 bear-h-10 bear-rounded-full bear-flex bear-items-center bear-justify-center',
              'bear-bg-white/90 dark:bear-bg-gray-800/90 bear-shadow-lg',
              'bear-text-gray-700 dark:bear-text-gray-200',
              'hover:bear-bg-white dark:hover:bear-bg-gray-700',
              'bear-transition-all bear-z-10',
              'disabled:bear-opacity-50 disabled:bear-cursor-not-allowed'
            )}
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
              'bear-w-10 bear-h-10 bear-rounded-full bear-flex bear-items-center bear-justify-center',
              'bear-bg-white/90 dark:bear-bg-gray-800/90 bear-shadow-lg',
              'bear-text-gray-700 dark:bear-text-gray-200',
              'hover:bear-bg-white dark:hover:bear-bg-gray-700',
              'bear-transition-all bear-z-10',
              'disabled:bear-opacity-50 disabled:bear-cursor-not-allowed'
            )}
          >
            <svg className="bear-w-5 bear-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      {/* Dots */}
      {showDots && totalSlides > slidesToShow && (
        <div className="bear-flex bear-justify-center bear-gap-2 bear-mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={cn(
                'bear-w-2.5 bear-h-2.5 bear-rounded-full bear-transition-all',
                index === currentIndex
                  ? 'bear-bg-pink-500 bear-w-6'
                  : 'bear-bg-gray-300 dark:bear-bg-gray-600 hover:bear-bg-gray-400 dark:hover:bear-bg-gray-500'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

