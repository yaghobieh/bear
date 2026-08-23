import { FC } from 'react';
import { TWENTY, TWO } from '@const';

export const BannerSuccessSvg: FC = () => (
  <svg
    width={TWENTY}
    height={TWENTY}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={TWO}
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
