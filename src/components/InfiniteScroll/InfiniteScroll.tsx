import { FC, useRef, useEffect, useCallback } from 'react';
import { cn } from '@utils';
import type { InfiniteScrollProps } from './InfiniteScroll.types';
import {
  DEFAULT_THRESHOLD,
  ROOT_CLASSES, LOADER_CLASSES, END_CLASSES,
  MANUAL_BTN_CLASSES, SPINNER_CLASSES,
} from './InfiniteScroll.const';

export const InfiniteScroll: FC<InfiniteScrollProps> = (props) => {
  const {
    onLoadMore, hasMore, loading = false,
    threshold = DEFAULT_THRESHOLD, manual = false,
    loader, endMessage, loadMoreLabel = 'Load more',
    inverse = false, children, className, testId, ...rest
  } = props;

  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const handleLoadMore = useCallback(() => {
    if (loadingRef.current || !hasMore) return;
    onLoadMore();
  }, [onLoadMore, hasMore]);

  useEffect(() => {
    if (manual || !hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) handleLoadMore();
      },
      { threshold: 0, rootMargin: `${Math.round(threshold * 100)}px` },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [manual, hasMore, handleLoadMore, threshold]);

  const defaultLoader = (
    <div className={LOADER_CLASSES}>
      <div className={SPINNER_CLASSES} />
    </div>
  );

  const content = (
    <>
      {inverse && hasMore && !manual && <div ref={sentinelRef} className="bear-h-px" />}
      {inverse && loading && (loader ?? defaultLoader)}
      {children}
      {!inverse && loading && (loader ?? defaultLoader)}
      {!inverse && hasMore && !manual && <div ref={sentinelRef} className="bear-h-px" />}
      {hasMore && manual && !loading && (
        <button type="button" onClick={handleLoadMore} className={MANUAL_BTN_CLASSES}>{loadMoreLabel}</button>
      )}
      {!hasMore && endMessage && <div className={END_CLASSES}>{endMessage}</div>}
    </>
  );

  return (
    <div className={cn(ROOT_CLASSES, className)} data-testid={testId} {...rest}>
      {content}
    </div>
  );
};

export default InfiniteScroll;
