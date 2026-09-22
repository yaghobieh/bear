import { KEY_ESCAPE, KEY_TAB, ZERO, ONE } from '@constants';

export const handleFocusTrapKeyDown = (
  event: KeyboardEvent,
  container: HTMLElement | null,
  onEscape?: () => void
) => {
  if (event.key === KEY_ESCAPE && onEscape) {
    event.stopPropagation();
    onEscape();
    return;
  }

  if (event.key !== KEY_TAB) return;
  if (!container) return;

  const focusables = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => element.offsetParent !== null || element.getClientRects().length > ZERO);

  if (focusables.length === ZERO) {
    event.preventDefault();
    return;
  }

  const firstElement = focusables[ZERO];
  const lastElement = focusables[focusables.length - ONE];

  if (event.shiftKey) {
    if (document.activeElement === firstElement || document.activeElement === container) {
      event.preventDefault();
      lastElement?.focus();
    }
  } else {
    if (document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  }
};
