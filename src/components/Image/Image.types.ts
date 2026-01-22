import { ImgHTMLAttributes } from 'react';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError' | 'onLoad'> {
  src: string;
  alt: string;
  fallback?: string;
  fallbackElement?: React.ReactNode;
  lazy?: boolean;
  aspectRatio?: '1:1' | '4:3' | '16:9' | '21:9' | string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  skeleton?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  containerClassName?: string;
}

