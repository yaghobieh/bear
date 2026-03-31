import { FC } from 'react';
import { cn } from '@utils';
import type { OverlayProps } from './Overlay.types';

export const Overlay: FC<OverlayProps> = ({
  visible = true,
  opacity = 0.6,
  color = '#000',
  blur,
  zIndex = 40,
  fixed = false,
  children,
  onClick,
  className,
  testId,
}) => {
  if (!visible) return null;

  return (
    <div
      className={cn(
        'Bear-Overlay',
        fixed ? 'bear-fixed' : 'bear-absolute',
        'bear-inset-0 bear-transition-opacity',
        className,
      )}
      style={{
        backgroundColor: color,
        opacity,
        zIndex,
        backdropFilter: blur ? `blur(${blur}px)` : undefined,
      }}
      onClick={onClick}
      aria-hidden="true"
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Overlay;
