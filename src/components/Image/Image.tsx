import { FC, useState, useRef, useEffect } from 'react';
import { ImageProps } from './Image.types';
import { cn } from '../../utils/cn';

const DEFAULT_FALLBACK = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IiMyNzI3MmEiLz48cGF0aCBkPSJNNCAxNmw0LjU4Ni00LjU4NmExIDEgMCAwMTEuNDE0IDBMMTQgMTVtLTQtMy41bDEuNTg2LTEuNTg2YTEgMSAwIDAxMS40MTQgMEwyMCAxNm0tNS0zaDEuMDFNNCAxOGgxNmEyIDIgMCAwMDItMlY4YTIgMiAwIDAwLTItMkg0YTIgMiAwIDAwLTIgMnY4YTIgMiAwIDAwMiAyeiIgc3Ryb2tlPSIjNTI1MjViIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvc3ZnPg==';

export const Image: FC<ImageProps> = ({
  src,
  alt,
  fallback = DEFAULT_FALLBACK,
  fallbackElement,
  lazy = true,
  aspectRatio,
  objectFit = 'cover',
  rounded,
  skeleton = true,
  onLoad,
  onError,
  className,
  containerClassName,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [lazy]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const aspectRatioStyle = aspectRatio ? {
    paddingBottom: aspectRatio.includes(':')
      ? `${(parseInt(aspectRatio.split(':')[1]) / parseInt(aspectRatio.split(':')[0])) * 100}%`
      : aspectRatio
  } : undefined;

  const roundedClasses = {
    true: 'bear-rounded',
    sm: 'bear-rounded-sm',
    md: 'bear-rounded-md',
    lg: 'bear-rounded-lg',
    xl: 'bear-rounded-xl',
    full: 'bear-rounded-full',
  };

  const objectFitClasses = {
    contain: 'bear-object-contain',
    cover: 'bear-object-cover',
    fill: 'bear-object-fill',
    none: 'bear-object-none',
    'scale-down': 'bear-object-scale-down',
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'bear-relative bear-overflow-hidden bear-bg-zinc-800',
        rounded && roundedClasses[rounded === true ? 'true' : rounded],
        containerClassName
      )}
      style={aspectRatioStyle ? { paddingBottom: aspectRatioStyle.paddingBottom, height: 0 } : undefined}
    >
      {skeleton && isLoading && !hasError && (
        <div className="bear-absolute bear-inset-0 bear-bg-zinc-700 bear-animate-pulse" />
      )}
      {hasError ? (
        fallbackElement || (
          <img
            src={fallback}
            alt={alt}
            className={cn(
              'bear-w-full bear-h-full',
              aspectRatioStyle && 'bear-absolute bear-inset-0',
              objectFitClasses[objectFit],
              className
            )}
          />
        )
      ) : isInView ? (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? 'lazy' : undefined}
          className={cn(
            'bear-w-full bear-h-full bear-transition-opacity',
            aspectRatioStyle && 'bear-absolute bear-inset-0',
            objectFitClasses[objectFit],
            isLoading ? 'bear-opacity-0' : 'bear-opacity-100',
            className
          )}
          {...props}
        />
      ) : null}
    </div>
  );
};

