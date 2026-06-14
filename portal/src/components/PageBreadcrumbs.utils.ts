import { formatDocTitleFromPath } from '@/utils/formatDocTitle.utils';

export const getSegmentLabel = (path: string, fallback: string): string => {
  if (path.startsWith('/components/') || path.startsWith('/docs/')) {
    return formatDocTitleFromPath(path);
  }
  return fallback;
};
