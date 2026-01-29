export interface UseKeyPressOptions {
  /** Target element (defaults to document) */
  target?: HTMLElement | null;
  /** Event type */
  event?: 'keydown' | 'keyup' | 'keypress';
  /** Prevent default behavior */
  preventDefault?: boolean;
  /** Stop propagation */
  stopPropagation?: boolean;
  /** Only trigger when meta key is pressed */
  metaKey?: boolean;
  /** Only trigger when ctrl key is pressed */
  ctrlKey?: boolean;
  /** Only trigger when shift key is pressed */
  shiftKey?: boolean;
  /** Only trigger when alt key is pressed */
  altKey?: boolean;
}

export type KeyFilter = string | string[] | ((event: KeyboardEvent) => boolean);

