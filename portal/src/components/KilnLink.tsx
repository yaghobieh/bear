import { FC } from 'react';
import { KILN_BASE_URL } from '@/constants/navigation.const';

interface KilnLinkProps {
  path: string;
}

export const KilnLink: FC<KilnLinkProps> = ({ path }) => (
  <a
    href={`${KILN_BASE_URL}${path}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 text-sm text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300 transition-colors"
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
    See live story
  </a>
);

export default KilnLink;

