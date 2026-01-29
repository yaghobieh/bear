import { useState, useCallback, useRef } from 'react';
import type { UseClipboardOptions, UseClipboardReturn } from './useClipboard.types';

const DEFAULT_TIMEOUT = 2000;

/**
 * useClipboard - Copy text to clipboard with status tracking
 * 
 * @example
 * ```tsx
 * const { copy, copied } = useClipboard();
 * 
 * <Button onClick={() => copy('Hello!')}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </Button>
 * ```
 */
export const useClipboard = (options: UseClipboardOptions = {}): UseClipboardReturn => {
  const { timeout = DEFAULT_TIMEOUT, onSuccess, onError } = options;

  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    reset();

    try {
      if (!navigator?.clipboard) {
        throw new Error('Clipboard API not available');
      }

      await navigator.clipboard.writeText(text);
      setValue(text);
      setCopied(true);
      onSuccess?.(text);

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, timeout);

      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to copy');
      setError(error);
      onError?.(error);
      return false;
    }
  }, [timeout, onSuccess, onError, reset]);

  return { copy, copied, value, reset, error };
};

export default useClipboard;

