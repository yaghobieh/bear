import type { FC } from 'react';

export const FingerprintSvg: FC<{ size: number }> = (props) => {
  const { size } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8C20.954 8 12 16.954 12 28v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <path d="M52 28v8c0 11.046-8.954 20-20 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <path d="M18 24c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M18 24v12c0 7.732 6.268 14 14 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M46 24v12c0 4.418-2.239 8.313-5.644 10.607" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M24 22c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <path d="M24 22v14c0 4.418 3.582 8 8 8s8-3.582 8-8V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <path d="M28 22c0-2.209 1.791-4 4-4s4 1.791 4 4v14c0 2.209-1.791 4-4 4s-4-1.791-4-4V22z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 22v14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
