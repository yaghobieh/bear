export interface UseClipboardOptions {
  /** Timeout in ms before resetting copied state */
  timeout?: number;
  /** Callback when copy succeeds */
  onSuccess?: (value: string) => void;
  /** Callback when copy fails */
  onError?: (error: Error) => void;
}

export interface UseClipboardReturn {
  /** Copy text to clipboard */
  copy: (value: string) => Promise<boolean>;
  /** Whether text was recently copied */
  copied: boolean;
  /** Last copied value */
  value: string | null;
  /** Reset copied state */
  reset: () => void;
  /** Error if copy failed */
  error: Error | null;
}

