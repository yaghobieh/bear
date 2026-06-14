import type { HTMLAttributes, ReactNode } from 'react';

export interface InfiniteScrollProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  onLoadMore: () => void | Promise<void>;
  hasMore: boolean;
  loading?: boolean;
  threshold?: number;
  manual?: boolean;
  loader?: ReactNode;
  endMessage?: ReactNode;
  loadMoreLabel?: string;
  inverse?: boolean;
  testId?: string;
}
