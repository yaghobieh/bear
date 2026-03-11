import { FC, useState, useEffect, useCallback } from 'react';
import { cn } from '@utils';
import type { ImageGalleryProps, LightboxProps } from './ImageGallery.types';
import {
  DEFAULT_COLUMNS, DEFAULT_GAP, DEFAULT_THUMB_HEIGHT,
  ROOT_CLASSES, THUMB_CLASSES, THUMB_IMG_CLASSES, ROUNDED_CLASSES,
  OVERLAY_CLASSES, LIGHTBOX_IMG_CLASSES, NAV_BTN_CLASSES,
  CLOSE_BTN_CLASSES, CAPTION_CLASSES, COUNTER_CLASSES,
} from './ImageGallery.const';

const Lightbox: FC<LightboxProps> = ({ images, currentIndex, onClose, onNavigate }) => {
  const image = images[currentIndex];
  const total = images.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < total - 1) onNavigate(currentIndex + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex, total, onClose, onNavigate]);

  return (
    <div className={OVERLAY_CLASSES} onClick={onClose} role="dialog" aria-label="Image lightbox">
      <div onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.alt ?? ''} className={LIGHTBOX_IMG_CLASSES} />
      </div>
      <button className={CLOSE_BTN_CLASSES} onClick={onClose} aria-label="Close">✕</button>
      {currentIndex > 0 && (
        <button className={cn(NAV_BTN_CLASSES, 'bear-left-4')} onClick={() => onNavigate(currentIndex - 1)} aria-label="Previous">
          <svg className="bear-w-5 bear-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      {currentIndex < total - 1 && (
        <button className={cn(NAV_BTN_CLASSES, 'bear-right-4')} onClick={() => onNavigate(currentIndex + 1)} aria-label="Next">
          <svg className="bear-w-5 bear-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
      {image.caption && <div className={CAPTION_CLASSES}>{image.caption}</div>}
      <div className={COUNTER_CLASSES}>{currentIndex + 1} / {total}</div>
    </div>
  );
};

export const ImageGallery: FC<ImageGalleryProps> = (props) => {
  const {
    images, columns = DEFAULT_COLUMNS, gap = DEFAULT_GAP,
    rounded = true, enableLightbox = true, thumbnailHeight = DEFAULT_THUMB_HEIGHT,
    className, testId, ...rest
  } = props;

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const handleClose = useCallback(() => setLightboxIdx(null), []);
  const handleNavigate = useCallback((i: number) => setLightboxIdx(i), []);

  return (
    <>
      <div
        className={cn(ROOT_CLASSES, className)}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap }}
        data-testid={testId}
        {...rest}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={cn(THUMB_CLASSES, rounded && ROUNDED_CLASSES)}
            style={{ height: thumbnailHeight }}
            onClick={() => enableLightbox && setLightboxIdx(i)}
          >
            <img src={img.thumbnail ?? img.src} alt={img.alt ?? ''} className={THUMB_IMG_CLASSES} loading="lazy" />
          </div>
        ))}
      </div>
      {lightboxIdx !== null && (
        <Lightbox images={images} currentIndex={lightboxIdx} onClose={handleClose} onNavigate={handleNavigate} />
      )}
    </>
  );
};

export default ImageGallery;
