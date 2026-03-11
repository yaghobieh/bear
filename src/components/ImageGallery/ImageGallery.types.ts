import type { HTMLAttributes } from 'react';

export interface GalleryImage {
  src: string;
  alt?: string;
  thumbnail?: string;
  caption?: string;
}

export interface ImageGalleryProps extends HTMLAttributes<HTMLDivElement> {
  images: GalleryImage[];
  columns?: number;
  gap?: number;
  rounded?: boolean;
  enableLightbox?: boolean;
  thumbnailHeight?: number;
  testId?: string;
}

export interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}
