import { useState, useEffect, useCallback, useRef } from 'react';
import type { UseOnlineOptions, UseOnlineReturn } from './useOnline.types';

/**
 * useOnline - Detect online/offline network status
 * 
 * @example
 * ```tsx
 * const { isOnline, since } = useOnline({
 *   onOnline: () => console.log('Back online!'),
 *   onOffline: () => console.log('Gone offline!'),
 * });
 * 
 * return <div>{isOnline ? '🟢 Online' : '🔴 Offline'}</div>;
 * ```
 */
export function useOnline(options: UseOnlineOptions = {}): UseOnlineReturn {
  const { onOnline, onOffline } = options;
  
  const [isOnline, setIsOnline] = useState<boolean>(() => 
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [since, setSince] = useState<number | null>(null);
  
  const onOnlineRef = useRef(onOnline);
  const onOfflineRef = useRef(onOffline);
  
  // Keep refs updated
  useEffect(() => {
    onOnlineRef.current = onOnline;
    onOfflineRef.current = onOffline;
  }, [onOnline, onOffline]);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    setSince(Date.now());
    onOnlineRef.current?.();
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    setSince(Date.now());
    onOfflineRef.current?.();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return { isOnline, since };
}

export default useOnline;
