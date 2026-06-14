import { useEffect, useRef, useState } from 'react';
import type { UseSnackbarOptions, UseSnackbarResult } from '../Snackbar.types';
import {
  SNACKBAR_COUNTDOWN_TICK_MS,
  SNACKBAR_PROGRESS_MAX,
  SNACKBAR_PROGRESS_MIN,
} from '../Snackbar.const';

export const useSnackbar = (options: UseSnackbarOptions): UseSnackbarResult => {
  const {
    open,
    autoHideDuration,
    onClose,
    countdownProgress = false,
    staticProgress = null,
    closeOnClickOutside = false,
  } = options;

  const surfaceRef = useRef<HTMLDivElement>(null);
  const [countdownValue, setCountdownValue] = useState(SNACKBAR_PROGRESS_MAX);

  useEffect(() => {
    if (!open || autoHideDuration === null || !onClose) {
      return;
    }
    const timer = window.setTimeout(onClose, autoHideDuration);
    return () => window.clearTimeout(timer);
  }, [open, autoHideDuration, onClose]);

  useEffect(() => {
    if (!open || !countdownProgress || autoHideDuration === null || autoHideDuration <= 0) {
      return;
    }

    const startedAt = Date.now();
    setCountdownValue(SNACKBAR_PROGRESS_MAX);

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const ratio = Math.min(1, elapsed / autoHideDuration);
      const next = Math.max(
        SNACKBAR_PROGRESS_MIN,
        SNACKBAR_PROGRESS_MAX - ratio * SNACKBAR_PROGRESS_MAX
      );
      setCountdownValue(next);
    }, SNACKBAR_COUNTDOWN_TICK_MS);

    return () => window.clearInterval(interval);
  }, [open, countdownProgress, autoHideDuration]);

  useEffect(() => {
    if (!open || !closeOnClickOutside || !onClose) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (surfaceRef.current && !surfaceRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open, closeOnClickOutside, onClose]);

  const progressValue = countdownProgress
    ? countdownValue
    : typeof staticProgress === 'number'
      ? staticProgress
      : null;

  return { surfaceRef, progressValue };
};
