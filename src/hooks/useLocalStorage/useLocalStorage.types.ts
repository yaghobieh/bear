export interface UseLocalStorageOptions<T> {
  /** Serializer function */
  serializer?: (value: T) => string;
  /** Deserializer function */
  deserializer?: (value: string) => T;
  /** Sync across tabs */
  syncTabs?: boolean;
}

export type UseLocalStorageReturn<T> = [
  /** Current value */
  T,
  /** Set value */
  (value: T | ((prev: T) => T)) => void,
  /** Remove value */
  () => void,
];

