import { FC } from 'react';
import { BANNER_ICON_SIZE, BANNER_ICON_STROKE_WIDTH } from '../Banner.const';

export const BannerErrorSvg: FC = () => (
  <svg
    width={BANNER_ICON_SIZE}
    height={BANNER_ICON_SIZE}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={BANNER_ICON_STROKE_WIDTH}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
