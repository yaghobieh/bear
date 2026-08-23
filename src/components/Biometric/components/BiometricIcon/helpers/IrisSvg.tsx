import type { FC } from 'react';

export const IrisSvg: FC<{ size: number }> = (props) => {
  const { size } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="32" rx="24" ry="14" stroke="currentColor" strokeWidth="2.5" opacity="0.4" />
      <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.7" />
      <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="34" cy="30" r="1.5" fill="var(--bear-bg-primary, #fff)" />
      <path d="M8 32c6-12 16-18 24-18s18 6 24 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <path d="M8 32c6 12 16 18 24 18s18-6 24-18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
};
